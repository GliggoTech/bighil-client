"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Delete_Client from "./Delete_Client";
import Bighil_Client_Dialog from "./Bighil_Client_Dialog";
import Edit_Client from "./Edit_Client";

const Clients_Table = ({ clients }) => {
  const [currentClients, setCurrentClients] = useState(clients);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>Current Clients</CardTitle>
      </CardHeader>
      <CardContent>
        {currentClients.length === 0 ? (
          <div className="text-center text-gray-500 p-4">
            No clients available. Please add a new client.
          </div>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Company Name</th>
                <th className="border border-gray-300 p-2">Contact</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((client, index) => (
                <tr
                  key={`${client._id}+${index}`}
                  className="border border-gray-300 p-2"
                >
                  <td className="border text-center border-gray-300 p-2">
                    {client.companyName}
                  </td>
                  <td className="border text-center border-gray-300 p-2">
                    {client.contactNumber}
                  </td>
                  <td className="p-1 flex gap-3 justify-center items-center">
                    <Edit_Client
                      client={client}
                      setSelectedClient={setSelectedClient}
                      setOpen={setOpen}
                    />
                    <Delete_Client
                      client={client}
                      clients={clients}
                      setCurrentClients={setCurrentClients}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
      <Bighil_Client_Dialog
        currentClients={currentClients}
        setOpen={setOpen}
        open={open}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        setCurrentClients={setCurrentClients}
      />
    </Card>
  );
};

export default Clients_Table;
