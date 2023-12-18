import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const AnimatedButton = ({ url, children }) => {
  const [points, setPoints] = useState([]);
  const buttonRef = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const pointz = 30;
    const width = 100;
    const spacing = width / pointz;
    let initialPoints = [];

    for (let i = 0; i < pointz; i++) {
      initialPoints.push({ x: i * spacing, y: 25 });
    }

    setPoints(initialPoints);

    const animate = () => {
      if (isAnimating.current) return;

      isAnimating.current = true;
      const animatedPoints = initialPoints.map((p, index) => ({ ...p }));

      animatedPoints.forEach((point, index) => {
        const mapper = gsap.utils.mapRange(0, pointz, 0, 0.4);

        gsap.to(point, {
          y: point.y + 6,
          repeat: 1,
          yoyo: true,
          ease: 'sine.inOut',
          duration: 0.2,
          delay: mapper(index),
          onUpdate: () => {
            animatedPoints[index] = point;
            setPoints(animatedPoints.map((p) => ({ ...p })));
          },
          onComplete: () => {
            if (index === pointz - 1) {
              isAnimating.current = false;
            }
          }
        });
      });
    };

    const button = buttonRef.current;
    button?.addEventListener('mouseenter', animate);

    return () => {
      button?.removeEventListener('mouseenter', animate);
    };
  }, []);

  const pathData = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <Link
      href={`/${url}`}
      ref={buttonRef}
      className="button relative w-[200px] overflow-visible rounded-full border-none bg-transparent p-4 text-black outline-none"
    >
      <span className="relative z-20 text-lg font-bold">{children}</span>
      <svg
        className="absolute left-[15%] right-0 top-1/2 z-10 w-[75%] -translate-y-1/2 overflow-visible"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
      >
        <polyline
          stroke="#ffffff"
          fill="none"
          strokeWidth="45"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={pathData}
        />
      </svg>
    </Link>
  );
};

export default AnimatedButton;
