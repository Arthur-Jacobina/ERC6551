require("hardhat");
require("dotenv").config();


async function main() {
  const Registry = await ethers.getContractFactory("ERC6551Registry");
  const registry = await Registry.attach(process.env.ERC6551REGISTRY_ADDRESS);
  const salt = 8;  
  const implementation = process.env.ERC6551ACCOUNT_ADDRESS
  const tokenAddress = process.env.MYNFT_ADDRESS;
  const tokenId = 18
  const chainID = 11155111 
  const initData = "0x";

  const tx = await registry.createAccount(implementation, chainID, tokenAddress, tokenId, salt, initData);
  const receipt = await tx.wait();
  const address = await registry.account(implementation, chainID, tokenAddress, tokenId, salt)
  
  if(receipt.status == 1 && address){
   console.log("Account created successfully at address: ", address);
  }
   else{
    console.log("Account creation failed");
  }

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});