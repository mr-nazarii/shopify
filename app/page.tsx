import { Canvas } from '@react-three/fiber';
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import Search from 'components/layout/navbar/search';
import Head from 'next/head';
import { Suspense } from 'react';
import { Banannas2 } from './Banannas';
// import { TheOne } from './Load.tsx';
// import { TestScene } from './TestScene';

export const runtime = 'nodejs';
export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      {/* <ThreeItemGrid /> */}
      <div className="relative   h-screen justify-center align-middle">
        <Banannas2 />

        <div className=" absolute left-1/2 top-1/4 flex -translate-x-1/2  transform flex-col items-center justify-center gap-3 sm:w-2/3 md:flex md:w-1/3">
          <h1 className="mb-6 text-center text-[149px] font-bold leading-[85%]">
            Welcome to Bananna
          </h1>
          <Search />
        </div>
      </div>
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
