import { SparklineChart } from "./SparklineChart";

export const StatValue = ({ count, sparklineProps }) => {
  return (
    <div className="mt-1 flex justify-between items-end">
      <div className="text-3xl font-bold tracking-tight">{count}</div>
      <SparklineChart {...sparklineProps} />
    </div>
  );
};
