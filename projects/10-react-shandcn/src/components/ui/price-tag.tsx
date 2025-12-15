import { cn } from '../../lib/utils';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceTag({
  price,
  originalPrice,
  currency = '$',
  size = 'md',
  className,
}: PriceTagProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const discount = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={cn('font-bold text-primary', sizes[size])}>
        {currency}{price.toFixed(2)}
      </span>
      {originalPrice && originalPrice > price && (
        <>
          <span className="text-muted-foreground line-through text-sm">
            {currency}{originalPrice.toFixed(2)}
          </span>
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}
