import { Calendar } from "lucide-react";

export const TimeDisplay = ({ time, date }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-surface-light to-background-secondary dark:from-surface-dark dark:to-background-dark rounded-xl shadow-lg  transition-all duration-300 hover:shadow-xl">
      <div className="text-3xl md:text-4xl font-mono font-semibold text-text_color dark:text-text-light tracking-tight">
        {time}
      </div>
      <div className="flex items-center mt-2 text-sm text-text-secondary dark:text-text-muted">
        <Calendar className="h-3.5 w-3.5 mr-1.5" />
        {date}
      </div>
    </div>
  );
};
