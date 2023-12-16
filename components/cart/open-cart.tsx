import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-colors  ">
      <ShoppingCartIcon
        className={clsx(' h-4 scale-150 transition-all ease-in-out  ', className)}
      />

      {quantity ? (
        <div className="absolute right-3 top-1 -mr-2 -mt-2 h-4 w-4 rounded-full bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
