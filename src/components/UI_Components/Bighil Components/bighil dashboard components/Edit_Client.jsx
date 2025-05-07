"use client";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import React from "react";

const Edit_Client = ({ client, setOpen, setSelectedClient }) => {
  function handleEdit(client) {
    setSelectedClient(client);
    setOpen(true);
  }
  return (
    <Button
      onClick={() => handleEdit(client)}
      className="bg-info_bg/10 hover:bg-blue group text-white font-light w-fit  rounded"
    >
      <PencilIcon className="w-4 h-4 text-primary group-hover:text-white " />
    </Button>
  );
};

export default Edit_Client;
