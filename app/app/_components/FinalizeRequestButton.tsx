"use client";

import { useState } from "react";
import { finalizeRequest } from "../_lib/contracts/campaign/campaign.write";
import Button from "./Button";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function FinalizeRequestButton({
  index,
  campaignAddress,
}: {
  index: number;
  campaignAddress: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleFinalizeRequest() {
    try {
      setIsLoading(true);
      await finalizeRequest(index, campaignAddress);
      toast.success("Request finalized successfully!");
      router.refresh();
    } catch (err) {
      toast.error(`Error: ${err.reason}`);
    } finally {
      setIsLoading(false);
    }
  }

  return isLoading ? (
    <Spinner message="Finalizing request..." className="!w-15 !h-15" />
  ) : (
    <Button
      onClick={handleFinalizeRequest}
      className="p-6 !bg-yellow-500/10 !border !border-yellow-500 !bg-gradient-to-r !from-yellow-500 !to-yellow-600"
    >
      Finalize
    </Button>
  );
}
