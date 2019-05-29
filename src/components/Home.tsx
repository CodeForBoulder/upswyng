import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import HomeButtonsMajor from './HomeButtonsMajor';
import HomeButtonsMinor from './HomeButtonsMinor';
import Search from './Search';
import { THomeButton } from '../types';

interface Props {
  className: string;
}

const renderButtons = (buttons: THomeButton[], props: Props) =>
  buttons.map((button: THomeButton, index: number) => {
    return (
      <Grid item xs={4} key={button.text}>
        <Grid container direction="column" alignItems="center">
          <Button
            component={() => <Link to={button.to} />}
            data-test={button.text}
            {...props}
          >
            {button.icon}
            {button.text}
          </Button>
        </Grid>
      </Grid>
    );
  });

const Home = () => (
  <Grid container className="home" spacing={16} justify="space-evenly">
    <Grid item xs={12}>
      <Grid container className="home" spacing={16} justify="space-evenly">
        <Grid component={Search} item xs={12} />
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={16} justify="space-evenly">
        {renderButtons(HomeButtonsMajor, { className: 'button button--home' })}
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={16} justify="space-evenly">
        {renderButtons(HomeButtonsMinor, {
          className: 'button button--home button--home-minor'
        })}
      </Grid>
    </Grid>
  </Grid>
);

export default Home;
