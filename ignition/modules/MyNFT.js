const { ethers } = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const tokenId = 10;
  const [owner] = await ethers.getSigners();
  const ownerAddress = await owner.getAddress();
  const myNFT = await MyNFT.deploy();

  await myNFT.waitForDeployment();

  console.log("MyNFT deployed to:", myNFT.target);
  await myNFT.deploymentTransaction().wait(6);
  await verify(myNFT.target, []);

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