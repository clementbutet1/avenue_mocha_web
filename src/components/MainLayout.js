import React from "react";
import { useRouter } from "next/router";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-row w-full bg-[#F5F5F5] box-border">
      <div className={`flex flex-col bg-[#ffffff] dark:bg-black w-full`}>
        {children}
      </div>
    </div>
  );
}