import { Link } from "react-router-dom";
import React from "react";
import { THomeButtonRouterLink } from "../webTypes";

interface HomeLinkPropsBase {
  children: React.ReactElement | React.ReactElement[];
}

type HomeLink = HomeLinkPropsBase & THomeButtonRouterLink;

const HomeLink = (props: HomeLink) => {
  const { children, linkProps } = props;
  return (
    <Link style={{ textDecoration: "none" }} {...linkProps}>
      {children}
    </Link>
  );
};

export default HomeLink;
