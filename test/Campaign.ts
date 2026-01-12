import hre from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Campaign, CampaignFactory } from "../typechain-types";
import assert from "assert";

describe("Campaign contracts", function () {
  let deployer: SignerWithAddress;
  let factory: CampaignFactory;
  let campaign: Campaign;
  let campaignAddress: string;

  beforeEach(async () => {
    // Get the first account as deployer
    [deployer] = await hre.ethers.getSigners();

    factory = await hre.ethers.deployContract("CampaignFactory", [], {
      signer: deployer,
      // gasLimit: 1000000,
    });

    // Every call of the contract will use the defined signer and gasLimit
    await factory.createCampaign("100");

    [campaignAddress] = await factory.getDeployedCampaigns();
    campaign = await hre.ethers.getContractAt(
      "Campaign",
      campaignAddress,
      deployer
    );
  });

  describe("Campaigns", function () {
    it("deploys a factory and a campaign", async () => {
      expect(factory.target).to.not.equal(hre.ethers.ZeroAddress);
      expect(campaign.target).to.not.equal(hre.ethers.ZeroAddress);
    });
  });
});
