'use client';
import React from 'react';

export const Liquid = () => {
  return (
    <div id="svg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="211"
        height="211"
        viewBox="0 0 211 211"
      >
        <defs>
          <clipPath id="clip-path">
            <circle
              id="mask"
              cx="105.5"
              cy="105.5"
              r="105.5"
              transform="translate(312 -1822)"
              fill="#fff"
              stroke="#707070"
              stroke-width="1"
            />
          </clipPath>
        </defs>
        <g id="circle" transform="translate(-312 1822)">
          <g id="bg" transform="translate(312 -1822)" fill="#fff" stroke="#707070" stroke-width="1">
            <circle cx="105.5" cy="105.5" r="105.5" stroke="none" />
            <circle cx="105.5" cy="105.5" r="105" fill="none" />
          </g>
          <g id="water" clip-path="url(#clip-path)">
            <path
              id="waveShape"
              d="M500,118.244v223.11H4V106.464c43.35,1.17,46.02,11.89,94.4,11.89,51.2,0,51.2-12,102.39-12s51.2,12,102.4,12,51.2-12,102.41-12C453.98,106.354,456.65,117.074,500,118.244Z"
              transform="translate(308 -1830.354)"
              fill="#04acff"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
