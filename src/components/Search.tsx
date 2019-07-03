import React, { Component } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import { SEARCH_PARAM_QUERY } from '../constants';
import { colors } from '../App.styles';

const StyledSearch = styled(TextField)`
  && {
    width: 100%;
    background: ${colors.white};
    color: ${colors.black};
  }
  input {
    padding: 7px;
    font-size: 1em;
  }
` as typeof TextField;

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
          <StyledSearch
            id="search"
            label="Search"
            placeholder="Search - What are your needs today?"
            type="text"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            className="search__input-container"
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
