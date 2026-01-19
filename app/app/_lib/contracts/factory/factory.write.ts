/**
 * Pre-configured instance of the CampaignFactory contract to sign transactions
 */

"use client";

import campaignFactory from "@/../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";
import { ethers } from "ethers";
import { getWalletProvider } from "../../providers/walletProvider";

export async function getCampaignFactoryWrite() {
  const provider = await getWalletProvider();
  const signer = await provider.getSigner();

  return new ethers.Contract(
    process.env.NEXT_PUBLIC_FACTORY_ADDRESS!,
    campaignFactory.abi,
    signer,
  );
}
