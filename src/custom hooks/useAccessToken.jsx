"use client";

import { useState, useEffect } from "react";

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Create a dedicated API endpoint to get the token
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/auth/token", {
          credentials: "include", // Important for including cookies
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const data = await response.json();
        setAccessToken(data.token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  return accessToken;
};

export default useAccessToken;
