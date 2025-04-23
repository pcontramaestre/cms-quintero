import { Skeleton } from "@/components/ui/skeleton"

export default function CardArticleSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-[237px] w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[90%]" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-[60px] w-full" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-5 w-[20%]" />
          <Skeleton className="h-5 w-[20%]" />
        </div>
      </div>
    </div>
  )
}
