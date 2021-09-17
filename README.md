# What is whatis?

whatis is a tool for on-chain collaborative content development. Flow:

1. User 1 creates a whatis page, e.g. whatis/pluto.
2. The tool instantiates pluto as a blockchain.
3. User 1 defines the content of the first block.
4. The tool creates the first block, assigns one pluto token to User 1, and writes content to whatis/pluto/1.
5. User 2 comes along and wants to add content to pluto. She submits content to whatis/pluto/submit.
6. Any submission kicks off a vote with one vote per token. A non-vote is counted as a no. The submission must receive a majority of yes votes within 24 hours to be accepted. If accepted, it is added as a block and written to whatis/pluto/2. The submitter is given one token.
7. ...

Goal is to create structures for character/narrative development and governance, related to this Cuy Sheffield article: https://future.a16z.com/fantasy-hollywood-crypto-and-community-owned-characters/


