'use client';

import { useEffect, useState } from 'react';

export const useIframe = () => {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsIframe(window.top !== window.self);
    }
  }, []);

  const onHandleLink = ({
    href,
    e,
    elseCallback,
  }: {
    href: string;
    e?: React.MouseEvent<HTMLAnchorElement>;
    elseCallback?: () => void;
  }) => {
    if (isIframe) {
      e?.preventDefault();
      window.parent.postMessage(
        {
          type: 'navigate',
          url: href,
        },
        '*',
      );
    } else {
      elseCallback?.();
    }
  };

  return {
    isIframe,
    onHandleLink,
  };
};
