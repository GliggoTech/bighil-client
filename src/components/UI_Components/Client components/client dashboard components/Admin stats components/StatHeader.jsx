import { colorSchemes } from "@/lib/dashboard constants/colorSchemes";
import { cn } from "@/lib/utils";
// import { Icon } from "lucide-react";

export const StatHeader = ({ title, Icon, color }) => {
  const colorScheme = colorSchemes[color];

  return (
    <div className="flex items-center justify-between p-4 pb-0">
      <div className="flex items-center space-x-2">
        <div
          className={cn("p-2 rounded-lg bg-gradient-to-br", colorScheme.light)}
        >
          <Icon className={cn("h-4 w-4", colorScheme.accent)} />
        </div>
        <h3 className="text-sm text-text-secondary font-medium">{title}</h3>
      </div>
    </div>
  );
};
