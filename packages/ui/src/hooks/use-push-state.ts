'use client';

export const usePushState = () => {
  const goToUrl = (title: string, url: string) => {
    document.title = title;
    window.history.pushState({ pageTitle: title }, '', url);
  };

  return { goToUrl };
};
