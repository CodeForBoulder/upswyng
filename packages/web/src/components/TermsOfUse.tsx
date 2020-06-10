import Container from "@material-ui/core/Container";
import MuiHtml from "./MuiHtml";
import React from "react";
import { TermsOfUseContent } from "@upswyng/common";

const TermsOfUse = () => (
  <Container>
    <MuiHtml html={TermsOfUseContent} />
  </Container>
);

export default TermsOfUse;
