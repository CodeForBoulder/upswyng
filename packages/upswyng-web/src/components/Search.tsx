import BannerColorContext from "./BannerColorContext";
import { Container } from "../App.styles";
import React from "react";
import SearchResults from "./SearchResults";
import Typography from "@material-ui/core/Typography";

const Search = () => {
  const { updateCurrentBannerColor } = React.useContext(BannerColorContext);
  updateCurrentBannerColor("");

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Search
      </Typography>
      <SearchResults />
    </Container>
  );
};

export default Search;
