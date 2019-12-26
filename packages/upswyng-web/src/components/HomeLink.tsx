import { THomeButtonAnchor, THomeButtonRouterLink } from "../webTypes";
import styled, { css } from "styled-components";

import { Link } from "react-router-dom";
import React from "react";

interface HomeLinkPropsBase {
  children: React.ReactElement | React.ReactElement[];
}

type HomeRouterLinkProps = HomeLinkPropsBase & THomeButtonRouterLink;
type HomeAnchorProps = HomeLinkPropsBase &
  THomeButtonAnchor &
  React.HTMLProps<HTMLAnchorElement>;

const HomeLinkStyles = css`
  align-items: stretch;
  display: flex;
  flex: 1 1 100%;
  padding: 4px;
  text-decoration: none;
  width: 100%;
`;

export const HomeRouterLink = styled((props: HomeRouterLinkProps) => {
  const { children, linkProps, ...rest } = props;
  return (
    <Link {...linkProps} {...rest}>
      {children}
    </Link>
  );
})`
  ${HomeLinkStyles}
`;

export const HomeAnchorLink = styled((props: HomeAnchorProps) => {
  const { children, ...rest } = props;
  return <a {...rest}>{children}</a>;
})`
  ${HomeLinkStyles}
`;

export default HomeRouterLink;
