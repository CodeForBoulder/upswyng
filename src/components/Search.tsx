import React, { Component } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import { SEARCH_PARAM_QUERY } from '../constants';
import { colors, fonts, ScreenReaderOnly } from '../App.styles';

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
    font-family: ${fonts.openSans};
    font-size: 1em;
    padding: 7px 7px 7px 0;
  }
  input::placeholder {
    color: ${colors.black};
    opacity: 1;
  }
` as typeof TextField;

const SearchAdornment = styled(InputAdornment)`
  && {
    margin-left: 7px;
    margin-right: 7px;
  }
  svg {
    width: 0.75em;
    height: 0.75em;
  }
` as typeof InputAdornment;

interface State {
  query: string;
  submitted: boolean;
}

class Search extends Component {
  state: State = {
    query: '',
    submitted: false
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;

    this.setState({
      query: value
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({
      submitted: true
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
              )
            }}
            onChange={this.handleChange}
            value={query}
          />
        </form>
        {submitted ? (
          <Redirect
            to={{
              pathname: '/search',
              search: `?${SEARCH_PARAM_QUERY}=${query}`
            }}
          />
        ) : null}
      </>
    );
  }
}

export default Search;
