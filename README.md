# Crowdfunding DApp

A decentralized crowdfunding platform built on the Ethereum blockchain. This application allows users to create campaigns, contribute funds, and vote on spending requests, ensuring transparency and accountability in fundraising.

## 🚀 Features

- **Campaign Creation**: Users can easily deploy their own crowdfunding campaigns with specific goals and minimum contribution amounts.
- **Secure Contributions**: Backers can contribute ETH to campaigns they support.
- **Request System**: Campaign managers cannot withdraw funds directly. Instead, they must create "spending requests" specifying the amount, recipient, and purpose.
- **Democratic Voting**: Contributors (approvers) vote on spending requests. Funds are only released if a request receives approval from more than 50% of the approvers.

## 🛠 Technology Stack

- **Blockchain**: Solidity, Ethereum
- **Development Framework**: Hardhat
- **Frontend**: Next.js (React)
- **Styling**: Semantic UI
- **Interaction**: Ethers.js

## 📦 Installation & Setup

Follow these steps to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Metamask](https://metamask.io/) browser extension

### 1. Clone the Repository

```bash
git clone https://github.com/DanielCorbellini/crowdfunding-dapp-eth.git
cd crowdfunding
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Local Blockchain (Hardhat)

Start a local Ethereum node:

```bash
npx hardhat node
```

### 4. Compile & Deploy

In a separate terminal, compile and deploy the contracts to the local network:

Compile:

```bash
npx hardhat compile
```

Deploy:

```bash
npx hardhat ignition deploy ignition/modules/CampaignFactory.ts --network localhost
```

### 5. Configure Environment Variables

Navigate to the `app` directory and create a `.env` file based on the example:

```bash
cd app
cp .env.example .env
```

Open the `.env` file and configure the variables:

- `NEXT_PUBLIC_RPC_URL`: Set this to your local Hardhat node URL (usually `http://127.0.0.1:8545/`).
- `NEXT_PUBLIC_FACTORY_ADDRESS`: Paste the deployed contract address from the previous step (check your terminal output).

Example `.env`:

```env
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545/
NEXT_PUBLIC_FACTORY_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 6. Run the Frontend

Start the Next.js development server (in /app folder):

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📜 Smart Contracts

The project consists of two main contracts:

- **`CampaignFactory.sol`**: A factory contract that manages the deployment of new Campaign instances. It keeps a record of all deployed campaigns.
- **`Campaign.sol`**: The core logic for individual campaigns. It handles contributions, manages the list of approvers, and processes spending requests.

## 📄 License

This project is licensed under the MIT License.
