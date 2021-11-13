# What is WhatIs?

WhatIs is a tool for on-chain collaborative content development. It's inspired by a Cuy Sheffield article entitled [*Fantasy Hollywood*](https://future.a16z.com/fantasy-hollywood-crypto-and-community-owned-characters/), but could also be compared to a crypto version of a creative Wikipedia, or even related to some of Reddit's supposed plans of incorporating crypto into their reputation systems. The idea is that a group of contributors can endogenously form around a theme ("a What") and add to the corpus of content associated with that What by proposing a submission ("an entry"). Then the group of prior contributors votes on whether to accept the entry into the What. When an entry is accepted, the proposer of the entry becomes a voting member of the group for future entries.

IMO, there are three major improvements possible/required to make it a real product:
1. An entry should be a key to any piece of multimedia stored in IPFS or elsewhere, and viewers and contributors should be able to experience the corpus of entries through an immersive frontend. For now, an entry is just a string of capped length. Frontend isn't exactly immersive :P.
2. Ideally WhatIs would be a contract factory, deploying a contract for each What. In its current monolith, its storage would quickly bloat if it got any traction.
3. Currently the WhatIs contract has its own internal "ownership" structure for voting. I chose this route as a learning exercise. Obviously it would be more secure, and a very different product, if each What carried a transactable ERC20 (or other) token for voting on entries. This could actually monetize/incentivize the content/community creation flywheel.

Details on how to use the contract are included as instructions in the [Github Pages frontend](https://shaneauerbach.github.io/blockchain-developer-bootcamp-final-project/).

A few requirements for the final project submission:
1. You'll find the naming format for this repo is as required in the submission doc.
2. You're reading the README.md file. Glad to see you found it!
    - Re: directory, it's a very simple setup. We have a contracts folder with the main contract, `WhatIs.sol`. We have a test folder with the main test file `contract.test.js`. ``astHelper.js` and `exceptionsHelper.js` are helper files I stole shamelessly from one of our exercises to facilitate quite thorough testing. `timeHelpers.js` is another helper that allows us to manipulate the timestamp on a Ganache chain. The frontend is a simple HTML (`index.html`) + JS (`dapp.js`) combo. Then there's a few files per your requirements: `deployed_address.txt`, `avoiding_common_attacks.md`, and `design_pattern_decision.md`. They're not very insightful, but they check boxes in your rubric! The rest of the files/subdirectories are Truffle artifacts, with which you are certainly familiar.
    - The frontend is here: https://shaneauerbach.github.io/blockchain-developer-bootcamp-final-project/
    - My public Ethereum address is: 0x7532cd0651030D3dC80B28199a125Fc9f5aC80fa. I gratefully accept tokens, NFTs, certifications, frankincense, and myrrh. Especially myrrh.
3. `WhatIs.sol` is my smart contract. 
    - It is lovingly commented per NatSpec specifications.
    - See `design_pattern_decision.md` for design patterns.
    - See `avoiding_common_attacks.md` for common attack avoidance.
    - It inherits `Pausable` and `Ownable` from OpenZeppelin.
    - Indeed, it compiles, passes *rigorous* testing I've created, and is deployed on Rinkeby for your viewing pleasure!
4. It containts the two markdown files requested: `design_pattern_decision.md` and `avoiding_common_attacks.md`.
5. It has 34 unit tests, debatably more as some "its" have multiple assertions. Wow! See `contract.test.js`. You should be able to run the tests yourself on Ganache using `truffle test`. Don't try to run that testing script on Rinkeby or it'll deploy ~33 instances of the contract to different addresses and complain that you don't have multiple accounts with test eth to perform the tests! I definitely didn't try that accidentally.
6. Yeah, there's a `deployed_address.txt` file. I follow instructions.
7. There's a frontend with HTML+JS linked above.
8. Yes, it's deployed to [Github Pages](https://shaneauerbach.github.io/blockchain-developer-bootcamp-final-project/). A lot of people don't know that I'm world famous in New Zealand for my frontend skills.
9. Instructions on testing/dependencies:
   - Dependencies: You'll need `npm install @openzeppelin/contracts` and `npm install dotenv` if you don't already have them. Assuming you already have npm and the Truffle Suite, including Ganache, set up. You'll also need a `.env` file that defines `MNEMONIC` and `INFURA_URL` for deployment. I also define `ETHERSCAN_API_KEY` in the `truffle-config.js` so that I can use the [truffle-plugin-verify](https://github.com/rkalis/truffle-plugin-verify), but you can comment out that line if you don't want to use it.
   - Access: Just go to the frontend and have play. It's all ready to go.
   - To run the unit tests, you should just be able to call `truffle test` (or `truffle develop` then `test`) from inside the repo. I haven't actually defined the development environment in `truffle-config.js` so presumably it just uses whatever the Ganache default is for the port?
10. Here's a screencast of me walking through the project.


