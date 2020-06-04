import { AboutContent } from "@upswyng/common";
import Container from "@material-ui/core/Container";
import MuiHtml from "./MuiHtml";
import React from "react";

const About = () => (
  <Container>
    <MuiHtml html={AboutContent} />
  </Container>
);

export default About;
