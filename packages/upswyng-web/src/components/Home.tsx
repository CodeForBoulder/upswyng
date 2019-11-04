import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import HomeButtons from "./HomeButtons";
import { Container, font } from "../App.styles";
import SearchInput from "./SearchInput";
import AlgoliaBadge from "./AlgoliaBadge";

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
  <Container container justify="space-evenly" alignItems="center">
    <Grid item xs={12}>
      <SearchInput />
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
  </Container>
);

export default Home;
