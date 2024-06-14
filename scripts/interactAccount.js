const {ethers} = require("hardhat");
require("dotenv").config();
const artifact = require("../src/artifacts/contracts/TokenBoundAccount.sol/TokenBoundAccount.json")

async function main() {
    const provider = new ethers.AlchemyProvider(
        "sepolia",
        process.env.ALCHEMY_SEPOLIA_API_KEY
      );
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const tokenBoundAccount = "0xc7Bcf9ABBbCC488Edc36bE46180a362Fe9D18613"
    const tba = new ethers.Contract(tokenBoundAccount, artifact.abi, signer)



    // const tx =  await tba.();
    // await tx.wait();
    const accountOwner =  await tba.owner();
    console.log("New Account Owner: ", accountOwner);

  }
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });