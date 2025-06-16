import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellIcon } from "lucide-react";
import React from "react";

const DepartmentBreakDownHeader = ({ data = [] }) => {
  // Helper function to safely parse numbers
  const safeParseInt = (value) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === "number") return Math.max(0, value);
    if (typeof value === "string") {
      const cleaned = value.replace(/[^\d.-]/g, "");
      const parsed = parseInt(cleaned, 10);
      return isNaN(parsed) ? 0 : Math.max(0, parsed);
    }
    return 0;
  };

  // Helper function to safely parse percentages
  const safeParsePercentage = (value) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === "number") return Math.max(0, Math.min(100, value));
    if (typeof value === "string") {
      const cleaned = value.replace(/[^\d.-]/g, "");
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : Math.max(0, Math.min(100, parsed));
    }
    return 0;
  };

  // Helper function to get department name
  const getDepartmentName = (dept) => {
    if (!dept || !dept.department) return "Unknown Department";
    return dept.department.toString().trim();
  };

  // Helper function to get short department name
  const getShortDepartmentName = (dept) => {
    const fullName = getDepartmentName(dept);
    return fullName.replace(/\s+Department$/i, "").trim() || fullName;
  };

  // Filter and process valid data
  const validData = Array.isArray(data)
    ? data.filter((dept) => dept && typeof dept === "object")
    : [];

  const processedData = validData.map((dept) => ({
    ...dept,
    complaints: safeParseInt(dept.complaints),
    resolvedPercentage: safeParsePercentage(dept.resolvedPercentage),
    department: getDepartmentName(dept),
  }));

  // Calculate metrics
  const totalComplaints = processedData.reduce(
    (sum, dept) => sum + dept.complaints,
    0
  );
  const totalDepartments = processedData.length;

  const overallResolved = processedData.reduce((sum, dept) => {
    return sum + (dept.complaints * dept.resolvedPercentage) / 100;
  }, 0);

  const overallResolutionRate =
    totalComplaints > 0
      ? ((overallResolved / totalComplaints) * 100).toFixed(1)
      : "0.0";

  const topDepartment =
    processedData.length > 0
      ? processedData.reduce(
          (max, dept) => (dept.complaints > max.complaints ? dept : max),
          processedData[0]
        )
      : null;

  // Filter departments with meaningful complaint volumes (≥5 complaints)
  const validDepartments = processedData.filter((dept) => dept.complaints >= 5);

  // For small datasets, use all departments if no department has ≥5 complaints
  const departmentsForComparison =
    validDepartments.length > 0 ? validDepartments : processedData;

  const bestPerforming =
    departmentsForComparison.length > 0
      ? departmentsForComparison.reduce(
          (best, dept) =>
            dept.resolvedPercentage > best.resolvedPercentage ? dept : best,
          departmentsForComparison[0]
        )
      : null;

  const worstPerforming =
    departmentsForComparison.length > 0
      ? departmentsForComparison.reduce(
          (worst, dept) =>
            dept.resolvedPercentage < worst.resolvedPercentage ? dept : worst,
          departmentsForComparison[0]
        )
      : null;

  const top2ByVolume = [...processedData]
    .sort((a, b) => b.complaints - a.complaints)
    .slice(0, 2);

  const topDepartmentsPercent =
    totalComplaints > 0
      ? (
          (top2ByVolume.reduce((sum, d) => sum + d.complaints, 0) /
            totalComplaints) *
          100
        ).toFixed(1)
      : "0.0";

  const resolutionGap =
    bestPerforming && worstPerforming && departmentsForComparison.length > 1
      ? Math.abs(
          bestPerforming.resolvedPercentage - worstPerforming.resolvedPercentage
        )
      : 0;

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Helper function to get resolution rate color (green theme)
  const getResolutionRateColor = (rate) => {
    if (rate >= 75) return "text-primary";
    if (rate >= 50) return "text-yellow";
    return "text-red";
  };

  // Helper function to get performance indicator
  const getPerformanceIndicator = (rate) => {
    if (rate >= 75) return { color: "bg-green-600", label: "Excellent" };
    if (rate >= 50) return { color: "bg-green-400", label: "Good" };
    return { color: "bg-green-200", label: "Needs Improvement" };
  };

  return (
    <div className="space-y-6 mb-6 border-none">
      {/* Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-primary p-6 rounded-lg ">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            Department Performance Analysis
          </h1>
          <p className="text-white">
            Complaint resolution metrics by department as of {currentDate}
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white/70 rounded-full"></div>
            <span className="text-white">Excellent (≥75%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow rounded-full"></div>
            <span className="text-white">Good (50–74%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red rounded-full"></div>
            <span className="text-white">Needs Improvement (&lt;50%)</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-none shadow-sm hover:shadow-lg hover:border-primary transition-all duration-200">
          <CardHeader className="pb-2  rounded-t-lg">
            <CardTitle className="text-sm font-medium text-gray-700">
              Total Complaints
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-700">
              {totalComplaints.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Across {totalDepartments} department
              {totalDepartments !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-lg hover:border-primary transition-all duration-200">
          <CardHeader className="pb-2  rounded-t-lg">
            <CardTitle className="text-sm font-medium text-gray-700">
              Overall Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div
              className={`text-2xl font-bold ${getResolutionRateColor(
                parseFloat(overallResolutionRate)
              )}`}
            >
              {overallResolutionRate}%
            </div>
            <p className="text-xs text-gray-500 mt-1">Company-wide average</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-lg hover:border-primary transition-all duration-200">
          <CardHeader className="pb-2  rounded-t-lg">
            <CardTitle className="text-sm font-medium text-gray-700">
              Highest Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">
              {topDepartment?.complaints.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-gray-500 truncate mt-1">
              {topDepartment
                ? getShortDepartmentName(topDepartment)
                : "No data"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-lg hover:border-primary transition-all duration-200">
          <CardHeader className="pb-2  rounded-t-lg">
            <CardTitle className="text-sm font-medium text-gray-700">
              Best Performer
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">
              {bestPerforming?.resolvedPercentage.toFixed(1) || "0.0"}%
            </div>
            <p className="text-xs text-gray-500 truncate mt-1">
              {bestPerforming
                ? getShortDepartmentName(bestPerforming)
                : "No data"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-white border-none shadow-sm">
        <CardHeader className="pb-3  rounded-t-lg">
          <CardTitle className="text-lg text-primary flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {processedData.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-sm">
                <BellIcon className="inline-block mr-2" />
                No department data available for analysis.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <div className="font-semibold text-gray-800">
                  Volume Distribution
                </div>
                <div className="text-gray-600">
                  {top2ByVolume.length > 0 ? (
                    <>
                      {top2ByVolume
                        .map((d) => getShortDepartmentName(d))
                        .join(" & ")}
                      {top2ByVolume.length === 1
                        ? " department handles"
                        : " departments handle"}{" "}
                      <span className="font-medium text-green-600">
                        {topDepartmentsPercent}%
                      </span>{" "}
                      of all complaints.
                    </>
                  ) : (
                    "No volume data available."
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-gray-800">
                  Resolution Efficiency
                </div>
                <div className="text-gray-600">
                  {bestPerforming ? (
                    <>
                      <span className="font-medium text-green-600">
                        {getShortDepartmentName(bestPerforming)}
                      </span>{" "}
                      leads with{" "}
                      <span className="font-medium text-green-600">
                        {bestPerforming.resolvedPercentage.toFixed(1)}%
                      </span>{" "}
                      resolution rate.
                    </>
                  ) : (
                    "No performance data available."
                  )}
                </div>
              </div>

              {departmentsForComparison.length > 1 && (
                <>
                  <div className="space-y-2">
                    <div className="font-semibold text-gray-800">
                      Performance Gap
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium text-primary">
                        {resolutionGap.toFixed(1)}%
                      </span>{" "}
                      difference between best (
                      {getShortDepartmentName(bestPerforming)}) and lowest (
                      {getShortDepartmentName(worstPerforming)}) performers.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold text-gray-800">
                      Action Needed
                    </div>
                    <div className="text-gray-600">
                      {worstPerforming &&
                      worstPerforming.resolvedPercentage < 75 ? (
                        <>
                          Focus on{" "}
                          <span className="font-medium text-primary">
                            {getShortDepartmentName(worstPerforming)}
                          </span>{" "}
                          to improve overall efficiency.
                        </>
                      ) : (
                        "All departments are performing well. Maintain current standards."
                      )}
                    </div>
                  </div>
                </>
              )}

              {departmentsForComparison.length === 1 && (
                <div className="space-y-2 md:col-span-2">
                  <div className="font-semibold text-gray-800">
                    Single Department Analysis
                  </div>
                  <div className="text-gray-600">
                    With only one department (
                    <span className="font-medium text-green-600">
                      {getShortDepartmentName(departmentsForComparison[0])}
                    </span>
                    ), focus on maintaining the current{" "}
                    <span className="font-medium text-green-600">
                      {departmentsForComparison[0].resolvedPercentage.toFixed(
                        1
                      )}
                      %
                    </span>
                    resolution rate.
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentBreakDownHeader;
