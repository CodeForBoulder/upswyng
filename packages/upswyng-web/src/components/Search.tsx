import React from "react";

import useSearchResults from "./useSearchResults";
import { getSearchParamVal } from "../utils/searchParams";
import { SEARCH_PARAM_QUERY } from "../constants";
import SearchResults from "./SearchResults";
import { Container } from "../App.styles";
import BannerColorContext from "./BannerColorContext";

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
