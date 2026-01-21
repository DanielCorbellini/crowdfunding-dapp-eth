"use client";

import campaign from "@/../artifacts/contracts/Campaign.sol/Campaign.json";
import { ethers } from "ethers";
import { getWalletProvider } from "../../providers/walletProvider";

const provider = await getWalletProvider();

/**
 * Pre-configured instance of the Campaign contract to sign transactions
 */
export async function getCampaignWrite(address: string) {
  const signer = await provider?.getSigner();

  return new ethers.Contract(address, campaign.abi, signer);
}

/**
 * Contributes to a campaign
 *
 * @param address Campaign address
 * @param contribution Contribution amount in ETH
 */
export async function contributeToCampaign(
  address: string,
  contribution: number,
) {
  const campaign = await getCampaignWrite(address);
  const contributionWei = ethers.parseEther(contribution.toString());
  const tx = await campaign.contribute({ value: contributionWei });
  const receipt = await tx.wait();

  return receipt;
}

export async function createRequest(
  description: string,
  value: string,
  recipient: string,
  campaignAddress: string,
) {
  const campaign = await getCampaignWrite(campaignAddress);
  const valueWei = ethers.parseEther(value);

  const tx = await campaign.createRequest(description, valueWei, recipient);
  const receipt = await tx.wait();

  return receipt;
}
