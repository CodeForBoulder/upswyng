import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { THomeButtonAnchor, THomeButtonRouterLink } from '../types';

interface HomeLinkPropsBase {
  children: React.ReactElement | React.ReactElement[];
}

type HomeRouterLinkProps = HomeLinkPropsBase & THomeButtonRouterLink;
type HomeAnchorProps = HomeLinkPropsBase & THomeButtonAnchor;

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
  const { children, href, target, ...rest } = props;
  return (
    <a href={href} target={target} {...rest}>
      {children}
    </a>
  );
})`
  ${HomeLinkStyles}
`;

export default HomeRouterLink;
