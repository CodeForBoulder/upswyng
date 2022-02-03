import AlgoliaBadge from "./AlgoliaBadge";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import { Helmet } from "react-helmet";
import HomeButtons from "./HomeButtons";
import React from "react";
import SearchForm from "./SearchForm";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation(["footer", "home"]);
  return (
    <Container>
      <Helmet>
        <title>{t("title", { ns: "home" })}</title>
        <meta name="description" content={t("description", { ns: "home" })} />
      </Helmet>
      <Grid
        alignItems="stretch"
        container
        direction="column"
        justify="space-evenly"
        spacing={3}
      >
        <Grid item>
          <SearchForm />
        </Grid>
        <Grid item>
          <HomeButtons />
        </Grid>
        <Grid item>
          <Grid alignItems="center" container justify="center" spacing={4}>
            <Grid item>
              <a href="https://www.netlify.com">
                <img
                  src="https://www.netlify.com/img/global/badges/netlify-light.svg"
                  alt={t("deploysByNetlify")}
                />
              </a>
            </Grid>
            <Grid item>
              <a href="https://www.algolia.com/">
                <AlgoliaBadge />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
