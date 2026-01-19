import Card from "./_components/Card";
import CardGroup from "./_components/CardGroup";
import LinkButton from "./_components/LinkButton";
import { getCampaignBalance } from "./_lib/contracts/campaign/campaign.read";
import { getCampaignFactoryRead } from "./_lib/contracts/factory/factory.read";

export default async function Home() {
  const factory = getCampaignFactoryRead();
  const campaigns = await factory.getDeployedCampaigns();

  return (
    <main>
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            FutureCrowd
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-400">
          Discover and support the next generation of decentralized projects.
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold">Open Campaigns</h2>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 border border-blue-500/20">
            {campaigns.length} Active
          </span>
        </div>

        {/* Create Campaign Button */}
        <div className="flex justify-end">
          <LinkButton href="/campaigns/create" className="px-4">
            Create Campaign
          </LinkButton>
        </div>

        <CardGroup>
          {campaigns.map(async (campaignAddress: string) => (
            <Card
              key={campaignAddress}
              address={campaignAddress}
              currentAmount={await getCampaignBalance(campaignAddress)}
            />
          ))}
        </CardGroup>

        {campaigns.length === 0 && (
          <div className="text-center py-20 rounded-2xl border border-dashed border-gray-800 bg-white/5">
            <p className="text-gray-400">No campaigns deployed yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
