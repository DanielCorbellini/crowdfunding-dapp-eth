/**
 * Provider for interacting with the blockchain (client-side)
 */

"use client";

import { ethers } from "ethers";

export async function getWalletProvider() {
  if (typeof window === "undefined") {
    throw new Error("Server");
  }

  if (!window.ethereum || !window.ethereum.isConnected()) {
    throw new Error("Wallet not connected");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  return new ethers.BrowserProvider(window.ethereum);
}
