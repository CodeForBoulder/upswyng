import { InputAdornment, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { ScreenReaderOnly, colors, font } from "../App.styles";

import { Redirect } from "react-router";
import { SEARCH_PARAM_QUERY } from "../constants";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";

const SearchInput = styled(TextField)`
  && {
    background: ${colors.white};
    color: ${colors.black};
    width: 100%;
  }
  && > div {
    margin-top: 0;
  }
  label {
    ${ScreenReaderOnly}
  }
  input {
    font-family: ${font.families.openSans};
    font-size: 1em;
    padding: ${font.helpers.convertPixelsToRems(7)}
      ${font.helpers.convertPixelsToRems(7)}
      ${font.helpers.convertPixelsToRems(7)} 0;
  }
  input::placeholder {
    color: ${colors.black};
    opacity: 1;
  }
` as typeof TextField;

const SearchAdornment = styled(InputAdornment)`
  && {
    margin-left: ${font.helpers.convertPixelsToRems(7)};
    margin-right: ${font.helpers.convertPixelsToRems(7)};
  }
  svg {
    width: ${font.helpers.convertPixelsToRems(18)};
    height: ${font.helpers.convertPixelsToRems(18)};
  }
` as typeof InputAdornment;

interface State {
  query: string;
  submitted: boolean;
}

class Search extends Component {
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
          <SearchInput
            id="search"
            label="Search"
            placeholder="Search - What are your needs today?"
            type="text"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <SearchAdornment position="start">
                  <SearchIcon />
                </SearchAdornment>
              ),
            }}
            onChange={this.handleChange}
            value={query}
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
