// // page.js
// "use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  FileText,
  Calendar,
  Users,
} from "lucide-react";
// import React, { useEffect, useState } from "react";

export default function Client_Statistics_Page({
  client_summary,
  monthly_trends,
}) {
  //   // Get parallel routes from hidden slots
  //   const [clientSummary, setClientSummary] = useState(null);
  //   const [monthlyTrends, setMonthlyTrends] = useState(null);

  //   useEffect(() => {
  //     // Access parallel routes after component mounts
  //     setClientSummary(document.getElementById("client_summary_slot")?.innerHTML);
  //     setMonthlyTrends(document.getElementById("monthly_trends_slot")?.innerHTML);
  //   }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-text_color dark:text-text-light">
            Client Statistics Dashboard
          </h1>
          <p className="text-sm text-secondary dark:text-text-secondary">
            Comprehensive analytics and insights
          </p>
        </div>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-6 gap-2 mb-6">
          <TabsTrigger
            value="summary"
            className="flex items-center gap-2 shadow-xl bg-gray/10"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Summary</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Trends</span>
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Revenue</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card className="p-0 border-none">
            <CardContent className=" p-0 border-none">
              {/* Render parallel route safely */}
              {/* {clientSummary && (
                <div dangerouslySetInnerHTML={{ __html: clientSummary }} />
              )} */}
              {client_summary}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="p-0 border-none">
            <CardContent className="p-1">
              {/* Render parallel route safely */}
              {/* {monthlyTrends && (
                <div dangerouslySetInnerHTML={{ __html: monthlyTrends }} />
              )} */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other tabs as needed */}
      </Tabs>
    </div>
  );
}
