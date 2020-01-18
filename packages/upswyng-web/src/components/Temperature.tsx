import { colors, font } from "../App.styles";
import React from "react";
import { Typography } from "@material-ui/core";

import styled from "styled-components";
import useTemperature from "./useTemperature";

const StyledContainer = styled.aside`
  color: ${colors.white};
  font-family: ${font.families.openSans};
`;

const StyledTemp = styled.div`
  align-items: flex-end;
  border-right: solid 2px ${colors.white};
  display: flex;
  flex-direction: column;
  margin-right: ${font.helpers.convertPixelsToRems(12)};
  padding: ${font.helpers.convertPixelsToRems(5)}
    ${font.helpers.convertPixelsToRems(10)};
`;

const StyledDegrees = styled.span`
  font-size: ${font.helpers.convertPixelsToRems(18)};
  line-height: 1;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const StyledLocation = styled.span`
  font-size: ${font.helpers.convertPixelsToRems(12)};
  margin: 0;
  padding: 0;
`;

const Temperature = () => {
  const temp: undefined | null | number = useTemperature();
  if (!temp) {
    return null;
  } else {
    return (
      <StyledContainer>
        <Typography variant="srOnly" component="h2">
          Current Temperature
        </Typography>
        <StyledTemp>
          <StyledDegrees>{temp}&deg;</StyledDegrees>
          <Typography variant="srOnly">in</Typography>
          <StyledLocation>Boulder, CO</StyledLocation>
        </StyledTemp>
      </StyledContainer>
    );
  }
};

export default Temperature;
