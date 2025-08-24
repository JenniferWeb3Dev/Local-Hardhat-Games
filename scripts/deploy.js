const { ethers } = require("hardhat");

async function main() {
  const Game5 = await ethers.getContractFactory("Game5");
  const game = await Game5.deploy();

  await game.deployed();
  console.log(`🎮 Game5 deployed to: ${game.address}`);
}

main().catch((err) => {
  console.error("💥 Deployment failed:", err);
});
