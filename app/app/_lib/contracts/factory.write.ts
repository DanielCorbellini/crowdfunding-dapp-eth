/**
 * Pre-configured instance of the CampaignFactory contract to sign transactions
 */

"use client";

import { ethers } from "ethers";
import campaignFactory from "@/../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";
import { getWalletProvider } from "../providers/walletProvider";

export async function getFactory() {
  const provider = await getWalletProvider();
  const signer = await provider.getSigner();

  console.log("factory.write.ts");
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_FACTORY_ADDRESS!,
    campaignFactory.abi,
    signer
  );
}
