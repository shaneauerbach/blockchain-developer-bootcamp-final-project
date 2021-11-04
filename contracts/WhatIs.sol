
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract WhatIs {

  address public owner;

  // Create a counter for the number of unique Whats
  uint public whatCount;
  uint public maxEntryBytes = 10;

  // Create a mapping from uint id to What
  // mapping (uint => What) public whats;

  // Create a mapping for each What
  // mapping (uint => WhatContent) public whatContents;

  // Define the state a What can be in
  enum State{Open, Voting, Proposed, Accepted, Rejected}

  // Define a what
  struct What { 
    string name;
    State state;
  }

  struct Entry { 
    string what;
    string content;
    State state;
    address proposer;
    uint proposedTimestamp;
  }
  

  // Create a bidirectional mapping between whats and ids
  mapping (uint => What) public whats;
  mapping (string => uint) public ids;
  // Create entry mappings
  mapping(uint => mapping(uint => Entry)) public proposedEntries;
  mapping(uint => mapping(uint => Entry)) public acceptedEntries;
  mapping(uint => uint) public proposedEntriesCount;
  mapping(uint => uint) public acceptedEntriesCount;
  // Create ownership mappings
  mapping(uint => mapping(address => uint)) public ownership;
  // Create votes mapping
  mapping(uint => uint) public votes;
  // Creates voted mapping to track who has voted
  mapping(uint => mapping(uint => mapping(address => bool))) public voted;

  // <LogCreated event: id, name, content>
  event LogWhatCreated(uint id, string name, string entry);

  // <LogFetched event: name, id>
  event LogFetched(string name, uint id);

  // modifier doesExist (string what) { 
  //   // check that what is already in the array of defined objects
  // }

  modifier doesNotExist (string memory _name) { 
    // check that What is not already in the mapping
    require(ids[_name] == 0);
    _;
  }

  modifier doesExist (string memory _name) { 
    // check that What is not already in the mapping
    require(ids[_name] != 0);
    _;
  }

  modifier meetsLengthLimits (string memory _entry) { 
    // check that What is not already in the mapping
    require(bytes(_entry).length <= maxEntryBytes);
    _;
  }

  modifier isOpen (string memory _name) { 
    // check that What is open
    require(whats[getWhatID(_name)].state == State.Open);
    _;
  }

  modifier isVoting (string memory _name) { 
    // check that What is in voting
    require(whats[getWhatID(_name)].state == State.Voting);
    _;
  }

  modifier isOwner (string memory _name) { 
    // check that a sender is an owner, i.e. entitled to vote
    require(ownership[getWhatID(_name)][msg.sender] > 0);
    _;
  }

  modifier hasNotAlreadyVoted (string memory _name) { 
    // check that a sender is an owner, i.e. entitled to vote
    require(voted[getWhatID(_name)][proposedEntriesCount[getWhatID(_name)]][msg.sender] == false);
    _;
  }

  modifier isExpired (string memory _name) { 
    // check that a sender is an owner, i.e. entitled to vote
    uint id = getWhatID(_name);
    require(now > proposedEntries[id][proposedEntriesCount[id]].proposedTimestamp + 86400);
    _;
  }

  constructor() public {
    // 1. Set the owner to the transaction sender
    owner = msg.sender;
    // 2. Initialize the sku count to 0.
    whatCount = 0;
  }

  function createWhat(string memory _name, string memory _entry) 
    public 
    doesNotExist(_name) 
    returns (bool) 
    {
    // 1. Create the What
    whats[whatCount+1].name = _name;
    whats[whatCount+1].state = State.Open;
    // 2. Write the entry and mark the ownership
    ids[_name] = whatCount+1;
    ownership[whatCount+1][msg.sender] = 1;
    proposedEntries[whatCount+1][1] = Entry({
      what: _name,
      content: _entry,
      state: State.Accepted,
      proposer: msg.sender,
      proposedTimestamp: now
    });
    acceptedEntries[whatCount+1][1] = Entry({
      what: _name,
      content: _entry,
      state: State.Accepted,
      proposer: msg.sender,
      proposedTimestamp: now
    });
    proposedEntriesCount[whatCount+1] = 1;
    acceptedEntriesCount[whatCount+1] = 1;
    // 3. Advance the whatCount
    whatCount += 1;
    // 4. Emit the event
    emit LogWhatCreated(ids[_name],_name, _entry);
    // 5. Return true
    return true;
    }

  function getWhatID(string memory _name)
    public returns (uint)
    {
      return ids[_name];
    }

  function getWhatCount()
    public returns (uint)
    {
      return whatCount;
    }

  function advanceWhatCount()
    public returns (uint)
    {
      whatCount += 1;
      return whatCount;
    }

   function proposeEntry(string memory _name, string memory _entry)
    public
    doesExist(_name)
    isOpen(_name)
    meetsLengthLimits(_entry)
    returns (bool)
    {
      uint id = getWhatID(_name);
      proposedEntries[id][proposedEntriesCount[id]+1] = Entry({
        what: _name,
        content: _entry,
        state: State.Proposed,
        proposer: msg.sender,
        proposedTimestamp: now
      });
      proposedEntriesCount[id] += 1;
      whats[id].state = State.Voting;
      return true;
    }

   function vote(string memory _name)
    public
    doesExist(_name)
    isVoting(_name)
    isOwner(_name)
    hasNotAlreadyVoted(_name)
    returns (bool)
    {
      uint id = getWhatID(_name);
      voted[id][proposedEntriesCount[id]][msg.sender]=true;
      votes[id] += ownership[id][msg.sender];
      // If that vote is pivotal, we terminate the vote and accept the entry
      if (votes[id] > acceptedEntriesCount[id]/2) {
        // Accept the entry
        proposedEntries[id][proposedEntriesCount[id]].state = State.Accepted;
        acceptedEntries[id][acceptedEntriesCount[id]+1] = proposedEntries[id][proposedEntriesCount[id]];
        acceptedEntriesCount[id] += 1;
        // Put the What back in an open state
        whats[id].state = State.Open;
        // Credit the proposer with an ownership token
        ownership[id][proposedEntries[id][proposedEntriesCount[id]].proposer] += 1;
      }
    }

   function currentTime() public returns (uint256){
        return now;
    }

   function endVote(string memory _name)
    public 
    isExpired(_name)
    returns (bool)
    {
      uint id = getWhatID(_name);
      proposedEntries[id][proposedEntriesCount[id]].state = State.Rejected;
      whats[id].state = State.Open;
      return true;
    }



    // function deleteWhat(string memory _name) 
    // public returns (bool) 
    // {
    // delete whats[_name];
    // return true;
    // }

    // function checkWhat(string memory _name) 
    // // 1. Check that What doesn't already exist
    // // [TD] doesNotExist(what)
    // public returns (bool) 
    // {
    // return true;
    // }

//  function fetchWhatByID(uint _id) public view  
//     returns (string memory name, uint id, string memory content, State state, address creator, address lastContributor, bool exists) 
//     { 
//     name = whats[_id].name; 
//     id = whats[_id].id; 
//     content = whats[_id].content; 
//     state = whats[_id].state; 
//     creator = whats[_id].creator; 
//     lastContributor = whats[_id].lastContributor; 
//     exists = whats[_id].exists;
//     // emit LogFetched(name,_id);
//     return (name, id, content, state, creator, lastContributor, exists);
//     }

//  function fetchWhatByName(string memory _name) public view  
//     returns (string memory name, uint id, string memory content, State state, address creator, address lastContributor, bool exists) 
//     { 
//     name = whats[_name].name; 
//     id = whats[_name].id; 
//     content = whats[_name].content; 
//     state = whats[_name].state; 
//     creator = whats[_name].creator; 
//     lastContributor = whats[_name].lastContributor; 
//     exists = whats[_name].exists;
//     // emit LogFetched(name,_id);
//     return (name, id, content, state, creator, lastContributor, exists);
//     }
}