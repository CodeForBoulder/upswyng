import React, { Component, Fragment } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router';

import { SEARCH_PARAM_QUERY } from '../constants';

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
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="search"
            label="Search"
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
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
      </Fragment>
    );
  }
}

export default Search;
