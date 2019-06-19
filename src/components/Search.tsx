import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
  return (
    <form>
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
  );
};

export default Search;
