import hre from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Campaign, CampaignFactory } from "../typechain-types";

describe("Campaign contracts", function () {
  let deployer: SignerWithAddress;
  let users: SignerWithAddress[];
  let factory: CampaignFactory;
  let campaign: Campaign;
  let campaignAddress: string;

  beforeEach(async () => {
    // Get the first account as deployer
    [deployer, ...users] = await hre.ethers.getSigners();

    // If we don't specify the signer, the deployer will be used by default
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

    it("marks caller a campaign manager", async () => {
      const manager = await campaign.manager();
      expect(manager).to.equal(deployer.address);
    });

    it("allow people to contribute and marks them as approvers", async () => {
      await campaign.connect(users[0]).contribute({ value: 100 });
      const isContributor = await campaign.approvers(users[0].address);
      expect(isContributor).to.be.true;
    });

    it("requires a minimum contribution", async () => {
      try {
        await campaign.connect(users[0]).contribute({ value: 50 });
      } catch (err) {
        expect(err).to.be.an("Error");
      }
    });

    it("allows a manager to make a payment request", async () => {
      await campaign.createRequest("Buy batteries", 100, users[1].address);

      const request = await campaign.requests(0);
      expect(request.description).to.equal("Buy batteries");
      expect(request.value).to.equal(100);
      expect(request.recipient).to.equal(users[1].address);
      expect(request.approvalCount).to.equal(0);
      expect(request.complete).to.be.false;
    });

    it("processes requests", async () => {
      await campaign
        .connect(users[0])
        .contribute({ value: hre.ethers.parseEther("10") });

      await campaign.createRequest(
        "Buy GPUs",
        hre.ethers.parseEther("5"),
        users[1].address
      );

      await campaign.connect(users[0]).approveRequest(0);
      await campaign.finalizeRequest(0);

      // deployer (a SignerWithAddress) holds the account information,
      // but getBalance() is a network-level query handled by the Provider.
      const balance = await deployer.provider!.getBalance(users[1].address);
      expect(balance).to.be.greaterThan(hre.ethers.parseEther("104"));
    });
  });
});
