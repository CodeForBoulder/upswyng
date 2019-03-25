import React from 'react';
import { Grid } from '@material-ui/core';
import Search from './Search';

const Home = () => (
  <Grid container className="home" spacing={16} justify="space-evenly">
    <Grid component={Search} item xs={12} />
  </Grid>
);

export default Home;
