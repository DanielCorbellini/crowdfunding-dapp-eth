"use client";

import campaignFactory from "@/../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";
import { ethers } from "ethers";
import { getWalletProvider } from "../../providers/walletProvider";

const provider = await getWalletProvider();

/**
 * Pre-configured instance of the CampaignFactory contract to sign transactions
 */
export async function getCampaignFactoryWrite() {
  const signer = await provider.getSigner();

  return new ethers.Contract(
    process.env.NEXT_PUBLIC_FACTORY_ADDRESS!,
    campaignFactory.abi,
    signer,
  );
}

/**
 * Creates a new campaign and returns the campaign address
 *
 * @param minContribution
 * @returns Campaign address
 */
export async function createCampaignAndGetAddress(
  minContribution: number,
  goal: number,
) {
  const factory = await getCampaignFactoryWrite();
  const goalWei = ethers.parseEther(goal.toString());
  const tx = await factory.createCampaign(minContribution, goalWei);
  const receipt = await tx.wait();

  // Search the event in the recepit
  const event = receipt.logs
    .map((log: { topics: ReadonlyArray<string>; data: string }) =>
      factory.interface.parseLog(log),
    )
    .find(
      (parsedLog: { name: string }) => parsedLog?.name === "CampaignCreated",
    );

  if (event) {
    return event.args.campaign;
  }
}
