import {
  TAlert,
  TAlgoliaHit,
  TCategory,
  TResource,
  TSubcategory,
} from "@upswyng/upswyng-types";

import { LinkProps } from "react-router-dom";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import algoliaSearch from "algoliasearch";

export interface TAlgoliaResponse extends algoliaSearch.Response {
  hits: TAlgoliaHit[];
}

export interface TEnvVariables {
  env: {
    REACT_APP_ALGOLIA_APP_ID: string;
    REACT_APP_ALGOLIA_SEARCH_API_KEY: string;
    REACT_APP_ALGOLIA_INDEX_NAME: string;
    REACT_APP_GOOGLE_MAPS_API_KEY: string;
    REACT_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID: string;
    REACT_APP_GOOGLE_TAG_MANAGER_AUTH: string;
    REACT_APP_GOOGLE_TAG_MANAGER_PREVIEW: string;
    REACT_APP_OPEN_WEATHER_API_KEY: string;
  };
}

interface TPayloadBase {
  message?: string;
}

export interface TAlertsPayload extends TPayloadBase {
  alerts?: TAlert[];
  count?: number;
}

export interface TResourcePayload extends TPayloadBase {
  resource?: TResource;
}

export interface TResourcesByCategoryPayload extends TPayloadBase {
  category?: TCategory;
}

export interface TResourcesBySubcategoryPayload extends TPayloadBase {
  subcategory?: TSubcategory;
}

interface THomeButtonBase {
  color: string;
  icon: React.ReactElement<SvgIconProps>;
  text: string;
}
export interface THomeButtonAnchor extends THomeButtonBase {
  href: string;
  target: string;
  rel: string;
}

export interface THomeButtonRouterLink extends THomeButtonBase {
  linkProps: LinkProps;
}

export interface TResourceCategory {
  text: string;
  stub: string;
}

export interface TResourceSubcategory {
  text: string;
  stub: string;
}

export type TGoogleMapTravelMode =
  | "TRANSIT"
  | "DRIVING"
  | "WALKING"
  | "BICYCLING";

export type TGoogleMapDirectionsStatusCode =
  | "OK"
  | "ZERO_RESULTS"
  | "MAX_WAYPOINTS_EXCEEDED"
  | "MAX_ROUTE_LENGTH_EXCEEDED"
  | "INVALID_REQUEST"
  | "OVER_DAILY_LIMIT"
  | "OVER_QUERY_LIMIT"
  | "REQUEST_DENIED"
  | "UNKNOWN_ERROR";
