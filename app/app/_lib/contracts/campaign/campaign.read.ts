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

/**
 * Returns the summary (variables of the contract) of a campaign
 * @param address Campaign address
 * @returns Campaign summary
 */
export async function getCampaignSummary(address: string) {
  const campaign = getCampaignRead(address);
  const summary = await campaign.getSummary();

  return {
    minimumContribution: summary[0],
    balance: ethers.formatEther(summary[1]),
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
    goal: ethers.formatEther(summary[5]),
    totalContributed: ethers.formatEther(summary[6]),
  };
}
