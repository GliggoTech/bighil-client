import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import React from "react";

const ViewClient = ({
  client,
  setOpen,
  setSelectedClient,
  viewMode,
  setViewMode,
}) => {
  function handleEdit(client) {
    setSelectedClient(client);
    setViewMode(true);
    setOpen(true);
  }
  return (
    <Button
      onClick={() => handleEdit(client)}
      className="bg-orange/10 hover:bg-orange group text-white font-light w-fit  rounded"
    >
      <Eye className="w-4 h-4 text-orange group-hover:text-white " />
    </Button>
  );
};

export default ViewClient;
