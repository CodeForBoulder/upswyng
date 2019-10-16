import React from 'react';

import { Container, colors } from '../App.styles';
import PageBanner from './PageBanner';

const About = () => (
  <Container>
    <PageBanner color={colors.orangeDark} text={'About Upswyng'} />
  </Container>
);

export default About;
