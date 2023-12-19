'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

const GsapSplitText = ({ children, ...props }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      // Initialize SplitType
      const typeSplit = new SplitType(textRef.current, {
        types: 'lines,words,chars',
        tagName: 'span'
      });
      gsap.from(typeSplit.words, {
        y: '110%',
        opacity: 1,
        rotationZ: '10',
        duration: 0.3,
        ease: 'power1.out',
        stagger: 0.1,
        markers: true
      });

      // Cleanup function to revert split text to normal
      return () => {
        typeSplit.revert();
      };
    };

    // Ensure the effect runs only once after the window is fully loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return <div ref={textRef}>{children}</div>;
};

export default GsapSplitText;
