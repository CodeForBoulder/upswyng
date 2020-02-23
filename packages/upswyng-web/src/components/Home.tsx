import AlgoliaBadge from "./AlgoliaBadge";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import HomeButtons from "./HomeButtons";
import React from "react";
import SearchForm from "./SearchForm";
import { font } from "../App.styles";
import styled from "styled-components";

const HomeButtonsContainer = styled(Grid)`
  && {
    margin-bottom: ${font.helpers.convertPixelsToRems(30)};
    margin-left: ${font.helpers.convertPixelsToRems(-4)};
    margin-right: ${font.helpers.convertPixelsToRems(-4)};
    margin-top: ${font.helpers.convertPixelsToRems(15)};
    width: auto;
  }
` as typeof Grid;

const Home = () => (
  <Container>
    <Grid container justify="space-evenly" alignItems="center">
      <Grid item xs={12}>
        <SearchForm />
      </Grid>
      <Grid item xs={12}>
        <HomeButtonsContainer
          container
          direction="row"
          justify="space-evenly"
          alignItems="stretch"
          spacing={0}
        >
          <HomeButtons />
        </HomeButtonsContainer>
      </Grid>
      <Grid item xs={6}>
        <Grid container justify="center">
          <a href="https://www.netlify.com">
            <img
              src="https://www.netlify.com/img/global/badges/netlify-light.svg"
              alt="deploys by Netlify"
            />
          </a>
        </Grid>
      </Grid>
      <Grid item xs={6}>
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
