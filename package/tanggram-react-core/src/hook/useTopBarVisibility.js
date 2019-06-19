import {useEffect, useState} from 'react';

export default function useTopBarVisibility(isVisibleInit = true, initThreshold = 20, threshold = 5) {
  const [isVisible, setIsVisible] = useState(isVisibleInit);
  // This use effect to make sure the event is ONLY triggered once when the component is mounted.
  useEffect(
    () => {
      let lastScrollTop = 0;
      const detect = function() {
        const currentPos = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"

        if (currentPos > initThreshold && (currentPos - threshold > lastScrollTop)) {
          // Scroll down.
          // console.log('down');
          setIsVisible(false);
        }

        if (currentPos <= initThreshold || (currentPos + threshold < lastScrollTop)) {
          // console.log('up');
          // Scroll up.
          setIsVisible(true);
        }
        lastScrollTop = currentPos <= 0 ? 0 : currentPos; // For Mobile or negative scrolling
      };
      window.addEventListener("scroll", detect, false);
      return () => {
        window.removeEventListener('scroll', detect);
      };
    },
    [
      initThreshold,
      threshold,
    ]
  );
  return isVisible;
}