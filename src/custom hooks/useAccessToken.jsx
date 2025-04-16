"use client";
import { getToken } from "@/lib/getToken";
import { useState, useEffect } from "react";

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setAccessToken(token);
    };
    fetchToken();
  }, []);

  return accessToken;
};

export default useAccessToken;
