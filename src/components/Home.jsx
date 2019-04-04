import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import HomeButtonsMajor from './HomeButtonsMajor';
import HomeButtonsMinor from './HomeButtonsMinor';
import Search from './Search';

export const HomeComponent = () => (
  <Grid container className="home" spacing={16} justify="space-evenly">
    <Grid item xs={12}>
      <Grid container className="home" spacing={16} justify="space-evenly">
        <Grid component={Search} item xs={12} />
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={16} justify="space-evenly">
        {HomeButtonsMajor.map((button, index) => {
          return (
            <Grid item xs={4} key={button.text}>
              <Grid container direction="column" align="center">
                <Button
                  component={Link}
                  to={button.to}
                  className="button button--home"
                  data-test={button.text}
                >
                  {button.icon}
                  {button.text}
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={16} justify="space-evenly">
        {HomeButtonsMinor.map(button => {
          return (
            <Grid item xs={4} key={button.text}>
              <Grid container direction="column" align="center">
                <Button
                  component={Link}
                  to={button.to}
                  className="button button--home button--home-minor"
                  data-test={button.text}
                >
                  {button.icon}
                  {button.text}
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  </Grid>
);

const Home = () => <HomeComponent />;

export default Home;
