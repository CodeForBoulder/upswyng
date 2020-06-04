import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import PageBanner from "./PageBanner";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import SearchForm from "./SearchForm";
import Typography from "@material-ui/core/Typography";
import { colors } from "@upswyng/common";

const NotFound = () => (
  <Container>
    <PageBanner color={colors.orangeDark}>
      <Typography variant="h1">Page not Found</Typography>
    </PageBanner>
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography component="p" variant="h3">
          Whoops! We&apos;re having trouble finding that page.
        </Typography>
      </Grid>
      <Grid item>
        <SearchForm />
      </Grid>
      <Grid item>
        <Typography>
          You can also go back{" "}
          <MuiLink component={RouterLink} to="/">
            home
          </MuiLink>{" "}
          to browse.
        </Typography>
      </Grid>
    </Grid>
  </Container>
);

export default NotFound;
