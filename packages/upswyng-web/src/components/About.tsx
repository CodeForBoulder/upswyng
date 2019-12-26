import { Container, colors, font } from "../App.styles";

import Logo from "./Logo";
import PageBanner from "./PageBanner";
import React from "react";
import styled from "styled-components";

const StyledLogo = styled(Logo)`
  display: block;
  margin: ${font.helpers.convertPixelsToRems(30)} auto;
`;

const About = () => (
  <Container>
    <PageBanner color={colors.orangeDark} text={"About UpSwyng"} />
    <p>
      UpSwyng is a mobile-ready, digital directory of resources to assist the
      unhoused and at-risk communities.
    </p>
    <StyledLogo />
    <p>
      UpSwyng is maintained by{" "}
      <a
        href="http://www.codeforboulder.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code for Boulder
      </a>
      , part of{" "}
      <a
        href="https://www.codeforamerica.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code for America&apos;s
      </a>{" "}
      Brigade network.
    </p>
    <p>
      For questions related to UpSwyng, please contact{" "}
      <a href="mailto:info@upswyng.org">info@upswyng.org</a>.
    </p>
  </Container>
);

export default About;
