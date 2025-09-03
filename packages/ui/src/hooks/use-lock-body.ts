'use client';

import { useEffect, useLayoutEffect } from 'react';

// Use useLayoutEffect to avoid flickering, fallback to useEffect on server
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useLockBody = () => {
  useIsomorphicLayoutEffect(() => {
    // Get original body overflow and padding
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalPaddingRight = originalStyle.paddingRight;

    // Prevent scrollbar shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      // Restore original styles on cleanup
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []); // Empty array ensures effect runs only on mount/unmount
};
