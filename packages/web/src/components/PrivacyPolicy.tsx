import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";
import MuiHtml from "./MuiHtml";
import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation("privacyPolicy");

  return (
    <Container>
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <MuiHtml html={t("content")} />
    </Container>
  );
};

export default PrivacyPolicy;
