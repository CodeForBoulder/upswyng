import React, { Component, Fragment } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router';

interface State {
  query: string;
  submitted: boolean;
}

class Search extends Component {
  state: State = {
    query: '',
    submitted: false
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({
      submitted: true
    });
  };

  render() {
    const { submitted } = this.state;
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
          />
        </form>
        {submitted ? <Redirect to="/" /> : null}
      </Fragment>
    );
  }
}

export default Search;
