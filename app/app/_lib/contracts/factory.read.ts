/**
 * Pre-configured instance of the CampaignFactory contract to read data from the blockchain
 */

import { ethers } from "ethers";
import campaignFactory from "@/../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";
import { getReadProvider } from "../providers/readProvider";

export function getCampaignFactoryRead() {
  const provider = getReadProvider();

  console.log("factory.read.ts");
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_FACTORY_ADDRESS!,
    campaignFactory.abi,
    provider
  );
}
