import Container from "@material-ui/core/Container";
import MuiHtml from "./MuiHtml";
import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation("about");

  return (
    <Container>
      <MuiHtml html={t("privacyPolicy")} />
    </Container>
  );
};

export default PrivacyPolicy;
