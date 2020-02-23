import AlgoliaBadge from "./AlgoliaBadge";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import HomeButtons from "./HomeButtons";
import React from "react";
import SearchForm from "./SearchForm";

const Home = () => (
  <Container>
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
        <Grid container justify="center">
          <a href="https://www.netlify.com">
            <img
              src="https://www.netlify.com/img/global/badges/netlify-light.svg"
              alt="deploys by Netlify"
            />
          </a>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="center">
          <a href="https://www.algolia.com/">
            <AlgoliaBadge />
          </a>
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default Home;
