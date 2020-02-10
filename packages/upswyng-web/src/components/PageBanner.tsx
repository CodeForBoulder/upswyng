import { colors, font } from "../App.styles";

import BackButton from "./BackButton";
import BannerColorContext from "./BannerColorContext";
import React from "react";
import styled from "styled-components";

interface Props {
  color?: string;
  text: string;
  backRef?: Function;
}

const PageBannerContainer = styled.div`
  align-items: stretch;
  background: ${props => (props.color ? props.color : colors.greyMedium)};
  display: flex;
  flex-direction: row;
  margin: 0 0 ${font.helpers.convertPixelsToRems(12)};
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

const PageBanner = ({ color, text, backRef }: Props) => {
  const { currentBannerColor, updateCurrentBannerColor } = React.useContext(
    BannerColorContext
  );

  React.useEffect(() => {
    updateCurrentBannerColor(color);
  }, [color, updateCurrentBannerColor]);

  return (
    <PageBannerContainer color={currentBannerColor || colors.black}>
      <BackButton backRef={backRef} />
      <PageBannerHeading>{text}</PageBannerHeading>
    </PageBannerContainer>
  );
};

export default PageBanner;
