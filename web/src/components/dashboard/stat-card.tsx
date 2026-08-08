import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
  delta?: string;
  loading?: boolean;
}

export function StatCard({ icon, label, value, delta, loading }: StatCardProps) {
  return (
    <Card className='rounded-lg shadow-xs border-neutral-100 p-4 md:p-5'>
      <CardContent className='p-0 space-y-2 md:space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-xs md:text-sm text-neutral-500'>{label}</span>
          <span className='text-neutral-400'>{icon}</span>
        </div>
        {loading ? (
          <Skeleton className='h-7 w-16' />
        ) : (
            <p className='text-xl md:text-2xl font-medium text-neutral-900 mb-4'>{value}</p>
        )}
        {loading ? (  
          <Skeleton className='h-3 w-24' />
        ) : (
          delta && <p className='text-xs text-neutral-500'>{delta}</p>
        )}
      </CardContent>
    </Card>
  )
}