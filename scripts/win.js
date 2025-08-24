const { ethers } = require("hardhat");

async function main() {
  const gameAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"; 

  const Game3 = await ethers.getContractFactory("Game3");
  const game = await Game3.attach(gameAddress);

  const [addr1, addr2, addr3] = await ethers.getSigners();

  // Each one sends ETH using buy()
  await (await game.connect(addr1).buy({ value: ethers.utils.parseEther("1") })).wait();
  await (await game.connect(addr2).buy({ value: ethers.utils.parseEther("1") })).wait();
  await (await game.connect(addr3).buy({ value: ethers.utils.parseEther("1") })).wait();

  // Call win() with the 3 buyers
  const tx = await game.win(addr1.address, addr2.address, addr3.address);
  const receipt = await tx.wait();

  // Check for the Winner event
  const winnerEvent = receipt.events.find((e) => e.event === "Winner");

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
