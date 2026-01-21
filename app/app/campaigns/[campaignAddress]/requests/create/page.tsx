"use client";

import Button from "@/app/_components/Button";
import Spinner from "@/app/_components/Spinner";
import { useState } from "react";

export default function CreateRequestPage() {
  const [value, setValue] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="h-[85vh] flex items-center justify-center px-4">
      {isLoading ? (
        <Spinner message="Creating request..." />
      ) : (
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Create Request
          </h1>
          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Ex: Buy batteries"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Value (Eth)
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="1.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Recipient
              </label>
              <input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                type="text"
                placeholder="0x0000000000000000000000000000000000000000"
                className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <Button type="submit" className="p-2 mt-6">
              Create Request
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
