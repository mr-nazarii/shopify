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
    <div className="relative">
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
          {/* <Carousel /> */}
          <div className="flex h-full w-full justify-between bg-white max-[734px]:flex-wrap">
            <Stats
              firstSentence={'Contributors'}
              lastSentence={'In the past three weeks'}
              number={100}
            />
            <Stats firstSentence={'Top Award'} lastSentence={'NFT project globaly'} number={25} />
            <Stats firstSentence={'The Startup'} lastSentence={'2023 Award place'} number={13} />
          </div>
          <AboutSection />
          <Suspense>
            <Footer />
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
}
