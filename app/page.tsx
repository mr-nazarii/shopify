import { Carousel } from 'components/carousel';
import Footer from 'components/layout/footer';
import Search from 'components/layout/navbar/search';
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
    <div className="relative">
      {/* <ThreeItemGrid /> */}
      <div className="absolute left-0 top-0 z-40  grid   h-screen w-full   transform grid-cols-4 content-start items-center border-2 border-white border-opacity-30  px-[31px] ">
        <div className="h-screen w-full border-l-2 border-white border-opacity-20  "></div>
        <div className="h-screen w-full border-l-2 border-white border-opacity-20  "></div>
        <div className="h-screen w-full border-l-2 border-white border-opacity-20  "></div>
        <div className="h-screen w-full border-l-2 border-r-2 border-white border-opacity-20  "></div>
      </div>
      <div className="relative   h-screen justify-center align-middle">
        <Banannas2 />

        <div className="-translate-x-2/2 absolute bottom-8 left-8 flex w-full  transform flex-col items-center justify-center gap-3 sm:w-2/3 md:flex md:w-2/3">
          <h1 className="mb-6 text-left text-[219px] font-normal leading-[85%]">
            Unveil the Extraordinary in Digital Art
          </h1>
        </div>
      </div>
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </div>
  );
}
