import { SkeletonCard } from "@/components/UI_Components/Standard_Components/skeletons/SkeletonCard";

export default function StatsLoading() {
  return (
    <div className="flex gap-1">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
