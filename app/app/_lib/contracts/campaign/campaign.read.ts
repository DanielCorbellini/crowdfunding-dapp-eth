import Campaign from "@/../artifacts/contracts/Campaign.sol/Campaign.json";
import { ethers } from "ethers";
import { getReadProvider } from "../../providers/readProvider";

const provider = getReadProvider();

/**
 * Returns a pre-configured instance of the Campaign contract to read data
 * @param address Campaign address
 * @returns Campaign instance
 */
export function getCampaignRead(address: string) {
  return new ethers.Contract(address, Campaign.abi, provider);
}

/**
 * Returns the balance of a campaign
 * @param address Campaign address
 * @returns Campaign balance
 */
export async function getCampaignBalance(address: string) {
  const balance = await provider.getBalance(address);

  return ethers.formatEther(balance);
}

/**
 * Returns the goal of a campaign
 * @param address Campaign address
 * @returns Campaign goal
 */
export async function getCampaignGoal(address: string) {
  const campaign = getCampaignRead(address);
  const goal = await campaign.goal();

  return ethers.formatEther(goal);
}
