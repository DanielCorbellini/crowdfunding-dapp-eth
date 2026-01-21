import campaignFactory from "@/../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";
import { ethers } from "ethers";
import { getReadProvider } from "../../providers/readProvider";

/**
 * Pre-configured instance of the CampaignFactory contract to read data from the blockchain
 */
export function getCampaignFactoryRead() {
  const provider = getReadProvider();

  return new ethers.Contract(
    process.env.NEXT_PUBLIC_FACTORY_ADDRESS!,
    campaignFactory.abi,
    provider,
  );
}
