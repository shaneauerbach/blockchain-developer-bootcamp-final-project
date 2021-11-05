let WhatIs = artifacts.require("WhatIs");
let { catchRevert } = require("./exceptionsHelpers");
const { whatStruct, entryStruct, isDefined, isPayable, isType } = require("./astHelper");
const timeHelpers = require("./timeHelpers");

contract("WhatIs", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const name = "name";
  const content = "content";

  beforeEach(async () => {
    instance = await WhatIs.new();
  });

  describe("The contract should...", () => {
    it("have an owner", async () => {
      assert.equal(typeof instance.owner, 'function', "the contract has no owner");
    });

    it("have a whatCount that starts at zero", async () => {
      assert.equal(typeof instance.whatCount, 'function', "the contract has no whatCount");
      assert.equal(await instance.whatCount.call(), 0, "the whatCount doesn't start at zero");
    });

    let enumState;
    before(() => {
      enumState = WhatIs.enums.State;
      assert(
        enumState, 
        "The contract should have a `State` enum"
      );
    });
    it("have a State enum with correct values", () => {
        assert(enumState.hasOwnProperty('Open'),"The enum does not have a `Open` value");
        assert(enumState.hasOwnProperty('Voting'),"The enum does not have a `Voting` value");
    });

    let subjectStruct1;
    let subjectStruct2;
    before(() => {
      subjectStruct1 = whatStruct(WhatIs);
      subjectStruct2 = entryStruct(WhatIs);
      assert(
        subjectStruct1 !== null && subjectStruct2 !== null, 
        "The contract should define a `What struct` and a `Entry struct`"
      );
    });
    
    it("have a What struct with the right members", async () => {
        assert(isDefined(subjectStruct1)("name"), "Struct What should have a `name` member");
        assert(isType(subjectStruct1)("name")("string"), "`name` should be of type `string`");
        assert(isDefined(subjectStruct1)("state"), "Struct What should have a `state` member");
        assert(isType(subjectStruct1)("state")("State"), "`state` should be of type `State`");
    });

    it("have an Entry struct with the right members", async () => {
      assert(isDefined(subjectStruct2)("what"), "Struct Entry should have a `what` member");
      assert(isType(subjectStruct2)("what")("string"), "`what` should be of type `string`");
      assert(isDefined(subjectStruct2)("content"), "Struct Entry should have a `content` member");
      assert(isType(subjectStruct2)("content")("string"), "`content` should be of type `string`");
      assert(isDefined(subjectStruct2)("state"), "Struct Entry should have a `state` member");
      assert(isType(subjectStruct2)("state")("State"), "`state` should be of type `State`");
      assert(isDefined(subjectStruct2)("proposer"), "Struct Entry should have a `proposer` member");
      assert(isType(subjectStruct2)("proposer")("address"), "`proposer` should be of type `address`");
      assert(isDefined(subjectStruct2)("proposedTimestamp"), "Struct Entry should have a `proposedTimestamp` member");
      assert(isType(subjectStruct2)("proposedTimestamp")("uint"), "`proposedTimestamp` should be of type `uint`");
  });

  });

  describe("When createWhat is called, it should", () => {
    it("error when What already exists", async () => {
        await instance.createWhat(name,'a', { from: alice });
        await catchRevert(instance.createWhat(name,content, { from: bob }));
    });
    it("create What correctly when it does not already exist", async () => {
        await instance.createWhat(name,content, { from: alice });
        test_what = await instance.whats.call(1);
        assert(test_what['name'] == name, "Names are not being set correctly.");
        assert(test_what['state'] == WhatIs.State.Open, "State is not being set correctly.");
    });
    it("correctly track entries", async () => {
      await instance.createWhat('a','a_entry1', { from: alice });
      await instance.createWhat('b','b_entry1', { from: bob });
      test_proposed_entry_a = await instance.proposedEntries.call(1,1);
      test_proposed_entry_b = await instance.proposedEntries.call(2,1);
      test_accepted_entry_a = await instance.proposedEntries.call(1,1);
      test_accepted_entry_b = await instance.proposedEntries.call(2,1);
      assert(test_proposed_entry_a.content == 'a_entry1', "Entries are not being mapped correctly.");
      assert(test_proposed_entry_b.content == 'b_entry1', "Entries are not being mapped correctly.");
      assert(test_accepted_entry_a.content == 'a_entry1', "Entries are not being mapped correctly.");
      assert(test_accepted_entry_b.content == 'b_entry1', "Entries are not being mapped correctly.");
    });
    it("correctly track ownership", async () => {
      await instance.createWhat('a','a_entry1', { from: alice });
      await instance.createWhat('b','b_entry1', { from: bob });
      assert(await instance.ownership.call(1,alice) == 1, "Ownership is not being mapped correctly.");
      assert(await instance.ownership.call(2,bob) == 1, "Ownership not being mapped correctly.");
      assert(await instance.ownership.call(1,bob) == 0, "Ownership is not being mapped correctly.");
      assert(await instance.ownership.call(2,alice) == 0, "Ownership not being mapped correctly.");
    });
    it("emit a LogWhatCreated event", async () => {
      let eventEmitted = false;
      const tx = await instance.createWhat(name, content, { from: alice });
      if (tx.logs[0].event == "LogWhatCreated") {eventEmitted = true;}
      assert.equal(eventEmitted,true,"creating a What should emit a LogWhatCreated event")
    });
  });

  describe("When getWhatCount is called, it should", () => {
    it("return how many Whats there are", async () => {
      assert(await instance.getWhatCount.call() == 0);
      await instance.createWhat(name, content, { from: alice });
      assert(await instance.getWhatCount.call() == 1);
    });
  });

  describe("When proposeEntry is called, it should", () => {
    it("error when What doesn't exist", async () => {
      await catchRevert(instance.proposeEntry(name,content, { from: bob }));
    });
    it("error when What is in State.Voting", async () => {
      await instance.createWhat(name,content, { from: alice });
      await instance.proposeEntry(name,content, { from: alice });
      await catchRevert(instance.proposeEntry(name,content, { from: bob}));
    });
    it("error when entry is too many bytes", async () => {
      maxEntryBytes = await instance.maxEntryBytes.call();
      await instance.createWhat(name,content, { from: alice });
      await catchRevert(instance.proposeEntry(name,'a'.repeat(maxEntryBytes+1), { from: bob}));
    });
    it("set the What's state to Voting", async () => {
      await instance.createWhat(name,content, { from: alice });
      await instance.proposeEntry(name,'a', { from: bob });
      test_what = await instance.whats.call(1);
      assert(test_what['state'] == WhatIs.State.Voting);
    });
    it("add the proposed entry", async () => {
      await instance.createWhat(name,content, { from: alice });
      await instance.proposeEntry(name,'a', { from: bob });
      test_entry = await instance.proposedEntries.call(1,2);
      assert(test_entry.content == 'a');
    });
    it("emit a LogEntryProposed event", async () => {
      let eventEmitted = false;
      await instance.createWhat(name, content, { from: alice });
      const tx = await instance.proposeEntry(name, content, { from: bob });
      if (tx.logs[0].event == "LogEntryProposed") {eventEmitted = true;}
      assert.equal(eventEmitted,true,"proposing an entry should emit a LogEntryProposed event")
    });

  });

  describe("When vote is called, it should", () => {
    it("error when What doesn't exist", async () => {
      await catchRevert(instance.vote(name,{ from: bob }));
    });
    it("error when What is in State.Open", async () => {
      await instance.createWhat(name,content, { from: alice });
      await catchRevert(instance.vote(name, { from: alice}));
    });
    it("error when the sender is not an owner", async () => {
      await instance.createWhat(name,content, { from: alice });
      await instance.proposeEntry(name,'a', { from: alice });
      await catchRevert(instance.vote(name, { from: bob}));
    });
    it("error when the sender has already voted", async () => {
      await instance.createWhat(name,content, { from: alice });
      await instance.proposeEntry(name,'a', { from: alice });
      await instance.vote(name, { from: alice });
      await catchRevert(instance.vote(name, { from: alice}));
    });
    it("record that the sender has voted", async () => {
      await instance.createWhat(name,content, { from: alice });
      await instance.proposeEntry(name,'a', { from: alice });
      await instance.vote(name, { from: alice });
      assert(await instance.voted.call(1,2,alice) == true);
    });
    it("add the vote to the entry", async () => {
      await instance.createWhat(name,content, { from: alice });
      await instance.proposeEntry(name,'a', { from: alice });
      await instance.vote(name, { from: alice });
      // accepts, resetting votes to zero
      await instance.proposeEntry(name,'a', { from: bob });
      await instance.vote(name, { from: alice });
      // accepts, resetting votes to zero
      await instance.proposeEntry(name,'a', { from: alice });
      await instance.vote(name, { from: bob });
      // assigns a vote but doesn't accept yet as 1/3
      assert(await instance.votes.call(1) == 1);
    });
    it("emit a LogVoted event", async () => {
      let eventEmitted = false;
      await instance.createWhat(name, content, { from: alice });
      await instance.proposeEntry(name, content, { from: bob });
      const tx = await instance.vote(name, { from: alice });
      if (tx.logs[0].event == "LogVoted") {eventEmitted = true;}
      assert.equal(eventEmitted,true,"voting should emit a LogVoted event")
    });

  });

  describe("When rejectEntry is called, it should", () => {
    it("error when What doesn't exist", async () => {
      await catchRevert(instance.rejectEntry(name,{ from: bob }));
    });
    it("error when What is in State.Open", async () => {
      await instance.createWhat(name,content, { from: alice });
      await catchRevert(instance.rejectEntry(name, { from: alice}));
    });
    it("error when the entry/vote has not yet expired", async () => {
      await instance.createWhat(name,content, { from: alice });
      await instance.proposeEntry(name,content, { from: bob });
      await catchRevert(instance.rejectEntry(name, { from: alice}));
    });
    it("update the Entry's state to Rejected", async () => {
      await instance.createWhat(name,content, { from: alice });
      await instance.proposeEntry(name,'a', { from: bob });
      const voteDurationBN = await instance.voteDuration.call();
      await timeHelpers.advanceTimeAndBlock(voteDurationBN.toNumber());
      await instance.rejectEntry(name, { from: alice });
      test_entry = await instance.proposedEntries.call(1,2);
      assert(test_entry['state'] == WhatIs.State.Rejected);
    });
    // it("update the What's state to Open", async () => {
    //   await instance.createWhat(name,content, { from: alice });
    //   await instance.proposeEntry(name,'a', { from: alice });
    //   await instance.vote(name, { from: alice });
    //   assert(await instance.voted.call(1,2,alice) == true);
    // });
    

  });


});
