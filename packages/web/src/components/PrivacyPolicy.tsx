import Container from "@material-ui/core/Container";
import MuiHtml from "./MuiHtml";
import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation("privacyPolicy");

  return (
    <Container>
      <MuiHtml html={t("content")} />
    </Container>
  );
};

export default PrivacyPolicy;
