import {useState, useEffect} from 'react';

export default function useWindowSize(reconcileWidth, reconcileHeight) {
  const [width, setWidth] = useState(reconcileWidth(window.innerWidth));
  const [height, setHeight] = useState(reconcileHeight(window.innerHeight));
  useEffect(
    () => {
      const handleResize = () => {
        setWidth(reconcileWidth(window.innerWidth));
        setHeight(reconcileHeight(window.innerHeight));
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    [reconcileWidth, reconcileHeight]
  );
  return [width, height];
}
