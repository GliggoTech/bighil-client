"use client";
import useAccessToken from "@/custome hooks/useAccessToken";
import useFetch from "@/custome hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";

import React from "react";

const Delete_Client = ({ client, clients, setCurrentClients }) => {
  const { loading, error, success, fetchData } = useFetch();
  const token = useAccessToken();
  const handleDelete = async (e) => {
    e.preventDefault();

    const url = getBackendUrl();

    const res = await fetchData(
      `${url}/api/bighil-clients/delete-client/${client._id}`,
      "DELETE",
      {},
      token,
      false
    );
    if (res.success) {
      const newClients = clients.filter(
        (existingClient) => existingClient._id !== client._id
      );
      setCurrentClients(newClients);
    }
  };

  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-400 text-white font-bold px-4 py-1 rounded"
        onClick={(e) => handleDelete(e)}
      >
        {loading ? "Loading..." : "Delete"}
      </button>
    </div>
  );
};

export default Delete_Client;
