import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const DepartmentBreakDownTable = ({ data }) => {
  const getPerformanceBadge = (percentage) => {
    const rate = parseInt(percentage);
    if (rate >= 75) {
      return <Badge className="bg-primary text-white ">Excellent</Badge>;
    } else if (rate >= 50) {
      return <Badge className="bg-yellow text-white ">Good</Badge>;
    } else {
      return <Badge className="bg-red text-white ">Needs Improvement</Badge>;
    }
  };

  const getResolutionTimeDisplay = (time) => {
    const days = parseFloat(time.replace(" days", ""));
    if (days === 0) {
      return "< 1 day";
    } else if (days < 0.1) {
      return "< 0.1 days";
    } else {
      return `${days.toFixed(1)} days`;
    }
  };

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-600 bg-white border-none">
        <p>No department data available.</p>
      </Card>
    );
  }

  const formatDepartmentName = (name) => {
    return name.replace(" Department", "");
  };

  return (
    <Card className="p-0 bg-white border-none shadow-sm">
      <CardHeader className="bg-white rounded-t-lg">
        <CardTitle className="text-xl font-bold text-gray-800 flex justify-between items-center md:flex-row flex-col">
          Department Performance Details
          {/* Summary Footer */}
          <div className="bg-white rounded-lg p-4 border-none shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {
                    data.filter((d) => parseInt(d.resolvedPercentage) >= 75)
                      .length
                  }
                </div>
                <div className="text-gray-700 font-medium">
                  Excellent Performers
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {
                    data.filter(
                      (d) =>
                        parseInt(d.resolvedPercentage) >= 50 &&
                        parseInt(d.resolvedPercentage) < 75
                    ).length
                  }
                </div>
                <div className="text-gray-700 font-medium">Good Performers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red">
                  {
                    data.filter((d) => parseInt(d.resolvedPercentage) < 50)
                      .length
                  }
                </div>
                <div className="text-gray-700 font-medium">
                  Need Improvement
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
        <p className="text-sm text-gray-700">
          Detailed breakdown of complaint handling metrics by department
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-md border border-green-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-50 hover:bg-green-50">
                  <TableHead className="font-semibold text-gray-800 min-w-[150px]">
                    Department
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 text-center min-w-[100px]">
                    Complaints
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 text-center min-w-[120px]">
                    Resolved %
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 text-center min-w-[140px]">
                    Avg. Resolution Time
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800 text-center min-w-[120px]">
                    Performance
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data
                  .sort((a, b) => b.complaints - a.complaints) // Sort by complaints count (highest first)
                  .map((dept, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-green-50 transition-colors border-none"
                    >
                      <TableCell className="font-medium text-gray-800">
                        {formatDepartmentName(dept.department)}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-green-700">
                        {dept.complaints}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="font-semibold text-gray-800">
                            {dept.resolvedPercentage}
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                parseInt(dept.resolvedPercentage) >= 75
                                  ? "bg-primary"
                                  : parseInt(dept.resolvedPercentage) >= 50
                                  ? "bg-yellow"
                                  : "bg-red"
                              }`}
                              style={{ width: dept.resolvedPercentage }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-medium text-gray-700">
                        {getResolutionTimeDisplay(dept.avgResolutionTime)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getPerformanceBadge(dept.resolvedPercentage)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentBreakDownTable;
