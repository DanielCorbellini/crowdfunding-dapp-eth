import ApproveRequestButton from "@/app/_components/ApproveRequestButton";
import FinalizeRequestButton from "@/app/_components/FinalizeRequestButton";
import LinkButton from "@/app/_components/LinkButton";
import { getAllCampaignRequests } from "@/app/_lib/contracts/campaign/campaign.read";

type PageProps = {
  params: {
    campaignAddress: string;
  };
};

export default async function CampaignRequests({ params }: PageProps) {
  const { campaignAddress } = await params;

  const { requests, requestsCount } = await getAllCampaignRequests(
    campaignAddress,
  );

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-5">Campaign Requests</h3>
      <p className="text-white">Total requests: {requestsCount}</p>
      <div className="flex justify-end">
        <LinkButton
          href={`/campaigns/${campaignAddress}/requests/create`}
          className="p-6 mt-4"
        >
          Add Request
        </LinkButton>
      </div>
      <div className="w-full overflow-x-auto bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 mb-8 mt-8">
        <table className="w-full border-collapse bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10">
          <thead>
            <tr className="bg-black/20 text-gray-400 uppercase text-xs font-semibold tracking-wider border-b border-white/10">
              <th className="px-6 py-5 text-center">ID</th>
              <th className="px-6 py-5 text-center">Description</th>
              <th className="px-6 py-5 text-center">Value (ETH)</th>
              <th className="px-6 py-5 text-center">Recipient</th>
              <th className="px-6 py-5 text-center">Approvals</th>
              <th className="px-6 py-5 text-center">Status</th>
              <th className="px-6 py-5 text-center">Approve</th>
              <th className="px-6 py-5 text-center">Finalize</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {requests.map((request) => (
              <tr
                key={request.id}
                className="hover:bg-white/5 transition-colors text-sm text-gray-300 text-center"
              >
                <td className="px-6 py-4 font-medium text-white">
                  {request.id}
                </td>
                <td className="px-6 py-4 font-medium text-white">
                  {request.description}
                </td>
                <td className="px-6 py-4 text-white">{request.value}</td>
                <td className="px-6 py-4 font-mono text-white">
                  {request.recipient}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-blue-400 font-bold">
                    {request.approvalCount} / {request.approversCount}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {request.complete ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <ApproveRequestButton
                    index={request.id}
                    campaignAddress={campaignAddress}
                    disabled={request.complete}
                  />
                </td>

                <td className="px-6 py-4 text-center">
                  <FinalizeRequestButton
                    index={request.id}
                    campaignAddress={campaignAddress}
                    disabled={
                      request.complete ||
                      !(
                        request.approvalCount >
                        Number(request.approversCount) / 2
                      )
                    }
                  />
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-white">
                  No requests found for this campaign.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
