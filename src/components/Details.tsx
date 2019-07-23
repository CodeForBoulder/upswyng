import React from 'react';
import styled from 'styled-components';
import { colors } from '../App.styles';

interface DetailsProps {
  children: React.ReactNode[];
}

export const DetailContainer = styled.div`
  display: flex;
`;

export const DetailHeading = styled.h2`
  color: ${colors.white};
  font-size: 10px;
`;

export const DetailBody = styled.div`
  flex: 1 1 auto;
`;

const Details = ({ children }: DetailsProps) => <>{children}</>;

export default Details;
