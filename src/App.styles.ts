import styled, { createGlobalStyle, css } from 'styled-components';
import { Grid } from '@material-ui/core';

export const colors = {
  black: '#000',
  blue: '#2C4198',
  brown: '#AA6A03',
  charcoal: '#3a3a3a',
  gold: '#F4BD21',
  green: '#68A840',
  greyDark: '#3c3c3c',
  greyLight: '#707070',
  lavendar: '#9F6CBA',
  orangeDark: '#CE5A30',
  orangePrimary: '#F05A28',
  orangeSecondary: '#DB5427',
  pink: '#B146BF',
  purple: '#5B4DC7',
  red: '#BC2222',
  rosewood: '#795161',
  teal: '#40ACBF',
  white: '#FFF'
};

const baseFontSize = 16;
const baseFontSizePercent = (16 / baseFontSize) * 100;
export const font = {
  sizes: {
    base: baseFontSize,
    basePixels: `${baseFontSize}px`,
    basePercent: `${baseFontSizePercent}%`
  },
  families: {
    openSans: "'Open Sans', sans-serif"
  },
  helpers: {
    convertPixelsToRems: (value: number): string => `${baseFontSize / value}rem`
  }
};

export const ScreenReaderOnly = css`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const aStyles = css`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: ${colors.white};
  }
`;

export const Container = styled(Grid)`
  margin: 0 auto;
  max-width: 480px;
` as typeof Grid;

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background: ${colors.charcoal};
    color: ${colors.white};
    font-family: ${font.families.openSans};
    font-size: ${font.sizes.basePercent};
  }
  a {
    ${aStyles}
  }
`;
