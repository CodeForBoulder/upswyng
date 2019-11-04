export const colors = {
  black: "#000",
  blue: "#2C4198",
  brown: "#AA6A03",
  charcoal: "#3a3a3a",
  gold: "#F4BD21",
  green: "#68A840",
  greyDark: "#3c3c3c",
  greyMedium: "#707070",
  greyLight: "#A2A2A2",
  lavendar: "#9F6CBA",
  orangeDark: "#CE5A30",
  orangePrimary: "#F05A28",
  orangeSecondary: "#DB5427",
  pink: "#B146BF",
  purple: "#5B4DC7",
  red: "#BC2222",
  rosewood: "#795161",
  teal: "#40ACBF",
  white: "#FFF",
};

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

// export const ScreenReaderOnly = css`
//   clip: rect(1px, 1px, 1px, 1px);
//   clip-path: inset(50%);
//   height: 1px;
//   margin: -1px;
//   overflow: hidden;
//   padding: 0;
//   position: absolute;
//   width: 1px;
// `;
