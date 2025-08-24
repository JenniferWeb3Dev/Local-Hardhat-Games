const { ethers } = require("hardhat");

async function main() {
  const gameAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508"; 

  const Game5 = await ethers.getContractFactory("Game5");
  const game = await Game5.attach(gameAddress);

  const [player] = await ethers.getSigners();

  // Step 1: Give allowance
  const tx1 = await game.connect(player).giveMeAllowance(10000);
  await tx1.wait();

  // Step 2: Mint 10000
  const tx2 = await game.connect(player).mint(10000);
  await tx2.wait();

  // Step 3: Call win
  const tx3 = await game.connect(player).win();
  const receipt = await tx3.wait();

  const winnerEvent = receipt.events.find(e => e.event === "Winner");

  if (winnerEvent) {
    console.log("🏆 SUCCESS! Winner event emitted.");
    console.log("🎉 Winner:", winnerEvent.args.winner);
  } else {
    console.log("❌ No Winner event found.");
  }
}

main().catch((err) => {
  console.error("💥 Error running win script:", err);
});
