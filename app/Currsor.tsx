'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef(null);
  const iconRef = useRef(null);
  const followerRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const posX = useRef(0);
  const posY = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    gsap.set(cursor, {
      scale: 0.1,
      opacity: 1,
      xPercent: -50,
      yPercent: -50
    });

    gsap.set([cursor, follower], {
      xPercent: -50,
      yPercent: -50
    });

    const navLinks = document.querySelectorAll('.pointer-bigger');
    const searchBar = document.querySelectorAll('.search-bar');

    const tick = () => {
      posX.current += (mouseX.current - posX.current) / 9;
      posY.current += (mouseY.current - posY.current) / 9;

      gsap.set(follower, { x: posX.current - 20, y: posY.current - 20 });
      gsap.set(cursor, { x: mouseX.current, y: mouseY.current });

      requestAnimationFrame(tick);
    };

    tick();

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleMouseOver = (className) => {
      gsap.to(cursor, { scale: 1.5, ease: 'power1.inOut' });
      cursor.classList.add(className);
    };

    const handleMouseOut = (className) => {
      gsap.to(cursor, { scale: 0.1, ease: 'power1.inOut' });
      cursor.classList.remove(className);
    };

    navLinks.forEach((link) => {
      link.addEventListener('mouseover', () => handleMouseOver('heart'));
      link.addEventListener('mouseout', () => handleMouseOut('heart'));
    });

    // searchBar.forEach((link) => {
    //   link.addEventListener('mouseover', () => handleMouseOver('show-magnifying-glass'));
    //   link.addEventListener('mouseout', () => handleMouseOut('show-magnifying-glass'));
    // });

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[80] flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white opacity-0"
        ref={cursorRef}
      >
        <svg
          ref={iconRef}
          className="absolute z-[80] hidden h-8 w-8 text-black"
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56.5892 49.9416L42.2892 35.6416C48.2892 26.5416 47.0892 14.5416 39.2892 6.74165C34.6892 2.14165 28.2892 -0.358354 21.6892 0.0416455C15.0892 0.341646 9.18921 3.44165 4.98921 8.64165C-1.81079 17.1416 -1.61079 29.2416 5.28921 37.6416C12.7892 46.6416 25.9892 48.6416 35.6892 42.2416L49.9892 56.5416C50.8892 57.4416 52.0892 57.9416 53.2892 57.9416C54.4892 57.9416 55.6892 57.4416 56.5892 56.5416C57.4892 55.6416 57.9892 54.4416 57.9892 53.2416C57.9892 52.0416 57.4892 50.8416 56.5892 49.9416ZM34.0892 34.0416C30.9892 37.1416 26.9892 38.6416 22.9892 38.6416C18.9892 38.6416 14.9892 37.1416 11.8892 34.0416C8.88921 31.0416 7.28921 27.1416 7.28921 22.9416C7.28921 18.7416 8.88921 14.8416 11.8892 11.8416C17.9892 5.74165 27.9892 5.74165 34.0892 11.8416C37.0892 14.8416 38.6892 18.7416 38.6892 22.9416C38.6892 27.1416 37.0892 31.1416 34.0892 34.0416Z"
            fill="black"
          />
        </svg>
      </div>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[80] h-10 w-10 translate-x-1 translate-y-1 transform rounded-full bg-white/10"
        ref={followerRef}
      ></div>
    </div>
  );
};

export default CursorFollower;
