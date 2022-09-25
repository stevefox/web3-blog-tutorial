import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const Blog = await ethers.getContractFactory("Blog");
  const blog = await Blog.deploy("My web3 tutorial blog");

  await blog.deployed();
  console.log("Blog deployed to:", blog.address);

  const signer = await blog.signer.getAddress();
  fs.writeFileSync('./config.js',
`export const contract Address = "${blog.address}"
export const ownerAddress = "${signer}"
`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
