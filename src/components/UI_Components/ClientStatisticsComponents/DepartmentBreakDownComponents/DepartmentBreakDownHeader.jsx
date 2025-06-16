import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellIcon } from "lucide-react";
import React from "react";

const DepartmentBreakDownHeader = ({ data = [] }) => {
  console.log("Department Breakdown Data:", data);

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

  // Helper function to get resolution rate color
  const getResolutionRateColor = (rate) => {
    if (rate >= 75) return "text-emerald-600";
    if (rate >= 50) return "text-amber-600";
    return "text-red-600";
  };

  // Helper function to get performance indicator
  const getPerformanceIndicator = (rate) => {
    if (rate >= 75) return { color: "bg-emerald-500", label: "Excellent" };
    if (rate >= 50) return { color: "bg-amber-500", label: "Good" };
    return { color: "bg-red-500", label: "Needs Improvement" };
  };

  return (
    <div className="space-y-6 mb-6">
      {/* Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Department Performance Analysis
          </h1>
          <p className="text-gray-600">
            Complaint resolution metrics by department as of {currentDate}
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-700">Excellent (≥75%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-gray-700">Good (50–74%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">Needs Improvement (&lt;50%)</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text_color">
              Total Complaints
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-blue">
              {totalComplaints.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">
              Across {totalDepartments} department
              {totalDepartments !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text_color">
              Overall Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div
              className={`text-2xl font-bold ${getResolutionRateColor(
                parseFloat(overallResolutionRate)
              )}`}
            >
              {overallResolutionRate}%
            </div>
            <p className="text-xs text-gray-500">Company-wide average</p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text_color">
              Highest Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-indigo">
              {topDepartment?.complaints.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-gray-500 truncate">
              {topDepartment
                ? getShortDepartmentName(topDepartment)
                : "No data"}
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text_color">
              Best Performer
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-purple">
              {bestPerforming?.resolvedPercentage.toFixed(1) || "0.0"}%
            </div>
            <p className="text-xs text-gray-500 truncate">
              {bestPerforming
                ? getShortDepartmentName(bestPerforming)
                : "No data"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-slate-50 border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-primary flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
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
                <div className="font-semibold text-text-text-text_color">
                  Volume Distribution
                </div>
                <div className="text-slate-600">
                  {top2ByVolume.length > 0 ? (
                    <>
                      {top2ByVolume
                        .map((d) => getShortDepartmentName(d))
                        .join(" & ")}
                      {top2ByVolume.length === 1
                        ? " department handles"
                        : " departments handle"}{" "}
                      {topDepartmentsPercent}% of all complaints.
                    </>
                  ) : (
                    "No volume data available."
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-text-text-text_color">
                  Resolution Efficiency
                </div>
                <div className="text-slate-600">
                  {bestPerforming ? (
                    <>
                      {getShortDepartmentName(bestPerforming)} leads with{" "}
                      {bestPerforming.resolvedPercentage.toFixed(1)}% resolution
                      rate.
                    </>
                  ) : (
                    "No performance data available."
                  )}
                </div>
              </div>

              {departmentsForComparison.length > 1 && (
                <>
                  <div className="space-y-2">
                    <div className="font-semibold text-text-text-text_color">
                      Performance Gap
                    </div>
                    <div className="text-slate-600">
                      {resolutionGap.toFixed(1)}% difference between best (
                      {getShortDepartmentName(bestPerforming)}) and lowest (
                      {getShortDepartmentName(worstPerforming)}) performers.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold text-text-text-text_color">
                      Action Needed
                    </div>
                    <div className="text-slate-600">
                      {worstPerforming &&
                      worstPerforming.resolvedPercentage < 75 ? (
                        <>
                          Focus on {getShortDepartmentName(worstPerforming)} to
                          improve overall efficiency.
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
                  <div className="font-semibold text-text-text-text_color">
                    Single Department Analysis
                  </div>
                  <div className="text-slate-600">
                    With only one department (
                    {getShortDepartmentName(departmentsForComparison[0])}),
                    focus on maintaining the current{" "}
                    {departmentsForComparison[0].resolvedPercentage.toFixed(1)}%
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
