"use client";

import useAccessToken from "@/custome hooks/useAccessToken";
import useFetch from "@/custome hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { getToken } from "@/lib/getToken";
import { useRouter } from "next/navigation";
import React from "react";

const Bighil_Navbar = ({ session }) => {
  const router = useRouter();
  const { loading, success, error, fetchData } = useFetch();
  const token = useAccessToken();

  const handlelogout = async () => {
    const url = getBackendUrl();

    const res = await fetchData(
      `${url}/api/bigil-auth/bighil-logout`,
      "POST",
      {},
      token,
      false
    );
    if (res.success) {
      router.push("/");
    }
  };
  return (
    <div className="w-full h-20 bg-black flex items-center justify-end p-4 sm:px-8">
      <div className="mr-10">
        <h1 className="text-2xl font-semibold font-Questrial text-[hsl(0,0%,100%)]">
          Welcome
        </h1>
      </div>
      <div className="flex items-center space-x-4 mr-5">
        <button
          onClick={handlelogout}
          disabled={loading}
          className="font-semibold font-Questrial text-[hsl(0,0%,100%)] border p-2 bg-[hsl(275,60%,50%)] rounded-md hover:bg-[hsl(275,60%,60%)] transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Bighil_Navbar;
