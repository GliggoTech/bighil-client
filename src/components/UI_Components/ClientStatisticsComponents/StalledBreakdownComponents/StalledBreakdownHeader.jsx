import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Building2,
} from "lucide-react";

const StalledBreakdownHeader = ({ data }) => {
  if (!data) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-r from-red/5 to-orange/5 border border-none rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-red-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-red-100 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const { summary, companyName, period } = data;
  const isIncreasing = summary.changeFromPrevious > 0;

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-none rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold text-primary">{companyName}</h1>
          </div>
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-blue" />
            Stalled Analysis
          </Badge>
        </div>
        <p className="text-gray-600 text-lg">
          Complaints stalled for more than {period} with no progress updates
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Stalled */}
        <Card className="border-none bg-red/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Total Stalled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red mb-1">
              {summary.totalStalled}
            </div>
            <div className="flex items-center gap-1 text-sm">
              {isIncreasing ? (
                <TrendingUp className="h-3 w-3 text-red" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green" />
              )}
              <span className={isIncreasing ? "text-red" : "text-green"}>
                {Math.abs(summary.changeFromPrevious)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Active */}
        <Card className=" bg-blue/5 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue">
              Total Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue mb-1">
              {summary.totalActive}
            </div>
            <div className="text-sm text-blue">Currently open complaints</div>
          </CardContent>
        </Card>

        {/* Stalled Percentage */}
        <Card className="border-none bg-orange/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange">
              Stalled Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange mb-1">
              {summary.stalledPercentageOfTotal}%
            </div>
            <div className="text-sm text-orange">Of all active complaints</div>
          </CardContent>
        </Card>

        {/* Trend Indicator */}
        <Card
          className={`border-none ${
            isIncreasing
              ? "border-red/30 bg-red/5"
              : "border-green/30 bg-green/5"
          }`}
        >
          <CardHeader className="pb-2">
            <CardTitle
              className={`text-sm font-medium flex items-center gap-2 ${
                isIncreasing ? "text-red" : "text-green"
              }`}
            >
              {isIncreasing ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold mb-1 ${
                isIncreasing ? "text-red" : "text-green"
              }`}
            >
              {isIncreasing ? "Rising" : "Declining"}
            </div>
            <div
              className={`text-sm ${isIncreasing ? "text-red" : "text-green"}`}
            >
              {isIncreasing ? "Needs attention" : "Improving"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Section */}
      {summary.stalledPercentageOfTotal > 20 && (
        <Card className="border-none bg-red/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red" />
              <div>
                <h3 className="font-semibold text-red">
                  High Stalled Rate Alert
                </h3>
                <p className="text-red">
                  {summary.stalledPercentageOfTotal}% of complaints are stalled.
                  Consider reviewing processes and resource allocation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StalledBreakdownHeader;
