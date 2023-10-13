import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
const hre = require("hardhat");
 async function main() {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const Watermarked = await deployments.get("Watermarked");

    if (!Watermarked.address) {
        console.error("Watermarked contract not found!");
        return;
    }

    const watermarked = await hre.ethers.getContractAt("Watermarked", Watermarked.address);

  console.log(watermarked);
    // Assuming you are the owner because only owner can mint, replace with your own address or ensure deployer is owner.
    // const TO_MINT_COUNT = 1;
    // for (let i = 0; i < TO_MINT_COUNT; i++) {
        // const tokenURI = `ipfs://bafybeifyg2n2baaph5cbg4oncogaxd4turwddr54g5jinwphk2of354ouu/encoded_image.png{i}`; // Replace with your actual tokenURI logic or API endpoint
        const tokenURI = `ipfs://bafybeifyg2n2baaph5cbg4oncogaxd4turwddr54g5jinwphk2of354ouu/encoded_image.png`; // Replace with your actual tokenURI logic or API endpoint
        const tx = await watermarked.mintItem(deployer, tokenURI);
        await tx.wait();
        // console.log(`Minted token with ID ${i + 1} for ${deployer} with tokenURI ${tokenURI}`);
        console.log(`Minted token  for ${deployer} with tokenURI ${tokenURI}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
