import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Building2,
  Timer,
  Target,
} from "lucide-react";

const PatternAndEscalation = ({ data }) => {
  // Sample data structure based on your backend response
  // const data = {
  //   companyInfo: {
  //     id: "67c056635055a4204da8b932",
  //     name: "Gliggo Inc",
  //     analysisDate: "2025-06-09T12:58:17.731Z",
  //   },
  //   overallMetrics: {
  //     totalComplaints: 57,
  //     resolvedComplaints: 17,
  //     pendingComplaints: 11,
  //     inProgressComplaints: 18,
  //     breachedComplaints: 32,
  //     resolutionRate: "29.82",
  //     avgResolutionTimeHours: "1.21",
  //     breachRate: "56.14",
  //   },
  //   priorityAnalysis: [
  //     {
  //       priority: "CRITICAL",
  //       totalCount: 57,
  //       resolvedCount: 17,
  //       breachedCount: 32,
  //       resolutionRate: "29.82",
  //       breachRate: "56.14",
  //       avgResolutionTimeHours: "1.21",
  //     },
  //   ],
  //   departmentAnalysis: [
  //     {
  //       department: "IT Department",
  //       totalCount: 28,
  //       resolvedCount: 7,
  //       resolutionRate: "25.00",
  //       avgResolutionTimeHours: "0.04",
  //     },
  //     {
  //       department: "HR Department",
  //       totalCount: 20,
  //       resolvedCount: 7,
  //       resolutionRate: "35.00",
  //       avgResolutionTimeHours: "0.10",
  //     },
  //     {
  //       department: "Finance Department",
  //       totalCount: 6,
  //       resolvedCount: 2,
  //       resolutionRate: "33.33",
  //       avgResolutionTimeHours: "9.76",
  //     },
  //     {
  //       department: "Operations",
  //       totalCount: 1,
  //       resolvedCount: 0,
  //       resolutionRate: "0.00",
  //       avgResolutionTimeHours: null,
  //     },
  //     {
  //       department: "Legal Department",
  //       totalCount: 1,
  //       resolvedCount: 0,
  //       resolutionRate: "0.00",
  //       avgResolutionTimeHours: null,
  //     },
  //     {
  //       department: "Marketing Department",
  //       totalCount: 1,
  //       resolvedCount: 1,
  //       resolutionRate: "100.00",
  //       avgResolutionTimeHours: "0.07",
  //     },
  //   ],
  //   escalationMetrics: {
  //     totalEscalations: 42,
  //     avgStatusChanges: "4.51",
  //     escalationRate: "73.68",
  //   },
  //   slaMetrics: {
  //     targetFirstResponseTime: 1.4,
  //     actualAvgFirstResponseTime: 1.4,
  //     breachThreshold: 1.4,
  //     currentBreaches: 32,
  //   },
  // };

  const getStatusColor = (rate) => {
    const numRate = parseFloat(rate);
    if (numRate >= 80) return "bg-green-500";
    if (numRate >= 60) return "bg-yellow-500";
    if (numRate >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getBadgeVariant = (rate) => {
    const numRate = parseFloat(rate);
    if (numRate >= 80) return "default";
    if (numRate >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {data.companyInfo.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Complaints Analysis Dashboard
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Analysis Date</p>
              <p className="font-medium">
                {new Date(data.companyInfo.analysisDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Complaints
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {data.overallMetrics.totalComplaints}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Active cases in system
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Resolved
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {data.overallMetrics.resolvedComplaints}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="secondary"
                  className="text-xs bg-green-100 text-green-800"
                >
                  {data.overallMetrics.resolutionRate}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">
                SLA Breaches
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">
                {data.overallMetrics.breachedComplaints}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="destructive" className="text-xs">
                  {data.overallMetrics.breachRate}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Avg Resolution
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {data.overallMetrics.avgResolutionTimeHours}h
              </div>
              <p className="text-xs text-purple-600 mt-1">
                Average time to resolve
              </p>
            </CardContent>
          </Card>
        </div>

        {/* SLA Performance Alert */}
        {parseFloat(data.overallMetrics.breachRate) > 50 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>High SLA Breach Rate:</strong>{" "}
              {data.overallMetrics.breachRate}% of complaints have breached SLA
              requirements. Immediate attention required to improve service
              levels.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Department Performance</span>
              </CardTitle>
              <CardDescription>
                Resolution rates and performance by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.departmentAnalysis.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {dept.department}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={getBadgeVariant(dept.resolutionRate)}
                              className="text-xs"
                            >
                              {dept.resolutionRate}%
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {dept.resolvedCount}/{dept.totalCount}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                          <span>Resolution Rate</span>
                          <span>
                            Avg Time:{" "}
                            {dept.avgResolutionTimeHours
                              ? `${dept.avgResolutionTimeHours}h`
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={parseFloat(dept.resolutionRate)}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Escalation Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Escalation Analysis</span>
              </CardTitle>
              <CardDescription>Escalation patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-900">
                      {data.escalationMetrics.totalEscalations}
                    </div>
                    <div className="text-sm text-orange-700">
                      Total Escalations
                    </div>
                  </div>
                  <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-2xl font-bold text-indigo-900">
                      {data.escalationMetrics.avgStatusChanges}
                    </div>
                    <div className="text-sm text-indigo-700">
                      Avg Status Changes
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Escalation Rate</span>
                    <Badge variant="destructive">
                      {data.escalationMetrics.escalationRate}%
                    </Badge>
                  </div>
                  <Progress
                    value={parseFloat(data.escalationMetrics.escalationRate)}
                    className="h-3"
                  />
                  <p className="text-xs text-gray-500">
                    {data.escalationMetrics.totalEscalations} out of{" "}
                    {data.overallMetrics.totalComplaints} complaints escalated
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SLA Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>SLA Performance</span>
            </CardTitle>
            <CardDescription>
              Service Level Agreement compliance and metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Timer className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-900">
                  {data.slaMetrics.targetFirstResponseTime}h
                </div>
                <div className="text-sm text-blue-700">Target Response</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-900">
                  {data.slaMetrics.actualAvgFirstResponseTime}h
                </div>
                <div className="text-sm text-green-700">
                  Actual Avg Response
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-yellow-900">
                  {data.slaMetrics.breachThreshold}h
                </div>
                <div className="text-sm text-yellow-700">Breach Threshold</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-red-900">
                  {data.slaMetrics.currentBreaches}
                </div>
                <div className="text-sm text-red-700">Current Breaches</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Complaint Status Overview</CardTitle>
            <CardDescription>
              Current distribution of complaint statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-900">
                  {data.overallMetrics.resolvedComplaints}
                </div>
                <div className="text-sm text-green-700">Resolved</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-900">
                  {data.overallMetrics.inProgressComplaints}
                </div>
                <div className="text-sm text-blue-700">In Progress</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-900">
                  {data.overallMetrics.pendingComplaints}
                </div>
                <div className="text-sm text-yellow-700">Pending</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-900">
                  {data.overallMetrics.breachedComplaints}
                </div>
                <div className="text-sm text-red-700">Breached</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatternAndEscalation;
