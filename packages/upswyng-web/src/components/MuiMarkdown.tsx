import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import React from "react";
import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";

type THeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
const asHeadingVariant = (headingLevel: number): THeadingVariant | null => {
  switch (headingLevel) {
    case 1:
      return "h1";
    case 2:
      return "h2";
    case 3:
      return "h3";
    case 4:
      return "h4";
    case 5:
      return "h5";
    case 6:
      return "h6";
    default:
      return null;
  }
};

interface RendererProps {
  children: React.ReactNode;
}
interface HeadingRendererProps extends RendererProps {
  level: number;
}
interface ListRendererProps extends RendererProps {
  ordered: boolean;
}

const renderers: Record<string, React.ElementType> = {
  heading: ({ children, level }: HeadingRendererProps) => {
    const headingVariant = asHeadingVariant(level);
    if (!headingVariant) {
      return null;
    }
    return (
      <Typography gutterBottom variant={headingVariant}>
        {children}
      </Typography>
    );
  },
  link: Link,
  list: ({ children, ordered }: ListRendererProps) => {
    return (
      <Typography component={ordered ? "ol" : "ul"} paragraph>
        {children}
      </Typography>
    );
  },
  listItem: ({ children }: RendererProps) => (
    <Typography component="li">{children}</Typography>
  ),
  paragraph: ({ children }: RendererProps) => (
    <Typography paragraph>{children}</Typography>
  ),
  thematicBreak: () => (
    <Typography component="div" paragraph>
      <Divider />
    </Typography>
  ),
};

interface Props {
  markdown: string;
}

const MuiMarkdown = ({ markdown }: Props) => (
  <ReactMarkdown renderers={renderers} source={markdown} />
);

export default MuiMarkdown;
