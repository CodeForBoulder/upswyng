import { Input, InputAdornment, InputBaseProps } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import { Redirect } from "react-router";
import { SEARCH_PARAM_QUERY } from "../constants";
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
  const [query, setQuery] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search">
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
            onChange={handleChange}
            value={query}
            {...props}
          />
        </FormControl>
      </form>
      {submitted && (
        <Redirect
          to={{
            pathname: "/search",
            search: `?${SEARCH_PARAM_QUERY}=${query}`,
          }}
        />
      )}
    </>
  );
};

export default Search;
