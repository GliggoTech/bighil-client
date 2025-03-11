"use client";
import React from "react";

const Edit_Client = ({ client, setOpen, setSelectedClient }) => {
  function handleEdit(client) {
    setSelectedClient(client);
    setOpen(true);
  }
  return (
    <button
      onClick={() => handleEdit(client)}
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 py-1 rounded"
    >
      Edit
    </button>
  );
};

export default Edit_Client;
