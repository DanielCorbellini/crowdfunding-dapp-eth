/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { contributeToCampaign } from "../_lib/contracts/campaign/campaign.write";
import Button from "./Button";
import MessageCard from "./MessageCard";
import Spinner from "./Spinner";

export default function ContributeForm({
  campaignAddress,
  minimumContribution,
}: {
  campaignAddress: string;
  minimumContribution: string;
}) {
  const [contribution, setContribution] = useState<string>("");
  const [message, setMessage] = useState<{
    text: string;
    successfully: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);
      await contributeToCampaign(campaignAddress, Number(contribution));
      setContribution("");
      setMessage({
        text: "Contribution successful!",
        successfully: true,
      });
      router.refresh();
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

  return isLoading ? (
    <Spinner message="Processing transaction..." />
  ) : (
    <form onSubmit={handleSubmit}>
      <label>
        Amount to contribute (Eth) <span className="text-red-500">*</span>
      </label>
      <input
        className="w-full p-2 mt-2 border border-white/10 rounded-2xl bg-black/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
        type="number"
        id="contribution"
        placeholder="Ex: 0.000001"
        value={contribution}
        onChange={(e) => setContribution(e.target.value)}
        min={minimumContribution}
        step="any"
        required
      />
      {message && (
        <MessageCard
          message={message.text}
          successfully={message.successfully}
        />
      )}
      <Button className="w-full mt-5" type="submit">
        Contribute
      </Button>
    </form>
  );
}
