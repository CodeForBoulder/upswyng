import { Trans, useTranslation } from "react-i18next";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import PageBanner from "./PageBanner";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import SearchForm from "./SearchForm";
import Typography from "@material-ui/core/Typography";
import { colors } from "@upswyng/common";

const NotFound = () => {
  const { t } = useTranslation(["notFound"]);
  return (
    <Container>
      <PageBanner color={colors.orangeDark}>
        <Typography variant="h1">{t("pageTitle")}</Typography>
      </PageBanner>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography component="p" variant="h3">
            {t("message")}
          </Typography>
        </Grid>
        <Grid item>
          <SearchForm />
        </Grid>
        <Grid item>
          <Typography>
            <Trans
              ns="notFound"
              i18nKey="goHome"
              components={{
                MuiLink: <MuiLink component={RouterLink} to="/" />,
              }}
            />
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
