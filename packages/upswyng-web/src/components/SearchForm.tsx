import React from "react";
import { Redirect } from "react-router";
import { SEARCH_PARAM_QUERY } from "../constants";
import SearchInput from "./SearchInput";

const SearchForm = () => {
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
        <SearchInput onChange={handleChange} value={query} />
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

export default SearchForm;
