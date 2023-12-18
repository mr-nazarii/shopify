'use client';

import React from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

const Layer = ({ children }) => {
  return <LocomotiveScrollProvider options={{ smooth: true }}>{children}</LocomotiveScrollProvider>;
};

export default Layer;
