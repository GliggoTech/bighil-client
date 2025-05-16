import { Card, CardContent } from "@/components/ui/card";

const FilterCard = ({ icon, title, titleColor, children, className }) => (
  <Card
    className={`overflow-hidden rounded-xl  border-dialog_inside_border_color dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    <CardContent className="p-4 border-none">
      <div className={`flex items-center mb-3 ${titleColor}`}>
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="flex flex-col gap-3">
        {" "}
        {/* Added wrapper div with gap */}
        {children}
      </div>
    </CardContent>
  </Card>
);

export default FilterCard;
