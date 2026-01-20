import React from "react";

interface CampaignDataCardProps {
  title: string;
  value: string | number;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function CampaignDataCard({
  title,
  value,
  description,
  children,
  className,
}: CampaignDataCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white/5 p-6 shadow-xl backdrop-blur-lg transition-all hover:-translate-y-1 hover:shadow-2xl hover:bg-white/10 border border-white/10 ${className}`}
    >
      <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-blue-500/20 blur-xl transition-all group-hover:bg-blue-500/40" />
      <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-purple-500/20 blur-xl transition-all group-hover:bg-purple-500/40" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
            {title}
          </h3>
          <div className="text-2xl font-bold text-gray-100 break-words">
            {value}
          </div>
        </div>

        {description && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-gray-500">{description}</p>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
