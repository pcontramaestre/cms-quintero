import { Skeleton } from "@/components/ui/skeleton"

export default function CardTagsSkeleton() {
  return (
    <div className="space-y-3 flex flex-wrap gap-2 pl-6 pb-6">
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-5 w-1/4" />
    </div>
  )
}