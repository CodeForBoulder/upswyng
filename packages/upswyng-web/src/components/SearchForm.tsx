import React from "react";
import { SEARCH_PARAM_QUERY } from "../constants";
import SearchInput from "./SearchInput";
import { useHistory } from "react-router-dom";

const SearchForm = () => {
  const history = useHistory();
  const [query, setQuery] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (query) {
      history.push({
        pathname: "/search",
        search: `?${SEARCH_PARAM_QUERY}=${query}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <SearchInput onChange={handleChange} value={query} />
    </form>
  );
};

export default SearchForm;
