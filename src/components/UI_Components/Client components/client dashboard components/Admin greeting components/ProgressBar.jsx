export const DayProgressBar = ({ currentTime }) => {
  const progress =
    ((currentTime.getHours() * 60 + currentTime.getMinutes()) / (24 * 60)) *
    100;

  return (
    <div className="space-y-2">
      <div className="relative h-1.5 w-full bg-background-tertiary dark:bg-surface-dark rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-text-primary">
        <span>12 AM</span>
        <span>12 PM</span>
        <span>11:59 PM</span>
      </div>
    </div>
  );
};
