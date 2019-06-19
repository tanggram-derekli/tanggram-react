import {useState, useEffect} from 'react';

export default function useScrollDownTrigger(breakingPoint) {
  const [isTriggered, setIsTriggered] = useState(false);
  useEffect(() => {
    const detect = () => {
      if (window.scrollY >= breakingPoint) {
        setIsTriggered(true);
      } else {
        setIsTriggered(false);
      }
    };
    window.addEventListener('scroll', detect);
    return () => {
      window.removeEventListener('scroll', detect);
    };
  });
  return isTriggered;
}
