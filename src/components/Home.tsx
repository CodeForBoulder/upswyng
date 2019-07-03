import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import HomeButtonsMajor from './HomeButtonsMajor';
import HomeButtonsMinor from './HomeButtonsMinor';
import { Container } from '../App.styles';
import Search from './Search';
import { THomeButton } from '../types';

interface Props {
  classBlock: string;
  classModifier?: string;
}

const renderButtons = (buttons: THomeButton[], props: Props) =>
  buttons.map((button: THomeButton, index: number) => {
    const { classBlock, classModifier } = props;
    const blockClassName = `${classBlock} ${classBlock}--home${
      classModifier ? ` ${classBlock}--home-${classModifier}` : ''
    }`;
    const buttonElementClassName = `${classBlock}__button ${classBlock}__button--home ${
      classModifier ? `${classBlock}__button--home-${classModifier}` : ''
    }`;

    return (
      <Grid item xs={4} key={button.text}>
        <Grid container direction="column" alignItems="center">
          <Link
            to={button.to}
            className={blockClassName}
            data-test={button.text}
          >
            <Button component={'span'} className={buttonElementClassName}>
              {button.icon}
              {button.text}
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  });

const Home = () => (
  <Container container justify="space-evenly">
    <Grid item xs={12}>
      <Grid container justify="space-evenly">
        <Grid component={Search} item xs={12} />
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="space-evenly">
        {renderButtons(HomeButtonsMajor, { classBlock: 'tile' })}
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="space-evenly">
        {renderButtons(HomeButtonsMinor, {
          classBlock: 'tile',
          classModifier: 'minor'
        })}
      </Grid>
    </Grid>
  </Container>
);

export default Home;
