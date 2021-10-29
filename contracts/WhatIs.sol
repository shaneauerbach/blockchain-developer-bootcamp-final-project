
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract WhatIs {

  address public owner;

  // Create a counter for the number of unique Whats
  uint public whatCount;

  // Create a mapping from uint id to What
  // mapping (uint => What) public whats;

  // Create a mapping for each What
  // mapping (uint => WhatContent) public whatContents;

  // Define the state a What can be in
  enum State{Open, Voting}

  // Define a what
  struct What { 
    string name;
    string content;
    State state;
    address payable creator;
    address payable lastContributor;
    bool exists;
  }

  // Create a bidirectional mapping between whats and ids
  mapping (uint => What) public whats;
  mapping (string => uint) public ids;

  // <LogCreated event: name, id>
  event LogCreated(string name, uint id);

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

  constructor() public {
    // 1. Set the owner to the transaction sender
    owner = msg.sender;
    // 2. Initialize the sku count to 0.
    whatCount = 1;
  }

  function createWhat(string memory _name, string memory _content) 
    public 
    doesNotExist(_name) 
    returns (bool) 
    {
    whats[whatCount] = What({
      name: _name,
      content: _content,
      state: State.Open,
      creator: msg.sender,
      lastContributor: msg.sender,
      exists: true
    });
    // 3. Increment the whatCount by 1
    ids[_name] = whatCount;
    whatCount += 1;
    // 4. Emit the event
    emit LogCreated(_name, whatCount);
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