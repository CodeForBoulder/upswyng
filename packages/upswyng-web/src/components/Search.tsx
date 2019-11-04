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

  return (
    <Container>
      <h1>Search</h1>
      {searchQuery && <SearchResults results={useSearchResults(searchQuery)} />}
    </Container>
  );
};

export default Search;
