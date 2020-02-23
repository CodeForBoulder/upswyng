import { Link, useHistory } from "react-router-dom";
import { History } from "history";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LoadingList from "./LoadingList";
import React from "react";
import { SEARCH_PARAM_QUERY } from "../constants";
import SearchInput from "./SearchInput";
import { TStatusFetch } from "@upswyng/upswyng-types";
import debounce from "debounce";
import useSearchParam from "./useSearchParam";
import useSearchResults from "./useSearchResults";

const updateSearchParam = debounce((searchValue: string, history: History) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(SEARCH_PARAM_QUERY, searchValue);

  history.replace({
    search: searchParams.toString(),
  });
}, 300);

const SearchResults = () => {
  const searchQueryParam = useSearchParam(SEARCH_PARAM_QUERY);
  const [searchValue, setSearchValue] = React.useState<string>(
    searchQueryParam || ""
  );
  const [status, results] = useSearchResults(searchQueryParam || "");
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = e.target.value;
    setSearchValue(searchInputValue);
    updateSearchParam(searchInputValue, history);
  };

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <SearchInput onChange={handleChange} value={searchValue} />
      </form>
      {status === TStatusFetch.STATUS_FETCHING && <LoadingList numItems={4} />}
      {results && (
        <List>
          {results.hits.map(hit => (
            <ListItem
              button
              component={Link}
              to={`resource/${hit.objectID}`}
              key={hit.objectID}
            >
              <ListItemText primary={hit.name} secondary={hit.description} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default SearchResults;
