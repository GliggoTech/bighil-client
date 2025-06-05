import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Route from "@/components/UI_Components/Client components/Route";
import { TrendingUp, Users } from "lucide-react";

export default function ClientStatisticsLayout({
  children,
  client_summary,
  monthly_trends,
}) {
  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-950 dark:via-emerald-950/20 dark:to-neutral-950">
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-6 gap-2 mb-6">
          <TabsTrigger
            value="summary"
            className="flex items-center gap-2 shadow-xl bg-gray/10"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Summary</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Trends</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card className="p-0 border-none">
            <CardContent className=" p-0 border-none">
              {client_summary}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="p-0 border-none">
            <CardContent className="p-1">{monthly_trends}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
