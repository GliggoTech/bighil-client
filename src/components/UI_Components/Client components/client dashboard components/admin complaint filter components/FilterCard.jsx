import { Card, CardContent } from "@/components/ui/card";

const FilterCard = ({ icon, title, titleColor, children, className }) => (
  <Card
    className={`overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    <CardContent className="p-4">
      <div className={`flex items-center mb-3 ${titleColor}`}>
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      {children}
    </CardContent>
  </Card>
);

export default FilterCard;
