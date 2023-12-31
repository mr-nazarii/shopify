// ModelContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

// @ts-ignore
const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    let isMounted = true;
    // @ts-ignore
    useGLTF.load('/bananna.glb', (gltf) => {
      if (isMounted) setModel(gltf);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return <ModelContext.Provider value={model}>{children}</ModelContext.Provider>;
};

export const useModel = () => useContext(ModelContext);
