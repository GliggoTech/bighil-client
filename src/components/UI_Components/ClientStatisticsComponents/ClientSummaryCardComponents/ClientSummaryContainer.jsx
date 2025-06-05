import React from "react";
import ClientSummaryCard from "./ClientSummaryCard";
import {
  FileText,
  Clock,
  Shield,
  Users,
  AlertTriangle,
  Timer,
} from "lucide-react";

const ClientSummaryContainer = ({ data }) => {
  // Transform the data into card format
  const summaryCards = [
    {
      id: "total-complaints",
      title: "Total Complaints",
      value: data["Total Complaints Filed"],
      icon: FileText,
      color: "from-blue/50 to-blue/60",
      bgColor: "bg-blue/10",
      iconColor: "text-blue",
      description: "Total number of complaints filed",
    },
    {
      id: "resolution-time",
      title: "Average Resolution Time",
      value: data["Avg. Resolution Time"],
      icon: Timer,
      color: "from-orange/50 to-orange/60",
      bgColor: "bg-orange/10",
      iconColor: "text-orange",
      description: "Average time to resolve complaints",
    },
    {
      id: "complaint-category",
      title: "Top Complaint Category",
      value: Array.isArray(data["Highest Complaint Category"])
        ? data["Highest Complaint Category"].join(", ")
        : data["Highest Complaint Category"],
      icon: Shield,
      color: "from-red/50 to-red/60",
      bgColor: "bg-red/10",
      iconColor: "text-red",
      description: "Most frequent complaint category",
    },
    {
      id: "active-departments",
      title: "Active Departments",
      value: data["Active Departments"],
      icon: Users,
      color: "from-green/50 to-green/60",
      bgColor: "bg-green/10",
      iconColor: "text-green",
      description: "Departments having most of the  complaints",
    },
  ];

  return (
    <div className="bg-gray-50 p-8 rounded-b-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Complaint Statistics Overview
        </h2>
        <p className="text-gray/60">
          Comprehensive analysis of complaint data and resolution metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <ClientSummaryCard
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            bgColor={card.bgColor}
            iconColor={card.iconColor}
            description={card.description}
          />
        ))}
      </div>

      {/* Additional insights section */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <h3 className="text-xl font-semibold text-gray-800">Key Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue rounded-full"></div>
            <span>
              Company has been active since {data["First Complaint Date"]}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red rounded-full"></div>
            <span>Security breaches are the primary concern</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green rounded-full"></div>
            <span>Multiple departments are actively involved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange rounded-full"></div>
            <span>Resolution metrics need improvement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSummaryContainer;
