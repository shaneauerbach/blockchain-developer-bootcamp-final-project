  modifier doesExist (string what) { 
    // check that what is already in the array of defined objects
  }

  modifier doesNotExist (string what) { 
    // check that what is not already in the array of defined objects
  }


  function createWhat(string memory what, string memory content) 
    doesNotExist(what)
    public returns (bool) 
    {
    // Create a new subdirectory on a new topic.
  
    }

  function assignToken(string memory what, address recipient) 
    doesExist(what)
    private 
    {
    // Add a token to what and assign it to recipient
  
    }

  function proposeAddittion(string memory what, string memory content) 
    doesExist(what)
    private 
    {
    // Propose an addition of content to what
  
    }

  function voteOnAddition(string what, uint addition_id) 
    doesExist(what)
    public
    {
    // Vote on addition
  
    }

  function resolveVote(string what, uint addition_id) 
    doesExist(what)
    public
    {
    // Resolve the vote, adding the content to what
  
    }
  