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
