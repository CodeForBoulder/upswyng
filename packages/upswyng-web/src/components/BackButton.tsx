import { Icon, Typography } from "@material-ui/core";

import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { createBrowserHistory } from "history";
import { font } from "../App.styles";
import styled from "styled-components";

const CategoryBannerLink = styled.a`
  align-items: center;
  display: flex;
  padding-right: ${font.helpers.convertPixelsToRems(12)};
`;

const CategoryBannerIcon = styled(Icon)`
  && {
    align-items: center;
    display: flex;
    font-size: ${font.helpers.convertPixelsToRems(36)};
    height: auto;
    width: auto;
  }
` as typeof Icon;

const CategoryBannerArrowBack = styled(ArrowBack)`
  && {
    font-size: inherit;
  }
` as typeof ArrowBack;

const customHistory = createBrowserHistory();

const BackButton = () => (
  <CategoryBannerLink onClick={() => customHistory.goBack()}>
    <Typography variant="srOnly">go back to pervious page</Typography>
    <CategoryBannerIcon>
      <CategoryBannerArrowBack />
    </CategoryBannerIcon>
  </CategoryBannerLink>
);

export default BackButton;
