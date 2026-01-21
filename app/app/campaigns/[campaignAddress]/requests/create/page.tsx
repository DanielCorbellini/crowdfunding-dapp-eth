/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/app/_components/Button";
import MessageCard from "@/app/_components/MessageCard";
import Spinner from "@/app/_components/Spinner";
import { createRequest } from "@/app/_lib/contracts/campaign/campaign.write";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCampaignBalance } from "@/app/_lib/contracts/campaign/campaign.read";

export default function CreateRequestPage() {
  const params = useParams();
  const { campaignAddress } = params;

  const [value, setValue] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    successfully: boolean;
  } | null>(null);
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    async function loadBalance() {
      setBalance(await getCampaignBalance(campaignAddress as string));
    }

    loadBalance();
  }, [campaignAddress]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);

      await createRequest(
        description,
        value,
        recipient,
        campaignAddress as string,
      );

      setMessage({
        text: "Request created successfully.",
        successfully: true,
      });
      setValue("");
      setRecipient("");
      setDescription("");
    } catch (err: any) {
      console.error(err);
      if (err.code === "ACTION_REJECTED") {
        return setMessage({
          text: "Transaction rejected by user.",
          successfully: false,
        });
      }

      if (err.reason) {
        return setMessage({
          text: err.reason,
          successfully: false,
        });
      }

      return setMessage({
        text: "Something went wrong while creating the campaign.",
        successfully: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-[85vh] flex items-center justify-center px-4">
      {isLoading ? (
        <Spinner message="Creating request..." />
      ) : (
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Create Request
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                required
                className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Ex: Buy batteries"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Value (Eth) <span className="text-red-500">*</span>
              </label>
              <input
                required
                className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="number"
                placeholder="1.0"
                max={balance}
                min={0}
                step="any"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Recipient <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                type="text"
                placeholder="0x0000000000000000000000000000000000000000"
                className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {message && (
              <MessageCard
                message={message.text}
                successfully={message.successfully}
              />
            )}

            <Button type="submit" className="p-2 mt-6">
              Create Request
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
