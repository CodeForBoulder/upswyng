import Container from "@material-ui/core/Container";
import MuiHtml from "./MuiHtml";
import { PrivacyPolicyContent } from "@upswyng/common";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <Container>
      <MuiHtml html={PrivacyPolicyContent} />
    </Container>
  );
};

export default PrivacyPolicy;
