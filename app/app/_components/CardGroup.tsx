import React from "react";

interface CardGroupProps {
  children: React.ReactNode;
}

export default function CardGroup({ children }: CardGroupProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 p-4">
      {children}
    </div>
  );
}
