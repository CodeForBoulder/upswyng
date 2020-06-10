import parse, { domToReact } from "html-react-parser";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import PageBanner from "./PageBanner";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { colors } from "@upswyng/common";

interface Props {
  html: string;
}

const options = {
  replace: (domNode: any) => {
    switch (domNode.name) {
      case "a":
        return (
          <Link
            href={domNode.attribs.href}
            rel={domNode.attribs.rel}
            target={domNode.attribs.target}
          >
            {domToReact(domNode.children, options)}
          </Link>
        );
      case "br":
        return (
          <Typography component="div" paragraph>
            <Divider />
          </Typography>
        );
      case "p":
        return (
          <Typography paragraph>
            {domToReact(domNode.children, options)}
          </Typography>
        );
      case "h1":
        return (
          <PageBanner color={colors.orangeDark}>
            <Typography variant="h1">
              {domToReact(domNode.children, options)}
            </Typography>
          </PageBanner>
        );
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return (
          <Typography gutterBottom variant={domNode.name}>
            {domToReact(domNode.children, options)}
          </Typography>
        );
      case "li":
      case "ol":
      case "ul":
        return (
          <Typography component={domNode.name} paragraph>
            {domToReact(domNode.children, options)}
          </Typography>
        );
    }
  },
};

const MuiHtml = ({ html }: Props) => <>{parse(html, options)}</>;

export default MuiHtml;
