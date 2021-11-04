let BN = web3.utils.BN;
let WhatIs = artifacts.require("WhatIs");
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: WhatStruct, isDefined, isPayable, isType } = require("./ast-helper");
const { catchInvalidParams } = require("./exceptionsHelpers.js");

contract("WhatIs", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const name = "name";
  const content = "content";
  let instance;

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

    let subjectStruct;
    before(() => {
      subjectStruct = WhatStruct(WhatIs);
      assert(
        subjectStruct !== null, 
        "The contract should define a `What Struct`"
      );
    });
    
    it("have a What struct with all the right members", async () => {
        assert(isDefined(subjectStruct)("name"), "Struct What should have a `name` member");
        assert(isType(subjectStruct)("name")("string"), "`name` should be of type `string`");
        assert(isDefined(subjectStruct)("state"), "Struct What should have a `state` member");
        assert(isType(subjectStruct)("state")("State"), "`state` should be of type `State`");
    });

    // Not sure how to write a test on whether the required mappings whats and ids exist
    // Probably not necessary as we'll check in later tests that they work
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
      assert(await instance.votes.call(1) == 1);
    });

  });



});
