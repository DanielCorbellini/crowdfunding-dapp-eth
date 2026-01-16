/**
 * Provider for reading data from the blockchain (server-side)
 */

import { ethers } from "ethers";

export function getReadProvider() {
  return new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
}
