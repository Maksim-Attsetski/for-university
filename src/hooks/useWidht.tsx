import { useState } from 'react';

export const useWidth = (): { width: number } => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  return { width };
};
