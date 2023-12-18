'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';

const Stats = ({ number, firstSentence, lastSentence }) => {
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const triggerConfetti = () => {
    if (countRef.current) {
      const rect = countRef.current.getBoundingClientRect();
      const confettiOrigin = {
        x: (rect.left + rect.right) / 2 / window.innerWidth,
        y: (rect.top + rect.bottom) / 2 / window.innerHeight
      };

      confetti({
        zIndex: 999,
        particleCount: 10,
        spread: 70,
        origin: confettiOrigin // Use the calculated origin here
      });
    }
  };

  const updateColor = (currentValue) => {
    if (currentValue >= number) {
      countRef.current.style.color = 'orange';
      triggerConfetti();
    } else {
      countRef.current.style.color = 'black'; // Default color
    }
  };

  const animate = useCallback(() => {
    gsap.to(countRef.current, {
      innerHTML: number,
      duration: 3,
      ease: 'power3.inOut',
      snap: { innerHTML: 1 },
      stagger: {
        each: 0.05,
        onUpdate: function () {
          const currentValue = Math.ceil(this.targets()[0].innerHTML);
          this.targets()[0].innerHTML = currentValue;
          updateColor(currentValue);
        }
      }
    });
  }, [number]);

  useEffect(() => {
    if (hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [animate, hasAnimated]);

  return (
    <div className="relative mb-20 flex w-full min-w-[210px] items-center justify-between gap-5 border-2 border-r-0 border-black border-opacity-10 p-10 text-[10rem] text-black transition-colors duration-300 max-[1316px]:p-5 max-[1130px]:flex-col max-[1130px]:gap-0 max-[734px]:mb-0 max-[734px]:w-full">
      <p
        className="text-[10rem] font-semibold max-[1840px]:text-[8rem] max-[1574px]:text-[6rem] max-[1398px]:text-[4.7rem] max-[1130px]:mb-0 max-[1130px]:text-[5.7rem]"
        ref={countRef}
      >
        0
      </p>
      <div>
        <p className="text-[3rem] max-[2132px]:text-[2.5rem] max-[1698px]:text-[2.1rem] max-[1316px]:text-[1.7rem] ">
          {firstSentence}
        </p>
        <p className="text-[1.8rem] text-[#f8a444]  max-[2132px]:text-[1.3rem] max-[1698px]:text-[1rem]">
          {lastSentence}
        </p>
      </div>
    </div>
  );
};

export default Stats;
