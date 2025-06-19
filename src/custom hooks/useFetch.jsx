"use client";

import { deleteToken } from "@/app/actions/deleteToken";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const router = useRouter();

  const fetchData = useCallback(
    async (url, method, body, token, media = false) => {
      const headers = new Headers();

      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }

      if (!media) {
        headers.append("Content-Type", "application/json");
      }

      const config = {
        method: method.toUpperCase(),
        headers,
        body: media
          ? method == "GET"
            ? null
            : body
          : method == "GET"
          ? null
          : JSON.stringify(body),
        credentials: "include", // Add credentials here
      };

      try {
        setLoading(true);
        const response = await fetch(url, config);
        const data = await response.json();
        console.log("Response Data:", data);

        if (!data.success) {
          const error = new Error(data.message || "Request failed");
          setError(data.message);
          setLoading(false);
          // throw error;
        }
        setError(null);
        setLoading(false);

        return data;
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
        setError(error.message);
        if (
          error.message == "Session expired or invalid" ||
          error.message == "User authentication required"
        ) {
          const deleteTokenResponse = await deleteToken();
          if (deleteTokenResponse.success) {
            router.push("/client/invalid-session");
            return;
          } else {
            toast.error(deleteTokenResponse.message);
            return;
          }
        }

        throw error;
      }
    },
    []
  );

  return { loading, error, data, fetchData };
};

export default useFetch;
