import { Tooltip, Typography } from "@material-ui/core";
import { colors, font } from "../App.styles";

import { ErrorOutline as ErrorOutlineIcon } from "@material-ui/icons";
import React from "react";
import { Skeleton } from "@material-ui/lab";
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

const StyledTooltip = styled(props => (
  <Tooltip
    classes={{ popper: props.className, tooltip: "tooltip" }}
    {...props}
  />
))`
  & .tooltip {
    background: ${colors.black};
    colors: ${colors.white};
    font-family: ${font.families.openSans};
  }
` as typeof Tooltip;

const Temperature = () => {
  const temp: undefined | null | number = useTemperature();
  return (
    <StyledContainer>
      <Typography variant="srOnly" component="h2">
        Current Temperature
      </Typography>
      <StyledTemp>
        {/* {temp === undefined && (
          <Skeleton variant="rect" height={19} width={40} />
        )}
        {temp === null && (
          <StyledTooltip
            placement="left"
            title="temperature currently unavailable"
          >
            <ErrorOutlineIcon fontSize="small" tabIndex={0} />
          </StyledTooltip>
        )} */}
        {temp && <StyledDegrees>{temp}&deg;</StyledDegrees>}
        <Typography variant="srOnly">in</Typography>
        <StyledLocation>Boulder, CO</StyledLocation>
      </StyledTemp>
    </StyledContainer>
  );
};

export default Temperature;
