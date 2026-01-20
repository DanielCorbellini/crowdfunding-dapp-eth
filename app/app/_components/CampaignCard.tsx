import LinkButton from "./LinkButton";

interface CampaignCardProps {
  address: string;
  title?: string;
  description?: string;
  currentAmount?: string;
  targetAmount?: string;
  goal?: string;
}

export default function CampaignCard({
  address,
  title = "Amazing Campaign", // Placeholder
  description = "This project aims to revolutionize the way we think about blockchain crowdfunding. Support us to make a difference.", // Placeholder
  currentAmount = "1.2", // Placeholder ETH
  goal = "5.0", // Placeholder ETH
}: CampaignCardProps) {
  const progress = (parseFloat(currentAmount) / parseFloat(goal)) * 100;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 shadow-xl backdrop-blur-lg transition-all hover:-translate-y-1 hover:shadow-2xl hover:bg-white/10 border border-white/10">
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-purple-500/30 blur-2xl transition-all group-hover:bg-purple-500/50" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-500/30 blur-2xl transition-all group-hover:bg-blue-500/50" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3
            className="text-xl font-bold text-gray-100 line-clamp-1"
            title={title}
          >
            {title}
          </h3>
          <p className="text-xs text-gray-400 font-mono mt-1 break-all">
            {address}
          </p>
        </div>

        {/* Description */}
        <div className="flex-grow mb-6">
          <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
        </div>

        {/* Progress Section */}
        <div className="mt-auto">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-gray-200">{currentAmount} ETH</span>
            <span className="text-gray-400">of {goal} ETH</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-4">
            <LinkButton href={`/campaigns/${address}`} className="w-full">
              View Campaign
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
