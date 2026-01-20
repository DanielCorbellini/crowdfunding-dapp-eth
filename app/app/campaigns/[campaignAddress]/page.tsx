import CampaignDataCard from "@/app/_components/CampaignDataCard";
import CardGroup from "@/app/_components/CardGroup";
import ContributeForm from "@/app/_components/ContributeForm";
import LinkButton from "@/app/_components/LinkButton";
import {
  getCampaignGoal,
  getCampaignSummary,
} from "@/app/_lib/contracts/campaign/campaign.read";
import { ethers } from "ethers";

type PageProps = {
  params: {
    campaignAddress: string;
  };
};

export default async function Campaigns({ params }: PageProps) {
  const { campaignAddress } = await params;
  const campaignSummary = await getCampaignSummary(campaignAddress);
  const campaignGoal = await getCampaignGoal(campaignAddress);

  return (
    <div className="space-y-6">
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">
          Campaign Dashboard
        </h2>
        <p className="text-gray-400 font-mono text-sm break-all">
          {campaignAddress}
        </p>
      </div>

      <CardGroup>
        <CampaignDataCard
          title="Minimum Contribution"
          value={`${
            campaignSummary.minimumContribution
          } WEI / ${ethers.formatEther(
            campaignSummary.minimumContribution,
          )} ETH`}
          description="The minimum amount of WEI required to become an approver."
        />
        <CampaignDataCard
          title="Campaign Balance"
          value={`${campaignSummary.balance} ETH`}
          description="How much money this campaign has left to spend."
        />

        <CampaignDataCard
          title="Total Contributed"
          value={`${campaignSummary.totalContributed} ETH`}
          description="How much money this campaign has raised so far."
        />

        <CampaignDataCard
          title="Contributors"
          value={Number(campaignSummary.approversCount)}
          description="Number of people who have already donated to this campaign."
        />
        <CampaignDataCard
          title="Campaign Goal"
          value={`${campaignGoal} ETH`}
          description="The amount of money the campaign aims to raise."
        />
        <CampaignDataCard
          title="Manager Address"
          value={campaignSummary.manager}
          description="The address of the manager who created this campaign."
        />

        <CampaignDataCard
          className="col-span-3"
          title="Requests"
          value={Number(campaignSummary.requestsCount)}
          description="A request tries to withdraw money from the contract. Requests must be approved by approvers."
        >
          <LinkButton
            className="w-full mt-4"
            href={`/campaigns/${campaignAddress}/requests`}
          >
            View all requests
          </LinkButton>
        </CampaignDataCard>
      </CardGroup>

      <div className="flex flex-col gap-2 mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">
          Contribute to this campaign
        </h2>

        <ContributeForm
          campaignAddress={campaignAddress}
          minimumContribution={ethers.formatEther(
            campaignSummary.minimumContribution,
          )}
        />
      </div>
    </div>
  );
}
