'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lib/shopify/types';
import Search from './search';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 190) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 bg-white text-black transition-colors min-[1090px]:hidden"
      >
        <Bars3Icon className="h-4 scale-150" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white bg-opacity-20 pb-6 backdrop-blur-xl">
              <div className="p-4">
                <button
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 bg-white text-black transition-colors "
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full">
                  <Search />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <NavLink linkTitle={'Marketplace'} url={'search'} num={'01'} last={false} />
                  <NavLink linkTitle={'About'} url={'search'} num={'02'} last={false} />
                  <NavLink linkTitle={'Team'} url={'search'} num={'03'} last={false} />
                  <NavLink linkTitle={'Contact'} url={'Contact'} num={'04'} last={true} />
                  {/* <Link className="flex" href="/search">
            About
          </Link>
          <Link className="flex" href="/search">
            Team
          </Link>
          <Link className="flex" href="/pages/contact">
            Contact
          </Link> */}
                </div>
                {/* {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu) => (
                      <li
                        className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                        key={item.title}
                      >
                        <Link href={item.path} onClick={closeMobileMenu}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null} */}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

const NavLink = ({ linkTitle, url, last, num }: any) => {
  return (
    <>
      {last ? (
        <Link
          className="pointer-bigger relative flex w-full content-center justify-center   border-white border-opacity-20 py-7 text-2xl uppercase duration-300   ease-in-out hover:bg-white hover:bg-opacity-10 "
          href={`/${url}`}
        >
          <p className="absolute bottom-0 left-2 text-sm">{num}</p>
          {linkTitle}
        </Link>
      ) : (
        <Link
          className="pointer-bigger relative flex w-full content-center justify-center   border-white border-opacity-20 py-7 text-2xl uppercase duration-300 ease-in-out   hover:bg-white hover:bg-opacity-10 "
          href={`/${url}`}
        >
          <p className="absolute bottom-0 left-2 text-sm">{num}</p>
          {linkTitle}
        </Link>
      )}
    </>
  );
};
