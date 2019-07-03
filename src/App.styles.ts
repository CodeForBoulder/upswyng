import styled, { css } from 'styled-components';

export const colors = {
  black: '#000',
  blue: '#2C4198',
  brown: '#AA6A03',
  charcoal: '#1D1D1D',
  gold: '#F4BD21',
  green: '#40ACBF',
  greyDark: '3c3c3c',
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

export default styled.div`
  background: ${colors.charcoal};
  color: ${colors.white};
`;
