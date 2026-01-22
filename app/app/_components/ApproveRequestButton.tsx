"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { approveRequest } from "../_lib/contracts/campaign/campaign.write";
import Button from "./Button";
import Spinner from "./Spinner";

export default function ApproveRequestButton({
  index,
  campaignAddress,
}: {
  index: number;
  campaignAddress: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleApproveRequest() {
    try {
      setIsLoading(true);
      await approveRequest(index, campaignAddress);
      toast.success("Request approved successfully!");
      router.refresh();
    } catch (err) {
      console.log(err.reason);
      toast.error(`Error: ${err.reason}`);
    } finally {
      setIsLoading(false);
    }
  }

  return isLoading ? (
    <Spinner message="Approving request..." className="!w-15 !h-15" />
  ) : (
    <Button
      onClick={handleApproveRequest}
      className="p-6 !bg-green-500/10 !border !border-green-500 !bg-gradient-to-r !from-green-500 !to-green-600"
    >
      Approve
    </Button>
  );
}
