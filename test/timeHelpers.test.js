const timeHelpers = require("./timeHelpers");

describe("Testing timeHelpers. They should be able to", () => {
  it("advance the blockchain forward a block", async () =>{
      const originalBlock = await web3.eth.getBlock('latest');
      const originalBlockHash = originalBlock.hash;
      await timeHelpers.advanceBlock();
      const newBlock = await web3.eth.getBlock('latest');
      const newBlockHash = newBlock.hash;
      assert.notEqual(originalBlockHash, newBlockHash);
  });

  it("advance time and block together", async () => {
      const advancement = 600;
      const originalBlock = await web3.eth.getBlock('latest');
      const newBlock = await timeHelpers.advanceTimeAndBlock(advancement);
      const timeDiff = newBlock.timestamp - originalBlock.timestamp;
      assert.isTrue(timeDiff >= advancement);
  });
});
