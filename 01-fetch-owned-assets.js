// scripts/01-fetch-owned-assets.js
console.log("01-fetch-owned-assets.js");
// Imports
import { ERC725 } from "@erc725/erc725.js";
import erc725schema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import Web3 from "web3.min.js";
import "isomorphic-fetch";

// Static variables
const RPC_ENDPOINT = "https://rpc.testnet.lukso.gateway.fm";
const IPFS_GATEWAY = "https://api.universalprofile.cloud/ipfs";
const SAMPLE_PROFILE_ADDRESS = "0x9139def55c73c12bcda9c44f12326686e3948634";

// Parameters for the ERC725 instance
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };

// BBB Function to update the HTML with owned assets
async function displayOwnedAssets() {
  try {
    const ownedAssets = await fetchOwnedAssets(SAMPLE_PROFILE_ADDRESS);
    const ownedAssetsList = document.getElementById("owned-assets-list");

    // Clear the existing list
    ownedAssetsList.innerHTML = "";

    // Populate the list with owned assets
    ownedAssets.forEach((asset) => {
      const listItem = document.createElement("li");
      listItem.textContent = asset;
      ownedAssetsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching owned assets: ", error);
  }
}
/*
 * Fetch the LSP5 data of the Universal Profile
 * to get its ever received assets
 *
 * @param address of the Universal Profile
 * @return address[] of received assets or custom error
 */
async function fetchOwnedAssets(address) {
  try {
    const profile = new ERC725(erc725schema, address, provider, config);
    const result = await profile.fetchData("LSP5ReceivedAssets[]");
    return result.value;
  } catch (error) {
    return console.log("This is not an ERC725 Contract: ", error);
  }
}

// Debug
fetchOwnedAssets(SAMPLE_PROFILE_ADDRESS).then((ownedAssets) =>
  console.log(JSON.stringify(ownedAssets, undefined, 2))
);
// Call the function to display owned assets when the page loads
window.addEventListener("load", displayOwnedAssets);
