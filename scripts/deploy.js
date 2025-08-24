const { ethers } = require("hardhat");

async function main() {
  const Game3 = await ethers.getContractFactory("Game3");
  const game = await Game3.deploy();
  await game.deployed();

  console.log("✅ Game3 deployed at:", game.address);
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
