const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; 

  const Game2 = await ethers.getContractFactory("Game2");
  const game2 = await Game2.attach(contractAddress);

  // Step 1: Set values where x + y === 50
  await (await game2.setX(10)).wait();
  await (await game2.setY(40)).wait();

  // Step 2: Call win and capture receipt
  const tx = await game2.win();
  const receipt = await tx.wait();

  // Step 3: Check if Winner event was emitted
  const winnerEvent = receipt.events.find(e => e.event === "Winner");

  if (winnerEvent) {
    console.log("🎉 SUCCESS! Winner event emitted!");
    console.log("🏆 Winner:", winnerEvent.args.winner);
  } else {
    console.log("❌ Failed: No Winner event found.");
  }
}

main().catch((err) => {
  console.error("💥 Error running win script:", err);
});
