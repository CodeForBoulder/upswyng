import { THomeButtonAnchor, THomeButtonRouterLink } from "../webTypes";

import { Link } from "react-router-dom";
import React from "react";

interface HomeLinkPropsBase {
  children: React.ReactElement | React.ReactElement[];
}

type HomeRouterLinkProps = HomeLinkPropsBase & THomeButtonRouterLink;
type HomeAnchorProps = HomeLinkPropsBase &
  THomeButtonAnchor &
  React.HTMLProps<HTMLAnchorElement>;

export const HomeRouterLink = (props: HomeRouterLinkProps) => {
  const { children, linkProps, ...rest } = props;
  return (
    <Link {...linkProps} {...rest}>
      {children}
    </Link>
  );
};

export const HomeAnchorLink = (props: HomeAnchorProps) => {
  const { children, ...rest } = props;
  return <a {...rest}>{children}</a>;
};

export default HomeRouterLink;
