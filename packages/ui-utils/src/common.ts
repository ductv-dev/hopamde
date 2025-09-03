export const extractContent = (html: string, maxLength?: number) => {
  const textContent =
    new DOMParser().parseFromString(html, 'text/html').documentElement
      .textContent || '';

  if (maxLength && textContent.length > maxLength) {
    return textContent.substring(0, maxLength).trim() + '...';
  }

  return textContent;
};
