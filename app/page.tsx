import { Carousel } from 'components/carousel';
import GsapSplitText from 'components/GsapSplitText';
import Footer from 'components/layout/footer';
import Stats from 'components/Stats';

import { Suspense } from 'react';
import AboutSection from './AboutSection';
import { Banannas2 } from './Banannas';

export const runtime = 'nodejs';
export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <div className="relative ">
      {/* <ThreeItemGrid /> */}
      <div>
        <div className="pointer-events-none absolute left-0 top-0  z-10   grid h-screen   w-full transform grid-cols-4 content-start items-center border-2 border-white border-opacity-30  px-[31px] ">
          <div className="h-screen w-full border-l-2 border-white border-opacity-20  "></div>
          <div className="h-screen w-full border-l-2 border-white border-opacity-20  "></div>
          <div className="h-screen w-full border-l-2 border-white border-opacity-20  "></div>
          <div className="h-screen w-full border-l-2 border-r-2 border-white border-opacity-20  "></div>
        </div>
        <div className="relative   h-screen justify-center align-middle">
          <Banannas2 />

          <div className="title absolute bottom-8 left-8 flex w-full  transform items-center justify-center  md:w-2/3   ">
            <GsapSplitText>
              <h1 className="pointer-bigger mb-6 text-left text-[219px] font-normal leading-[85%] max-[2132px]:text-[189px] max-[1840px]:text-[149px] max-[1448px]:text-[129px] max-[1266px]:text-[109px]  max-[1130px]:text-center	max-[1092px]:scale-125  max-[1092px]:text-[89px] max-[882px]:text-[67px] max-[872px]:scale-100 max-[564px]:text-[57px] max-[384px]:text-[47px]">
                Unveil the Extraordinary in Digital Art
              </h1>
            </GsapSplitText>
          </div>
        </div>
        <Suspense>
          <div className="white flex  h-full w-full  flex-col items-center  justify-center bg-white py-32">
            <div className="flex flex-col items-center  gap-10 text-center  sm:w-2/3 md:w-1/3">
              <p className="text-lg uppercase text-black">( *** )</p>
              <p className="text-lg uppercase text-black ">
                An in-house initiative that bridges the gap between digital art aficionados and the
                metaverse. We collaborate with visionary artists to bring an exclusive array of
                NFTs, propelling your journey into the world of digital art..
              </p>
            </div>
            <GsapSplitText>
              <h3 className="mt-32 text-center text-9xl font-semibold uppercase text-black  max-[724px]:text-6xl">
                Banana World
              </h3>
            </GsapSplitText>
          </div>

          <AboutSection />
          <div className="mt-[-200px] flex h-full w-full justify-between bg-white max-[734px]:flex-wrap">
            <Stats
              firstSentence={'Contributors'}
              lastSentence={'In the past three weeks'}
              number={100}
            />
            <Stats firstSentence={'Top Award'} lastSentence={'NFT project globaly'} number={25} />
            <Stats firstSentence={'The Startup'} lastSentence={'2023 Award place'} number={13} />
          </div>
          <div className="white flex  h-full w-full  flex-col items-center  justify-center bg-white py-32">
            <div className="flex flex-col items-center  gap-10 text-center  sm:w-2/3 md:w-1/3">
              <p className="text-lg uppercase text-black">( *** )</p>
              <p className="text-lg uppercase text-black">
                A cornerstone of Banana NFT Marketplace, where we collaborate closely with
                pioneering artists and brands. These projects are a window into the metaverse,
                offering a glimpse of the extraordinary potential of digital art. Each featured
                creation is a step towards redefining artistic expression in the digital realm.
              </p>
            </div>
            <GsapSplitText>
              <h3 className="mt-32 text-center text-9xl font-semibold uppercase text-black max-[724px]:text-6xl">
                Featured Projects
              </h3>
            </GsapSplitText>
          </div>
          <Carousel />

          <Suspense>
            <Footer />
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
}
