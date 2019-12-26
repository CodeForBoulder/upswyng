import BannerColorContext from "./BannerColorContext";
import { Container } from "../App.styles";
import React from "react";
import { SEARCH_PARAM_QUERY } from "../constants";
import SearchResults from "./SearchResults";
import { getSearchParamVal } from "../utils/searchParams";
import useSearchResults from "./useSearchResults";

const Search = () => {
  const searchQuery = getSearchParamVal(SEARCH_PARAM_QUERY);
  const { updateCurrentBannerColor } = React.useContext(BannerColorContext);
  updateCurrentBannerColor("");
  const results = useSearchResults(searchQuery || "");

  return (
    <Container>
      <h1>Search</h1>
      {searchQuery && <SearchResults results={results} />}
    </Container>
  );
};

export default Search;
