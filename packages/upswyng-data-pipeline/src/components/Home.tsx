import React from "react";
import HomeButtons from "./HomeButtons";
import HomeSearch from "./HomeSearchBar";
import AlgoliaSearchIcon from "../icons/AlgoliaSearch";
import debounce from "debounce";
import algoliaSearch from "algoliasearch";
import config from "../../config";
import SearchResults from "./SearchResults";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Linking, View } from "react-native";
import { TSearchHit } from "../useSearchResults";

const openAlgolia = () => {
  Linking.openURL("https://www.algolia.com");
};

interface THomeState {
  searchBarValue: string;
  debouncedSearchValue: string;
  searchResults: TSearchHit[] | null;
}

class Home extends React.Component<{}, THomeState> {
  state = {
    searchBarValue: "",
    debouncedSearchValue: "",
    searchResults: null, // null when no search or in progress; empty array for no search hits
  };

  searchIndex = algoliaSearch(
    config.REACT_APP_ALGOLIA_APP_ID,
    config.REACT_APP_ALGOLIA_SEARCH_API_KEY
  ).initIndex(config.REACT_APP_ALGOLIA_INDEX_NAME);

  searchFor = debounce((query: string) => {
    if (!query) {
      this.setState(s => ({
        ...s,
        searchResults: null,
        debouncedSearchValue: "",
      }));
      return;
    }
    this.setState(s => ({ ...s, debouncedSearchValue: query }));
    this.searchIndex
      .search({
        query: "",
        similarQuery: query,
      } as any)
      .then(searchResults => {
        const r = (searchResults.hits || []).map(h => ({
          ...h,
          objectId: h.objectID,
          resourceName: h.charityname,
        })) as TSearchHit[];
        this.setState(s => ({ ...s, searchResults: r }));
      });
  }, /* debounce delay(ms) = */ 1200);

  setSearchValue = (v: string) => {
    this.setState(s => ({ ...s, searchBarValue: v }));
    this.searchFor(v);
  };

  render() {
    return (
      <View style={styles.container}>
        <HomeSearch
          onChange={this.setSearchValue}
          value={this.state.searchBarValue}
        />
        {this.state.searchBarValue ? (
          <SearchResults searchHits={this.state.searchResults} />
        ) : (
          <>
            <HomeButtons />
            <View style={styles.footer}>
              <TouchableWithoutFeedback onPress={openAlgolia}>
                <View>
                  <AlgoliaSearchIcon />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
});

export default Home;
