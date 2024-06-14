require("hardhat");
require("dotenv").config();

async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.attach(process.env.MYNFT_ADDRESS);
    tokenId = 18;

    const to = process.env.PUBLIC_KEY;
    const tx = await myNFT.safeMint(to, tokenId);
  
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
  
    // Log the transaction details
    console.log("Transaction hash:", receipt.hash);
    console.log("Gas used:", receipt.cumulativeGasUsed);
  
    // Check if the transaction was successful (status 1)
    if (receipt.status === 1) {
      console.log(`Transaction was successful. Token ${tokenId} minted to ${to}`);
    } else {
      console.log("Transaction failed.");
    }
  
  }
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });