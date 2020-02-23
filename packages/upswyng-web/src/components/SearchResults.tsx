import { Link as RouterLink, useHistory } from "react-router-dom";
import { TAlgoliaHit, TStatusFetch } from "@upswyng/upswyng-types";
import Grid from "@material-ui/core/Grid";
import { History } from "history";
import LoadingList from "./LoadingSearchResults";
import MuiLink from "@material-ui/core/Link";
import React from "react";
import { SEARCH_PARAM_QUERY } from "../constants";
import SearchInput from "./SearchInput";
import Typography from "@material-ui/core/Typography";
import debounce from "debounce";
import useSearchParam from "./useSearchParam";
import useSearchResults from "./useSearchResults";

const shortenString = (s: string, numChars: number): string => {
  if (s.length <= numChars) {
    return s;
  }
  const splitString = s.substring(0, numChars).split(" ");
  if (splitString.length > 1) {
    // remove partial words
    splitString.pop();
  }
  return `${splitString.join(" ")}...`;
};

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
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <form onSubmit={e => e.preventDefault()}>
          <SearchInput onChange={handleChange} value={searchValue} />
        </form>
      </Grid>
      <Grid item>
        {status === TStatusFetch.STATUS_FETCHING && (
          <LoadingList numItems={4} />
        )}
        {results && (
          <Grid container direction="column" spacing={2}>
            {results.hits.map((hit: TAlgoliaHit) => (
              <Grid item key={hit.objectID}>
                <Typography variant="h3" component="h2" gutterBottom>
                  <MuiLink
                    component={RouterLink}
                    to={`resource/${hit.objectID}`}
                    underline="always"
                  >
                    {hit.name}
                  </MuiLink>
                </Typography>
                <Typography paragraph>
                  {shortenString(hit.description, 100)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchResults;
