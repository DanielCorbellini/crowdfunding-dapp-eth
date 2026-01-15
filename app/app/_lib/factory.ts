/**
 * Pre-configured instance of the CampaignFactory contract
 */

"use client";

import { ethers } from "ethers";
import campaignFactory from "@/../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";

const ADDRESS = "0x6EC0eC8A78565911347e8f459AFD4b2eD4dDf24D";

export async function getFactory() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(ADDRESS, campaignFactory.abi, signer);
}
