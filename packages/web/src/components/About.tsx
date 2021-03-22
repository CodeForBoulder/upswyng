import Container from "@material-ui/core/Container";
import MuiHtml from "./MuiHtml";
import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { i18n, t } = useTranslation("about");

  const changeLng = (lng: string) => i18n.changeLanguage(lng);

  return (
    <Container>
      <MuiHtml html={t("content")} />
      <button onClick={() => changeLng("en")}>Switch en language</button>
      <button onClick={() => changeLng("es")}>Switch es language</button>
    </Container>
  );
};

export default About;
