"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building, Users } from "lucide-react";
import Delete_Client from "./Delete_Client";
import Bighil_Client_Dialog from "./Bighil_Client_Dialog";
import Edit_Client from "./Edit_Client";

const Clients_Table = ({ clients }) => {
  const [currentClients, setCurrentClients] = useState(clients);

  const [selectedClient, setSelectedClient] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <Card className=" border border-border-light shadow-md dark:border-border-dark dark:bg-surface-dark transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-background-secondary/50 dark:bg-background-dark/50 border-b border-border-light dark:border-border-dark">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          {/* Left Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
              <Users className="h-5 w-5 text-primary dark:text-primary-light" />
            </div>
            <div>
              <CardTitle className="text-xl text-text-primary dark:text-text-light">
                Current Clients
              </CardTitle>
              <CardDescription className="text-text-secondary dark:text-text-muted">
                Manage your client companies
              </CardDescription>
            </div>
          </div>

          {/* Right Section - Button */}
          <div className="self-start md:self-center">
            <Bighil_Client_Dialog
              currentClients={currentClients}
              setOpen={setOpen}
              open={open}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              setCurrentClients={setCurrentClients}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {currentClients.length === 0 ? (
          <div className="text-center py-12 bg-background-tertiary dark:bg-surface-dark rounded-lg border border-dashed border-border-medium dark:border-border-dark">
            <Building className="h-12 w-12 mx-auto text-text-muted dark:text-text-muted/70 mb-3 opacity-50" />
            <p className="text-text-secondary dark:text-text-muted text-lg">
              No clients available
            </p>
            <p className="text-text-muted dark:text-text-muted/70 mt-1">
              Please add a new client to get started
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-lg border border-border-light dark:border-border-dark">
              <Table>
                <TableHeader className="bg-background-secondary dark:bg-surface-dark">
                  <TableRow className="hover:bg-background-secondary/80 dark:hover:bg-surface-dark/90 border-border-light dark:border-border-dark">
                    <TableHead className="text-text-primary dark:text-text-light font-medium">
                      Company Name
                    </TableHead>
                    <TableHead className="text-text-primary dark:text-text-light font-medium">
                      Contact
                    </TableHead>
                    <TableHead className="text-right text-text-primary dark:text-text-light font-medium">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentClients.map((client, index) => (
                    <TableRow
                      key={`${client._id}+${index}`}
                      className="hover:bg-background-secondary/40 dark:hover:bg-surface-dark/80 border-border-light dark:border-border-dark animate-fade-in transition-colors"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell className="font-medium text-text-primary dark:text-text-light">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-primary dark:text-primary-light" />
                          {client.companyName}
                        </div>
                      </TableCell>
                      <TableCell className="text-text-secondary dark:text-text-muted">
                        {client.contactNumber}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
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

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {currentClients.map((client, index) => (
                <div
                  key={`mobile-${client._id}+${index}`}
                  className="p-4 border border-border-light dark:border-border-dark rounded-lg bg-background-secondary/30 dark:bg-surface-dark/80 hover:shadow-md transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-primary/10 dark:bg-primary/20">
                        <Building className="h-3.5 w-3.5 text-primary dark:text-primary-light" />
                      </div>
                      <h3 className="font-medium text-text-primary dark:text-text-light">
                        {client.companyName}
                      </h3>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-background-primary/80 dark:bg-background-dark/50 border-border-light dark:border-border-dark"
                    >
                      Client
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-text-muted dark:text-text-muted/80 mb-1">
                      Contact Number
                    </p>
                    <p className="text-text-secondary dark:text-text-muted">
                      {client.contactNumber}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-end border-t border-border-light dark:border-border-dark pt-3">
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
