"use client";

import MessageCard from "@/app/_components/MessageCard";
import Spinner from "@/app/_components/Spinner";
import { createCampaignAndGetAddress } from "@/app/_lib/contracts/factory/factory.write";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCampaign() {
  const router = useRouter();
  const [minContribution, setMinContribution] = useState<number | string>("");
  const [goal, setGoal] = useState<number | string>("");
  const [message, setMessage] = useState<{
    text: string;
    successfully: boolean;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const campaignAddress = await createCampaignAndGetAddress(
        Number(minContribution),
        Number(goal),
      );

      router.push("/campaigns/" + campaignAddress);
    } catch (err: any) {
      console.error(err);
      if (err.code === "ACTION_REJECTED") {
        return setMessage({
          text: "Transaction rejected by user.",
          successfully: false,
        });
      }

      if (err.reason) {
        return setMessage(err.reason);
      }

      return setMessage({
        text: "Something went wrong while creating the campaign.",
        successfully: false,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[85vh] flex items-center justify-center px-4 overflow-hidden">
      {loading ? (
        <Spinner message="Processing transaction..." />
      ) : (
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Create a campaign
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Minimum contribution (wei)
              </label>
              <input
                type="number"
                placeholder="100"
                min={1}
                value={minContribution}
                onChange={(e) => setMinContribution(Number(e.target.value))}
                required
                title="Minimum contribution (wei)"
                className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Goal (Ether)
              </label>
              <input
                type="number"
                placeholder="100"
                min={1}
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                required
                title="Goal (Ether)"
                className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {message && (
              <MessageCard
                message={message.text}
                successfully={message.successfully}
              />
            )}

            {/* Campos futuros (já no padrão) */}
            {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Campaign name
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div> */}

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600
                       text-white font-bold py-3 rounded-xl
                       hover:opacity-90 transition-opacity cursor-pointer"
            >
              Create campaign
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
