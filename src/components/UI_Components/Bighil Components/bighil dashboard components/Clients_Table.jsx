"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building, Users } from "lucide-react";
import Delete_Client from "./Delete_Client";
import Bighil_Client_Dialog from "./Bighil_Client_Dialog";
import Edit_Client from "./Edit_Client";
import { formatDate } from "@/lib/formatDateFun";
import ViewClient from "./ViewClient";

const Clients_Table = ({ clients }) => {
  const [currentClients, setCurrentClients] = useState(clients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between gap-1 w-full">
          <div className="flex items-start md:items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Users className="h-5 w-5 text-white dark:text-primary-light" />
            </div>
            <div>
              <CardTitle className="text-xl text-text_color dark:text-text-light font-medium">
                Current Clients
              </CardTitle>
            </div>
          </div>

          <Bighil_Client_Dialog
            currentClients={currentClients}
            setOpen={setOpen}
            open={open}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            setCurrentClients={setCurrentClients}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      </CardHeader>

      <CardContent>
        {currentClients.length === 0 ? (
          <div className="text-center py-12 bg-background-tertiary dark:bg-surface-dark rounded-lg border border-dashed border-border-medium dark:border-border-dark">
            <Building className="h-12 w-12 mx-auto text-text-text_color dark:text-text-text_color/70 mb-3 opacity-50" />
            <p className="text-text-secondary dark:text-text-text_color text-lg">
              No clients available
            </p>
            <p className="text-text-text_color dark:text-text-text_color/70 mt-1">
              Please add a new client to get started
            </p>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:block bg-default_bg rounded-lg p-5 ">
              <Table className="  w-full border-b border-b--dialog_inside_border_color border border-dialog_inside_border_color">
                <TableHeader className=" !border-b-[2px] !border-dialog_inside_border_color dark:!border-b-gray-700">
                  <TableRow>
                    <TableHead className="text-text_color dark:text-text-light font-medium uppercase">
                      Company Name
                    </TableHead>

                    <TableHead className="text-text_color dark:text-text-light font-medium uppercase">
                      Contact
                    </TableHead>
                    <TableHead className="text-text_color dark:text-text-light font-medium uppercase">
                      Registered On
                    </TableHead>
                    <TableHead className="text-center text-text_color dark:text-text-light font-medium uppercase">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentClients.map((client, index) => (
                    <TableRow
                      key={client._id}
                      className=" p-20 hover:bg-background-secondary/40 dark:hover:bg-surface-dark/80 border-b border-dialog_inside_border_color dark:border-border-dark animate-fade-in"
                    >
                      <TableCell className="text-text_color dark:text-text-light">
                        {client.companyName}
                      </TableCell>
                      <TableCell className="text-text-secondary dark:text-text-text_color">
                        {client.contactNumber}
                      </TableCell>
                      <TableCell className="text-text-secondary dark:text-text-text_color">
                        {formatDate(client.createdAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex gap-2 justify-center">
                          <ViewClient
                            client={client}
                            setSelectedClient={setSelectedClient}
                            setOpen={setOpen}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                          />
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
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-2">
              {currentClients.map((client, index) => (
                <div
                  key={client._id}
                  className="p-1 rounded-lg bg-default_bg dark:bg-surface-dark/80 animate-fade-in"
                >
                  <div className="flex justify-between items-center mb-2 p-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-primary/10 dark:bg-primary/20">
                        <Building className="h-3.5 w-3.5 text-primary dark:text-primary-light" />
                      </div>
                      <h3 className="text-text_color dark:text-text-light font-medium">
                        {client.companyName}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-text-text_color dark:text-text-text_color/80 mb-1">
                      Contact Number
                    </p>
                    <p className="text-text-secondary dark:text-text-text_color">
                      {client.contactNumber}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-end border-t border-dialog_inside_border_color dark:border-border-dark pt-3">
                    <ViewClient
                      client={client}
                      setSelectedClient={setSelectedClient}
                      setOpen={setOpen}
                      viewMode={viewMode}
                      setViewMode={setViewMode}
                    />
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
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Clients_Table;
