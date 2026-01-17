"use client";

import { useEffect, useState } from "react";

type WalletStatus = "checking" | "missing" | "available";

export function useWallet() {
  const [status, setStatus] = useState<WalletStatus>("checking");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.ethereum) {
      setStatus("available");
    } else {
      setStatus("missing");
    }
  }, []);

  return status;
}
