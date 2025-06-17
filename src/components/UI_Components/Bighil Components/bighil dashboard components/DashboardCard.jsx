import { ArrowUp, ArrowDown, Plus } from "lucide-react";
import Link from "next/link"; // if using Next.js
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const getTrendStyles = (trend) => {
  switch (trend) {
    case "up":
      return {
        color: "text-green",
        bgColor: "bg-green/10",
        icon: <ArrowUp className="h-4 w-4" />,
        label: "Increase",
      };
    case "down":
      return {
        color: "text-red",
        bgColor: "bg-red/10",
        icon: <ArrowDown className="h-4 w-4" />,
        label: "Decrease",
      };
    case "new":
      return {
        color: "text-primary",
        bgColor: "bg-primary/10",
        icon: <Plus className="h-4 w-4" />,
        label: "New",
      };
    default:
      return {
        color: "text-gray",
        bgColor: "bg-gray/10",
        icon: null,
        label: "",
      };
  }
};

export default function DashboardCard({ cards }) {

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-0">
      {cards.map((card, index) => {
        const trendStyles = getTrendStyles(card.trend);

        const cardContent = (
          <Card
            key={index}
            className={`group border-2 border-transparent ${card.color} 
              ${card.hoverBorderColor} backdrop-blur-sm shadow-lg 
              hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 
              dark:bg-neutral-900/80 dark:hover:border-white/20 px-5 py-2`}
          >
            <CardHeader className="flex flex-row items-center justify-between p-0 space-y-0">
              <CardTitle className="font-normal dark:text-white">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.iconOuterBg}`}>
                <div
                  className={`p-3 rounded-full ${card.iconColor} ${card.iconBg} group-hover:scale-105 transition-transform`}
                >
                  {card.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 min-h-[75px]">
              <div className="text-2xl font-bold dark:text-white">
                {card.value}
              </div>
              {card.percentage > 0 && (
                <div
                  className={`flex items-center w-fit gap-1 mt-1 text-sm ${trendStyles.color} py-1 rounded-full`}
                >
                  {trendStyles.icon}
                  <span>{card.percentage}%</span>
                  <span className="ml-2 text-text_color">than last 7 Days</span>
                </div>
              )}
              {card.description ? (
                <p
                  className={`text-xs  ${card.descriptionColor} dark:text-white/80`}
                >
                  {card.description}
                </p>
              ) : (
                <div className="" /> // Keeps spacing uniform
              )}
            </CardContent>
          </Card>
        );

        return card.clickable ? (
          <Link href={card.href} key={index} className="block">
            {cardContent}
          </Link>
        ) : (
          <div key={index}>{cardContent}</div>
        );
      })}
    </div>
  );
}
