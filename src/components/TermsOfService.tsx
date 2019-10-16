import React from 'react';

import { Container, colors } from '../App.styles';
import PageBanner from './PageBanner';

const TermsOfService = () => (
  <Container>
    <PageBanner color={colors.orangeDark} text={'Terms of Service'} />
  </Container>
);

export default TermsOfService;
