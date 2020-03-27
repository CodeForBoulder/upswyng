import Container from "@material-ui/core/Container";
import MuiLink from "@material-ui/core/Link";
import PageBanner from "./PageBanner";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import SearchForm from "./SearchForm";
import Typography from "@material-ui/core/Typography";
import { colors } from "../App.styles";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() =>
  createStyles({
    marginTop: {
      marginTop: "3.5rem",
    },
  })
);

const NotFound = () => {
  const classes = useStyles();
  return (
    <Container>
      <PageBanner color={colors.orangeDark} text={"Page not Found"} />
      <Typography variant="h3">
        Whoops! We&apos;re having trouble finding that page.
      </Typography>
      <div className={classes.marginTop}>
        <SearchForm />
      </div>
      <Typography className={classes.marginTop}>
        You can also go back{" "}
        <MuiLink component={RouterLink} to="/">
          home
        </MuiLink>{" "}
        to browse.
      </Typography>
    </Container>
  );
};

export default NotFound;
