import { Input, InputAdornment, InputBaseProps } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useInputStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    "&:hover": {
      background: theme.palette.common.white,
    },
  },
}));

const Search = (props: InputBaseProps) => {
  const inputClasses = useInputStyles({});

  return (
    <FormControl fullWidth hiddenLabel>
      <Input
        aria-label="search"
        fullWidth
        placeholder="Search - What are your needs today?"
        id="search"
        classes={inputClasses}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        name="search"
        {...props}
      />
    </FormControl>
  );
};

export default Search;
