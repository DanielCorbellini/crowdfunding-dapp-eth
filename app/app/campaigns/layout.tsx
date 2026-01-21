"use client";

import { useRouter } from "next/navigation";
import Button from "../_components/Button";

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8">
        <Button className="p-5" onClick={() => router.back()}>
          ⬅️ Go back
        </Button>
      </div>
      {children}
    </div>
  );
}
