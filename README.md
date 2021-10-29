# What is whatis?

whatis is a tool for on-chain collaborative content development. Flow:

1. User 1 defines the content of the first block.
2. The tool creates the first block, assigns one pluto token to User 1, and writes content to whatis/pluto/1.
3. User 2 comes along and wants to add content to pluto. She submits content to whatis/pluto/submit.
4. Any submission kicks off a vote with one vote per token. A non-vote is counted as a no. The submission must receive a majority of yes votes within 24 hours to be accepted. If accepted, it is added as a block and written to whatis/pluto/2. The submitter is given one token.
5. ...

Goal is to create structures for character/narrative development and governance, related to this Cuy Sheffield article: https://future.a16z.com/fantasy-hollywood-crypto-and-community-owned-characters/


Steps I need to work on:
1. Setting this up as a truffle project -- DONE
2. Turning the wireframe into a smart contract
3. Deploying to Ganache for simple testing
4. Building unit tests
5. Deploying to Rinkeby
6. Build front end
7. Deploy front end to Github Pages or Heroku
8. Perform submission steps


