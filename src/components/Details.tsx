import React from 'react';
import styled, { css } from 'styled-components';
import { colors, font } from '../App.styles';

interface DetailsProps {
  children: React.ReactChild | React.ReactChild[];
}

export const StyledDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 1;
  margin-top: ${font.helpers.convertPixelsToRems(30)};
`;

export const DetailItemStyles = css`
  margin: 10px 0;
`;

export const DetailHeading = styled.h2`
  && {
    ${DetailItemStyles}
    color: ${colors.white};
    flex: 1 0 20%;
    font-size: inherit;
    line-height: inherit;
    &::after {
      content: ':';
    }
  }
`;

export const DetailBody = styled.div`
  && {
    flex: 1 1 80%;
    font-size: inherit;
    line-height: inherit;
    * {
      ${DetailItemStyles}
    }
  }
`;

const Details = ({ children }: DetailsProps) => (
  <StyledDetails>{children}</StyledDetails>
);

export default Details;
