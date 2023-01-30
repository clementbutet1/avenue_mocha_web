import React from "react";
import { useRouter } from "next/router";

export default function MainLayout({ children }) {
  const router = useRouter();

  return (
    <div className="flex flex-row w-full bg-[#F5F5F5] box-border">
      {router.route != "/login" && !router.asPath.startsWith("/authentication")}
      <div
        className={`flex flex-col bg-[#ffffff] dark:bg-black ${
          router.route != "/login" &&
          !router.asPath.startsWith("/authentication")
        } w-full `}
      >
        {children}
      </div>
    </div>
  );
}
