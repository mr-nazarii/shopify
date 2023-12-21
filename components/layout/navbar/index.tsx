import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className=" fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-opacity-5  p-4 px-8 ">
      <div
        className="absolute left-0 top-[-5px] z-30 h-32 w-full blur-sm"
        style={{
          background: 'linear-gradient(180deg, #00000067 0%, rgba(255,255,255,0) 100%)'
        }}
      />

      <div className="z-40 block flex-none min-[1090px]:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="z-40 grid w-full grid-cols-4 content-start items-center border-2 border-white border-opacity-30 bg-white bg-opacity-0 backdrop-blur-md  max-[1432px]:grid-cols-[auto_1fr_1fr_1fr] max-[1090px]:hidden">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="relative mr-2 flex w-full items-center justify-center max-[1432px]:m-0 max-[1432px]:w-0 md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-lg  font-medium uppercase md:hidden lg:block">
              {/* {SITE_NAME} Banana NFT */}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="col-span-2  grid h-full w-full grid-cols-4 content-end justify-start ">
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
        <div className="flex justify-end gap-3 px-3">
          <Search />
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ linkTitle, url, last, num }: any) => {
  return (
    <>
      {last ? (
        <Link
          className="pointer-bigger relative flex content-center justify-center border-l-2 border-r-2 border-white border-opacity-20 py-7 text-xl uppercase duration-300   ease-in-out hover:bg-white hover:bg-opacity-10 max-[1432px]:text-[1rem]"
          href={`/${url}`}
        >
          <p className="absolute bottom-0 left-2 text-sm">{num}</p>
          {linkTitle}
        </Link>
      ) : (
        <Link
          className="pointer-bigger relative flex content-center justify-center border-l-2 border-white border-opacity-20 py-7 text-xl uppercase duration-300 ease-in-out   hover:bg-white hover:bg-opacity-10 max-[1432px]:px-4 max-[1432px]:text-[1rem]"
          href={`/${url}`}
        >
          <p className="absolute bottom-0 left-2 text-sm">{num}</p>
          {linkTitle}
        </Link>
      )}
    </>
  );
};
