import BannerColorContext from "./BannerColorContext";
import Container from "@material-ui/core/Container";
import React from "react";
import SearchResults from "./SearchResults";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const Search = () => {
  const { t } = useTranslation("search");
  const { updateCurrentBannerColor } = React.useContext(BannerColorContext);
  updateCurrentBannerColor("");

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        {t("search")}
      </Typography>
      <SearchResults />
    </Container>
  );
};

export default Search;
