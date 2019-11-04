export interface TEnvVariables {
  REACT_APP_ALGOLIA_ADMIN_API_KEY: string;
  REACT_APP_ALGOLIA_APP_ID: string;
  REACT_APP_ALGOLIA_INDEX_NAME: string;
  REACT_APP_ALGOLIA_SEARCH_API_KEY: string;
  REACT_APP_FIREBASE_API_KEY: string;
  REACT_APP_FIREBASE_AUTH_DOMAIN: string;
  REACT_APP_FIREBASE_DATABASE_URL: string;
  REACT_APP_FIREBASE_PROJECT_ID: string;
  REACT_APP_FIREBASE_STORAGE_BUCKET: string;
  REACT_APP_FIREBASE_MESSAGE_SENDER_ID: string;
  REACT_APP_GOOGLE_MAPS_API_KEY: string;
}

export interface TResourceCategory {
  text: string;
  stub: string;
  query: string;
}

export interface TResourceSubcategory {
  text: string;
  stub: string;
}

export interface TIconProps {
  color?: string;
}

interface THomeButtonBase {
  color: string;
  icon: React.ComponentType<TIconProps>;
  text: string;
}
export interface THomeButtonAnchor extends THomeButtonBase {
  href: string;
}

export interface THomeButtonRouterLink extends THomeButtonBase {
  linkState: string;
}
