import { Skeleton } from "@/components/ui/skeleton"

export default function CardCategoriesSkeleton() {
  return (
    <div className="space-y-3 pl-6 pb-6">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-2/3" />
    </div>
  )
}