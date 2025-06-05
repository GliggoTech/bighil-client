import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const DepartmentBreakDownHeader = ({ data }) => {
  const totalComplaints = data.reduce((sum, dept) => sum + dept.complaints, 0);
  const totalDepartments = data.length;

  const overallResolved = data.reduce((sum, dept) => {
    const resolvedCount =
      (dept.complaints * parseInt(dept.resolvedPercentage)) / 100;
    return sum + resolvedCount;
  }, 0);

  const overallResolutionRate = (
    (overallResolved / totalComplaints) *
    100
  ).toFixed(1);

  const topDepartment = data.reduce(
    (max, dept) => (dept.complaints > max.complaints ? dept : max),
    data[0]
  );

  const bestPerforming = data
    .filter((dept) => dept.complaints >= 5)
    .reduce((best, dept) => {
      const currentRate = parseInt(dept.resolvedPercentage);
      const bestRate = parseInt(best.resolvedPercentage);
      return currentRate > bestRate ? dept : best;
    }, data[0]);

  const worstPerforming = data
    .filter((dept) => dept.complaints >= 5)
    .reduce((worst, dept) => {
      const currentRate = parseInt(dept.resolvedPercentage);
      const worstRate = parseInt(worst.resolvedPercentage);
      return currentRate < worstRate ? dept : worst;
    }, data[0]);

  const top2ByVolume = [...data]
    .sort((a, b) => b.complaints - a.complaints)
    .slice(0, 2);

  const topDepartmentsPercent = (
    (top2ByVolume.reduce((sum, d) => sum + d.complaints, 0) / totalComplaints) *
    100
  ).toFixed(1);

  const resolutionGap = Math.abs(
    parseInt(bestPerforming.resolvedPercentage) -
      parseInt(worstPerforming.resolvedPercentage)
  );

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 mb-6">
      {/* Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Department Performance Analysis
          </h1>
          <p className="text-text_color">
            Complaint resolution metrics by department as of {currentDate}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green rounded-full"></div>
            <span className="text-gray-700">Excellent (≥75%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow rounded-full"></div>
            <span className="text-gray-700">Good (50–74%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red rounded-full"></div>
            <span className="text-gray-700">Needs Improvement (&lt;50%)</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-0 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text_color">
              Total Complaints
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-blue">
              {totalComplaints}
            </div>
            <p className="text-xs text-gray-800">
              Across {totalDepartments} departments
            </p>
          </CardContent>
        </Card>

        <Card className="p-0 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text_color">
              Overall Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-green-600">
              {overallResolutionRate}%
            </div>
            <p className="text-xs text-gray-800">Company-wide average</p>
          </CardContent>
        </Card>

        <Card className="p-0 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text_color">
              Highest Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-orange-600">
              {topDepartment.complaints}
            </div>
            <p className="text-xs text-gray-800">
              {topDepartment.department.replace(" Department", "")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-0 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text_color">
              Best Performer
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-purple-600">
              {bestPerforming.resolvedPercentage}
            </div>
            <p className="text-xs text-gray-800">
              {bestPerforming.department.replace(" Department", "")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Key Insights */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-primary">Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>Volume Distribution:</strong>
              {top2ByVolume
                .map((d) => d.department.replace(" Department", ""))
                .join(" & ")}{" "}
              departments handle {topDepartmentsPercent}% of all complaints.
            </div>
            <div>
              <strong>Resolution Efficiency:</strong>{" "}
              {bestPerforming.department.replace(" Department", "")} has the
              highest resolution rate at {bestPerforming.resolvedPercentage}.
            </div>
            <div>
              <strong>Performance Gap:</strong> There's a gap of {resolutionGap}
              % in resolution rate between{" "}
              {bestPerforming.department.replace(" Department", "")} and{" "}
              {worstPerforming.department.replace(" Department", "")}.
            </div>
            <div>
              <strong>Action Needed:</strong> Focus on{" "}
              {worstPerforming.department.replace(" Department", "")} to improve
              overall company efficiency.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentBreakDownHeader;
