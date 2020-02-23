import { Container, colors, font } from "../App.styles";

import Link from "@material-ui/core/Link";
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
      <Link
        href="http://www.codeforboulder.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code for Boulder
      </Link>
      , part of{" "}
      <Link
        href="https://www.codeforamerica.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code for America&apos;s
      </Link>{" "}
      Brigade network.
    </p>
    <p>
      For questions related to UpSwyng, please contact{" "}
      <Link href="mailto:info@upswyng.org">info@upswyng.org</Link>.
    </p>
  </Container>
);

export default About;
