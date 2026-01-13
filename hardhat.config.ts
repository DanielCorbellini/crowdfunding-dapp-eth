import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.31",
  networks: {
    sepolia: {
      url: process.env.INFURA_API_KEY!,
      accounts: {
        mnemonic: process.env.MNEMONIC!,
        initialIndex: 2,
        count: 1,
      },
    },
  },
};

export default config;
