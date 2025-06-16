import React from "react";
import { Building2, Calendar, TrendingUp } from "lucide-react";

const ClientSummaryHeader = ({
  companyName,
  firstComplaintDate,
  totalComplaints,
}) => {
  return (
    <div className="bg-primary -z-10 text-white p-8 rounded-t-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{companyName}</h1>
            <p className="text-whiet text-lg">Client Summary Dashboard</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-5 w-5 text-whiet/10" />
            <span className="text-whiet">First Complaint</span>
          </div>
          <p className="text-xl font-semibold">{firstComplaintDate}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center space-x-2">
        <TrendingUp className="h-5 w-5 text-green/30" />
        <span className="text-lg">
          <span className="font-bold text-2xl">{totalComplaints}</span>
          <span className="ml-2 text-whiet">Total Complaints Recorded</span>
        </span>
      </div>
    </div>
  );
};

export default ClientSummaryHeader;
