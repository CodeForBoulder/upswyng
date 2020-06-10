const baseFontSize = 16;
const baseFontSizePercent = (16 / baseFontSize) * 100;
export const font = {
  sizes: {
    base: baseFontSize,
    basePixels: `${baseFontSize}px`,
    basePercent: `${baseFontSizePercent}%`,
  },
  families: {
    openSans: "'Open Sans', sans-serif",
  },
  helpers: {
    convertPixelsToRems: (value: number): string =>
      `${value / baseFontSize}rem`,
  },
};
