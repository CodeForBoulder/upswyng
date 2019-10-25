import React from 'react';
import styled from 'styled-components';

import { colors, font } from '../App.styles';
import BackButton from './BackButton';
import BannerColorContext from './BannerColorContext';

interface Props {
  color?: string;
  text: string;
}

const PageBannerContainer = styled.div`
  align-items: stretch;
  background: ${props => (props.color ? props.color : colors.greyMedium)};
  display: flex;
  flex-direction: row;
  padding: ${font.helpers.convertPixelsToRems(14)} 0;
  wrap: no-wrap;
`;

const PageBannerHeading = styled.h1`
  align-items: center;
  display: flex;
  font-size: ${font.helpers.convertPixelsToRems(24)};
  font-weight: 400;
  margin: ${font.helpers.convertPixelsToRems(-2)} 0 0;
`;

const PageBanner = ({ color, text }: Props) => {
  const { bannerColor, setBannerColor } = React.useContext(BannerColorContext);
  setBannerColor((s: string) => color || s);

  return (
    <PageBannerContainer color={bannerColor}>
      <BackButton />
      <PageBannerHeading>{text}</PageBannerHeading>
    </PageBannerContainer>
  );
};

export default PageBanner;
