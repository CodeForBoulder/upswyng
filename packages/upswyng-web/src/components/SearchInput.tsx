import { InputAdornment, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { SEARCH_PARAM_QUERY } from "../constants";
import SearchIcon from "@material-ui/icons/Search";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useInputStyles = makeStyles(theme => ({
  input: {
    background: theme.palette.common.white,
  },
}));

interface State {
  query: string;
  submitted: boolean;
}

class Search extends Component {
  inputClasses = useInputStyles();

  state: State = {
    query: "",
    submitted: false,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    this.setState({
      query: value,
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({
      submitted: true,
    });
  };

  render() {
    const { submitted, query } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className="search">
          <TextField
            aria-label="search"
            fullWidth
            placeholder="Search - What are your needs today?"
            id="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            name="search"
            onChange={this.handleChange}
            value={query}
            variant="filled"
          />
        </form>
        {submitted ? (
          <Redirect
            to={{
              pathname: "/search",
              search: `?${SEARCH_PARAM_QUERY}=${query}`,
            }}
          />
        ) : null}
      </>
    );
  }
}

export default Search;
