import StalledBreakdownHeader from "@/components/UI_Components/ClientStatisticsComponents/StalledBreakdownComponents/StalledBreakdownHeader";
import StalledFunnelChart from "@/components/UI_Components/ClientStatisticsComponents/StalledBreakdownComponents/StalledFunnelChart";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default async function StalledBreakdownDefault({ params }) {
  const { id } = await params;
  if (!id) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>Invalid company ID provided</AlertDescription>
        </Alert>
      </div>
    );
  }
  try {
    const res = await fetchServerSideData(
      `/api/statisctics/stalled-breakdown/${id}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    return (
      <div className=" space-y-6">
        <StalledBreakdownHeader data={res} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StalledFunnelChart data={res.breakdown} summary={res.summary} />
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Detailed Breakdown</CardTitle>
              <CardDescription>
                Analysis of {res.period} stalled complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(res.breakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-3 bg-gray/5 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {value.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{value.count}</div>
                      <div className="text-sm text-gray-500">
                        {value.percentage}%
                      </div>
                      <div
                        className={`text-xs ${
                          value.change >= 0 ? "text-red" : "text-green"
                        }`}
                      >
                        {value.change >= 0 ? "+" : ""}
                        {value.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading stalled breakdown data
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}
