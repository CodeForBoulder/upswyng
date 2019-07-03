import React from 'react';
import { Grid } from '@material-ui/core';
import HomeButtons from './HomeButtons';
import { Container } from '../App.styles';
import Search from './Search';

const Home = () => (
  <Container container justify="space-evenly">
    <Grid item xs={12}>
      <Search />
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="space-evenly" spacing={8}>
        <HomeButtons />
      </Grid>
    </Grid>
  </Container>
);

export default Home;
