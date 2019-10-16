import React from 'react';
import styled from 'styled-components';

import { Container, colors, font } from '../App.styles';
import Logo from './Logo';
import PageBanner from './PageBanner';

const StyledLogo = styled(Logo)`
  display: block;
  margin: ${font.helpers.convertPixelsToRems(30)} auto;
`;

const About = () => (
  <Container>
    <PageBanner color={colors.orangeDark} text={'About Upswyng'} />
    <p>
      Upswyng is a mobile app that can help people in need locate services where
      they can find Food, Shelter, Health, Resources and Work.
    </p>
    <StyledLogo />
    <p>
      Upswyng is maintained by{' '}
      <a
        href="http://www.codeforboulder.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code for Boulder
      </a>
      , part of{' '}
      <a
        href="https://www.codeforamerica.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code for America&apos;s
      </a>{' '}
      Brigade network.
    </p>
    <p>
      For questions related to Upswyng or if you want to deploy it in your
      community, please contact{' '}
      <a href="mailto:info@upswyng.org">info@upswyng.org</a>.
    </p>
  </Container>
);

export default About;
