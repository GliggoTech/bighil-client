"use client";

import { useState, useEffect } from "react";

const useAccessToken = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/auth/token", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const data = await response.json();
        console.log("Token data:", data);
        setToken(data.token);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching token:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { token, loading, error };
};

export default useAccessToken;
