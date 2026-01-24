/**
 * SimpleStorage Deployment Script
 * 
 * This script deploys the SimpleStorage contract for sandbox testing
 * and provides transparency in the deployment process.
 */

const hre = require("hardhat");

async function main() {
  console.log("=" .repeat(60));
  console.log("SimpleStorage Sandbox Deployment");
  console.log("=" .repeat(60));
  
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("\nDeploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());
  
  // Get network information
  const network = await hre.ethers.provider.getNetwork();
  console.log("\nNetwork Information:");
  console.log("  Name:", network.name);
  console.log("  Chain ID:", network.chainId.toString());
  
  // Deploy SimpleStorage
  console.log("\nDeploying SimpleStorage...");
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();
  
  await simpleStorage.waitForDeployment();
  const address = await simpleStorage.getAddress();
  
  console.log("\n✓ SimpleStorage deployed successfully!");
  console.log("  Contract address:", address);
  console.log("  Owner:", await simpleStorage.owner());
  console.log("  Initial value:", (await simpleStorage.get()).toString());
  
  // Perform test transaction for transparency
  console.log("\n" + "=".repeat(60));
  console.log("Testing Contract Interaction");
  console.log("=" .repeat(60));
  
  console.log("\nSetting value to 42...");
  const setTx = await simpleStorage.set(42);
  const setReceipt = await setTx.wait();
  console.log("  Transaction hash:", setReceipt.hash);
  console.log("  Gas used:", setReceipt.gasUsed.toString());
  console.log("  New value:", (await simpleStorage.get()).toString());
  
  console.log("\nIncrementing value...");
  const incTx = await simpleStorage.increment();
  const incReceipt = await incTx.wait();
  console.log("  Transaction hash:", incReceipt.hash);
  console.log("  Gas used:", incReceipt.gasUsed.toString());
  console.log("  New value:", (await simpleStorage.get()).toString());
  
  console.log("\n" + "=".repeat(60));
  console.log("✓ Sandbox deployment and testing complete!");
  console.log("=" .repeat(60));
  
  return {
    contractAddress: address,
    deployer: deployer.address,
    network: network.name,
    chainId: network.chainId.toString()
  };
}

// Execute deployment
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = main;
