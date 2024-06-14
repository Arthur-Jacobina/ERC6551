const { ethers } = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const TokenBoundAccount = await ethers.getContractFactory("TokenBoundAccount");
  const [owner] = await ethers.getSigners();
  const ownerAddress = await owner.getAddress();
  const tokenBoundAccount = await TokenBoundAccount.deploy();

  
  await tokenBoundAccount.waitForDeployment();

  console.log("TokenBoundAccount deployed to:", tokenBoundAccount.target);
  await tokenBoundAccount.deploymentTransaction().wait(6);
  await verify(tokenBoundAccount.target, []);

}
  
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
      await run("verify:verify", {
          address: contractAddress,
          constructorArguments: args,
      })
  } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
          console.log("Already Verified!")
      } else {
          console.log(e)
      }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });