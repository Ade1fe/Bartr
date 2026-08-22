import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonRowsProps {
  count: number;
  variant?: 'avatar-text' | 'thumbnail-text' | 'text-only';
}

export function SkeletonRows({ count, variant = 'avatar-text' }: SkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          {variant !== 'text-only' && (
            <Skeleton className={variant === 'thumbnail-text' ? 'h-12 w-12 rounded-md shrink-0' : 'h-9 w-9 rounded-full shrink-0'} />
          )}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      ))}
    </>
  );
}