import { Moon, Sun, Sunrise, Sunset } from "lucide-react";

export const TimeIcon = ({ hours }) => {
  if (hours >= 5 && hours < 8) return <Sunrise className="text-yellow" />;
  if (hours >= 8 && hours < 18) return <Sun className="text-red" />;
  if (hours >= 18 && hours < 21) return <Sunset className="text-black" />;
  return <Moon className="text-secondary-DEFAULT" />;
};
