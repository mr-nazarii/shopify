'use client';

import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-max-[560px] lg:w-100  relative w-full rounded-full  bg-white bg-opacity-10 xl:w-full "
      autoComplete="false"
    >
      <div className="relative">
        <input
          autoComplete="false"
          key={searchParams?.get('q')}
          type="text"
          name="search"
          placeholder="SEARCH FOR YOUR NFT"
          defaultValue={searchParams?.get('q') || ''}
          className="w-full rounded-full bg-white bg-opacity-20 px-5 py-4 text-sm text-black   placeholder:text-white focus:outline-slate-600 focus-visible:ring-offset-slate-50 "
        />
        <div className="search-bar -translate-x-2/2 absolute right-0 top-1/2 mr-2 flex h-11 w-11 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-white text-black transition-colors ">
          <MagnifyingGlassIcon className={clsx('h-4 scale-150  transition-all ease-in-out  ')} />
        </div>
      </div>
      {/* <div className="absolute right-0 top-0 mr-3 flex h-full w-14  items-center  justify-center rounded-full bg-white text-black transition-colors  ">
        <MagnifyingGlassIcon className="h-5  stroke-black" />
      </div> */}
    </form>
  );
}
