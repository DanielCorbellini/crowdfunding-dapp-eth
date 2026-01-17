import Campaign from "@/../artifacts/contracts/Campaign.sol/Campaign.json";
import { ethers } from "ethers";
import { getReadProvider } from "../../providers/readProvider";

const provider = getReadProvider();

/**
 * @param address Campaign address
 * @returns Campaign instance
 */
export function getCampaignRead(address: string) {
  return new ethers.Contract(address, Campaign.abi, provider);
}

/**
 * @param address Campaign address
 * @returns Campaign balance
 */
export async function getCampaignBalance(address: string) {
  const balance = await provider.getBalance(address);

  return ethers.formatEther(balance);
}
