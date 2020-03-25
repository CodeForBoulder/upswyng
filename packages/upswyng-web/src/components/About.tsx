import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Logo from "./Logo";
import PageBanner from "./PageBanner";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { colors } from "../App.styles";

const About = () => (
  <Container>
    <PageBanner color={colors.orangeDark} text={"About UpSwyng"} />
    <Typography paragraph>
      UpSwyng is a mobile-ready, digital directory of resources to assist the
      unhoused and at-risk communities.
    </Typography>
    <Typography align="center" paragraph>
      <Logo />
    </Typography>
    <Typography paragraph>
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
    </Typography>
    <Typography paragraph>
      For questions related to UpSwyng, please contact{" "}
      <Link href="mailto:info@upswyng.org">info@upswyng.org</Link>.
    </Typography>
  </Container>
);

export default About;
