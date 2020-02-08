import { Icon, Typography } from "@material-ui/core";
import React, { useState } from "react";

import { ArrowBack } from "@material-ui/icons";
import { Redirect } from "react-router";
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
const resourceRegex: RegExp = /(resource\/)/;

const isOnResource = () => {
  return createBrowserHistory().location.pathname.match(resourceRegex);
};

const BackButton = () => {
  const [isGoingHome, setIsGoingHome] = useState(false);

  const handleClick = () => {
    if (isOnResource()) {
      customHistory.goBack();
    } else {
      setIsGoingHome(true);
    }
  };

  return isGoingHome ? (
    <Redirect to="/" />
  ) : (
    <CategoryBannerLink onClick={() => handleClick()}>
      <Typography variant="srOnly">go back to previous page</Typography>
      <CategoryBannerIcon>
        <CategoryBannerArrowBack />
      </CategoryBannerIcon>
    </CategoryBannerLink>
  );
};

export default BackButton;
