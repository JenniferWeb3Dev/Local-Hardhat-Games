const { ethers } = require("hardhat");

async function main() {
  const Game4 = await ethers.getContractFactory("Game4");
  const game = await Game4.deploy();
  await game.deployed();
  console.log("✅ Game4 deployed at:", game.address);
}

main().catch((err) => {
  console.error("💥 Deployment failed:", err);
});

