import Container from "@material-ui/core/Container";
import MuiHtml from "./MuiHtml";
import React from "react";
import { useTranslation } from "react-i18next";

const TermsOfUse = () => {
  const { t } = useTranslation("about");

  return (
    <Container>
      <MuiHtml html={t("termsOfUse")} />
    </Container>
  );
};

export default TermsOfUse;
