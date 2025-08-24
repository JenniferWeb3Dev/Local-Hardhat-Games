const { ethers } = require("hardhat");

async function main() {
  const gameAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"; 

  const Game4 = await ethers.getContractFactory("Game4");
  const game = Game4.attach(gameAddress);

  const [player] = await ethers.getSigners();

  // Deposit 1 ether
  await (await game.connect(player).deposit({ value: ethers.utils.parseEther("1") })).wait();

  // Call win
  const tx = await game.connect(player).win();
  const receipt = await tx.wait();

  const winnerEvent = receipt.events.find(e => e.event === "Winner");

  if (winnerEvent) {
    console.log("🎉 SUCCESS! Winner event emitted!");
    console.log("🏆 Winner:", winnerEvent.args.winner);
  } else {
    console.log("❌ Win failed. No Winner event found.");
  }
}

main().catch((err) => {
  console.error("💥 Error running win script:", err);
});
