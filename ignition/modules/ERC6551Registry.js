const { ethers } = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const ERC6551Registry = await ethers.getContractFactory("ERC6551Registry");
  const [owner] = await ethers.getSigners();
  const ownerAddress = await owner.getAddress();
  const erc6551Registry = await ERC6551Registry.deploy();

  await erc6551Registry.waitForDeployment();

  console.log("ERC6551Registry deployed to:", erc6551Registry.target);
  await erc6551Registry.deploymentTransaction().wait(6);
  await verify(erc6551Registry.target, []);

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