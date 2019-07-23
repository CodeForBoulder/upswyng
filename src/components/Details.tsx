import React from 'react';
import styled from 'styled-components';
import { TDetail } from '../types';
import { colors } from '../App.styles';

interface DetailHeadingProps {
  text: string;
}

interface DetailsProps {
  groups: TDetail[];
}

const DetailHeading = ({ text }: DetailHeadingProps) => <h2>{text}</h2>;

const StyledDetailHeading = styled(DetailHeading)`
  color: ${colors.white};
  font-size: 10px;
` as typeof DetailHeading;

const Details = ({ groups }: DetailsProps) => (
  <>
    {groups.map(detail => {
      const { headingText, children } = detail;
      return (
        <>
          <StyledDetailHeading text={headingText} />
          {children}
        </>
      );
    })}
  </>
);

export default Details;
