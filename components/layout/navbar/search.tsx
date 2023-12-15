'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
      className="w-max-[560px] lg:w-100 relative w-full rounded-full  bg-white xl:w-full "
      autoComplete="false"
    >
      <input
        autoComplete="false"
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Search for products..."
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-full bg-white px-5 py-4 text-sm text-black  placeholder:text-neutral-500 focus:outline-slate-600 focus-visible:ring-offset-slate-50 "
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-5  stroke-black" />
      </div>
    </form>
  );
}
