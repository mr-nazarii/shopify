/* eslint-disable unicorn/filename-case */
'use client';

import AnimatedButton from 'components/Button';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useLayoutEffect, useRef } from 'react';
import SplitType from 'split-type';

const AboutSection = () => {
  const section = useRef(null);
  const text = useRef(null);

  useLayoutEffect(() => {
    let split;
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      split = new SplitType('.about-text p', { types: 'chars' });
      gsap.set(split.chars, { opacity: 0 });
      const translateY = window.innerWidth < 768 ? '-80vh' : '-57vh';

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.main-about-section',
          start: '300px center',
          end: '+=5000 center',
          scrub: true,
          pin: true
        }
      });
      timeline
        .to(
          `.about-img-section`,
          {
            duration: 50,
            scale: 2.2
          },
          0 // start time of this animation in the timeline
        )
        .to(
          '.triangle1',
          {
            display: 'none'
          },
          0
        )
        .to(
          '.triangle2',
          {
            display: 'none'
          },
          0
        )
        .to(
          `.imagezoom`,
          {
            duration: 50,
            width: '140vw',
            minWidth: '100vw',
            height: '100%'
          },
          0 // start time of this animation in the timeline
        )
        .to(
          '.shadowInner',
          {
            duration: 30,
            opacity: 1,
            background: '#000000bc'
          },
          0
        )
        .to(
          '.shadowBottom',
          {
            duration: 20,
            opacity: 1,
            background: 'linear-gradient(0deg, #000000c1 31%, rgba(255,255,255,0) 86%)'
          },
          10 // start time of this animation in the timeline
        )
        .to(
          `.about-text`,
          {
            y: translateY,
            duration: 30,
            opacity: 1
          },
          20 // start time of this animation in the timeline
        );

      // Add the split.chars animation to start in the middle of the timeline
      timeline.to(
        split.chars,
        {
          color: 'white',
          stagger: 1,
          ease: 'none',
          opacity: 1
        },
        35
      );

      timeline.to(
        split.chars,
        {
          opacity: 1
        },
        30
      ); // start at 15 seconds into the timeline
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();

      // Now split is accessible here
      if (split) {
        gsap.killTweensOf(split.chars);
      }
    };
  });

  return (
    <div
      ref={section}
      className="main-about-section relative flex h-[100%] w-full flex-col bg-white"
    >
      <div className="about-section flex h-full w-full flex-col items-center justify-center ">
        <div className="about-img-section static flex h-full w-full justify-center gap-9 max-[1860px]:scale-[0.8] max-[1558px]:scale-[0.65] max-[1216px]:mb-10 max-[1216px]:scale-[0.52] max-[942px]:scale-[0.4] max-[718px]:scale-[0.3] max-[544px]:scale-[0.2]">
          <div className="triangle relative h-[600px] min-h-[600px] w-[500px] min-w-[483px]   ">
            <Image
              alt="banannna"
              loading="lazy"
              className=" object-cover"
              fill={true}
              src={'/bananas/5.png'}
            />
          </div>
          <div className="triangle relative h-[600px] min-h-[600px] w-[500px] min-w-[483px]   ">
            <Image
              alt="banannna"
              loading="lazy"
              className="object-cover"
              fill={true}
              src={'/bananas/4.png'}
            />
          </div>
          <div className="triangle imagezoom relative z-40 h-[600px] min-h-[600px] w-[500px] min-w-[483px]   ">
            <div
              className="shadowBottom absolute left-0 top-0 z-30 h-full w-full"
              style={{
                background: 'linear-gradient(0deg, #2b2b2b0 31%, #0000000 86%)',
                opacity: '1'
              }}
            />
            <div
              className=" shadowInner absolute left-0 top-0 z-30 h-full w-full"
              style={{ background: '#2b2b2b0', opacity: '0' }}
            />
            <Image
              alt="banannna"
              loading="lazy"
              className="z-20 object-cover"
              fill={true}
              src={'/bananas/2.png'}
            />{' '}
          </div>
          <div className="triangle relative h-[600px] min-h-[600px] w-[500px] min-w-[483px]   ">
            <Image
              alt="banannna"
              loading="lazy"
              className="object-cover"
              fill={true}
              src={'/bananas/1.png'}
            />
          </div>
          <div className="triangle relative h-[600px] min-h-[600px] w-[500px] min-w-[483px]   ">
            <Image
              alt="banannna"
              loading="lazy"
              className="object-cover"
              fill={true}
              src={'/bananas/3.webp'}
            />
          </div>
        </div>{' '}
        <div className="about-text max-[1044px]:w-4/4  h-full w-2/4 max-[2300px]:w-3/4 max-[806px]:w-full max-[806px]:p-10">
          <p
            ref={text}
            className="mb-16 text-[60px] leading-[120%] max-[1718px]:text-[45px]  max-[946px]:text-[35px] max-[806px]:text-[30px] max-[412px]:text-[28px] "
            style={{ color: '#41414188' }}
          >
            Welcome to Banana NFT Marketplace, your hub for extraordinary digital art. Our curated
            collection of NFTs combines artistic brilliance with the security of blockchain
            technology. Whether youre a collector or an art enthusiast, our platform is designed for
            ease, security, and discovery.
          </p>
          <AnimatedButton url={'search'}>Learn More</AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AboutSection);
