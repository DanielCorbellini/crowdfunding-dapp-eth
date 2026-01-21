import LinkButton from "@/app/_components/LinkButton";

type PageProps = {
  params: {
    campaignAddress: string;
  };
};

export default async function CampaignRequests({ params }: PageProps) {
  const { campaignAddress } = await params;

  console.log(campaignAddress);

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">Campaign Requests</h3>
      <LinkButton
        href={`/campaigns/${campaignAddress}/requests/create`}
        className="p-6"
      >
        Add Request
      </LinkButton>
    </div>
  );
}
