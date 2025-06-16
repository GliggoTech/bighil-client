import React from "react";
import ClientSummaryCard from "./ClientSummaryCard";
import { FileText, Timer, Shield, Users, AlertTriangle } from "lucide-react";

const ClientSummaryContainer = ({ data = {} }) => {
  console.log("Client Summary Data:", data);
  // Utility to safely extract values
  const getSafeValue = (key, fallback = "N/A") => {
    const value = data?.[key];
    if (Array.isArray(value)) return value.length ? value.join(", ") : fallback;
    return value !== undefined && value !== null && value !== ""
      ? value
      : fallback;
  };

  // Prepare cards
  const summaryCards = [
    {
      id: "total-complaints",
      title: "Total Complaints",
      value: getSafeValue("Total Complaints Filed", 0),
      icon: FileText,
      color: "from-blue/50 to-blue/60",
      bgColor: "bg-blue/10",
      iconColor: "text-blue",
      description: "Total number of complaints filed",
    },
    {
      id: "resolution-time",
      title: "Average Resolution Time",
      value: getSafeValue("Avg. Resolution Time", "0 hrs"),
      icon: Timer,
      color: "from-orange/50 to-orange/60",
      bgColor: "bg-orange/10",
      iconColor: "text-orange",
      description: "Average time to resolve complaints",
    },
    {
      id: "complaint-category",
      title: "Top Complaint Category",
      value: getSafeValue("Highest Complaint Category"),
      icon: Shield,
      color: "from-red/50 to-red/60",
      bgColor: "bg-red/10",
      iconColor: "text-red",
      description: "Most frequent complaint category",
    },
    {
      id: "active-departments",
      title: "Active Departments",
      value: getSafeValue("Active Departments", 0),
      icon: Users,
      color: "from-green/50 to-green/60",
      bgColor: "bg-green/10",
      iconColor: "text-green",
      description: "Departments having most of the complaints",
    },
  ];

  // Optional insights data
  const insights = [
    {
      key: "First Complaint Date",
      color: "bg-blue",
      message: `Company has been active since ${getSafeValue(
        "First Complaint Date"
      )}`,
    },
    {
      key: "Security Insight",
      color: "bg-red",
      message: getSafeValue(
        "Security Insight",
        "Security breaches are the primary concern"
      ),
    },
    {
      key: "Department Insight",
      color: "bg-green",
      message: getSafeValue(
        "Department Insight",
        "Multiple departments are actively involved"
      ),
    },
    {
      key: "Resolution Insight",
      color: "bg-orange",
      message: getSafeValue(
        "Resolution Insight",
        "Resolution metrics need improvement"
      ),
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

      {/* Dynamic Insights */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <h3 className="text-xl font-semibold text-gray-800">Key Insights</h3>
        </div>
        {data["Total Complaints Filed"] != 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            {insights.map(
              (insight, index) =>
                insight.message && (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${insight.color}`}
                    ></div>
                    <span>{insight.message}</span>
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            No insights available as there are no complaints filed.
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientSummaryContainer;
