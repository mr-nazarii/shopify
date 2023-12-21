import clsx from 'clsx';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div className={clsx('  flex h-auto  w-full  items-center justify-center bg-slate-800 ')}>
      <div className="text-md relative flex h-full w-full flex-col items-start  gap-5 border  bg-white/70 p-6 px-4 font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 text-base leading-none tracking-tight">
          {title}
        </h3>
        <div className="flex flex-col gap-2">
          <p className="mr-4 line-clamp-2 flex-grow pl-2 text-sm leading-none tracking-tight">
            {currencyCode} {amount}
          </p>

          <p className="mr-4 line-clamp-2 flex-grow pl-2 text-sm leading-none  tracking-tight text-slate-500">
            Last sale: {currencyCode} {amount}{' '}
          </p>
        </div>
        <p className="absolute bottom-[-43px] left-0 w-full items-center justify-items-center bg-blue-600 p-2 text-center text-white transition-all ease-in-out group-hover:bottom-[0px]">
          Buy Now
        </p>
      </div>
    </div>
  );
};

export default Label;
