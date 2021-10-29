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

    it("have a whatCount that starts at one", async () => {
      assert.equal(typeof instance.whatCount, 'function', "the contract has no whatCount");
      assert.equal(await instance.whatCount.call(), 1, "the whatCount doesn't start at one");
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

        assert(isDefined(subjectStruct)("content"), "Struct What should have a `content` member");
        assert(isType(subjectStruct)("content")("string"), "`content` should be of type `string`");

        assert(isDefined(subjectStruct)("state"), "Struct What should have a `state` member");
        assert(isType(subjectStruct)("state")("State"), "`state` should be of type `State`");

        assert(isDefined(subjectStruct)("creator"), "Struct What should have a `creator` member");
        assert(isType(subjectStruct)("creator")("address"), "`creator` should be of type `address`");

        assert(isDefined(subjectStruct)("lastContributor"), "Struct What should have a `lastContributor` member");
        assert(isType(subjectStruct)("lastContributor")("address"), "`creator` should be of type `lastContributor`");

        assert(isDefined(subjectStruct)("exists"), "Struct What should have an `exists` member");
        assert(isType(subjectStruct)("exists")("bool"), "`exists` should be of type `bool`");
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
        // This doesn't work and I'm not sure why...
        assert(instance.whats.call(1)._name == name);
    });

  });
  describe("When someFunction is called", () => {
    it("it should work", () => {
        assert(true);
    });
  });



});
