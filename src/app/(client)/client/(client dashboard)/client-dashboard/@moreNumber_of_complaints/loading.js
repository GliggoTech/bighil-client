import { ChartsSkeletonLoader } from "@/components/UI_Components/Standard_Components/skeletons/ChartsSkeletonLoader";
import ReusableSkeleton from "@/components/UI_Components/Standard_Components/skeletons/ReusableSkeleton";
import React from "react";

const loading = () => {
  return <ReusableSkeleton variant="grid" rows={3} />;
};

export default loading;
