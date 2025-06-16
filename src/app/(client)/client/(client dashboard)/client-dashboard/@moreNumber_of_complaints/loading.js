import { ChartsSkeletonLoader } from "@/components/UI_Components/Standard_Components/skeletons/ChartsSkeletonLoader";
import GreenLoadingSkeleton from "@/components/UI_Components/Standard_Components/skeletons/GreenLoadingSkeleton";
import ReusableSkeleton from "@/components/UI_Components/Standard_Components/skeletons/ReusableSkeleton";
import React from "react";

const loading = () => {
  return <GreenLoadingSkeleton />;
};

export default loading;
