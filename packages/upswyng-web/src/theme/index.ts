import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const breakpoints = {
  values: { xs: 0, sm: 480, md: 480, lg: 480, xl: 480 },
};

const spacing = (factor: number): string => `${0.25 * factor}rem`;

const palette = {
  common: { black: "#000", white: "#fff" },
  background: { paper: "#252525", default: "#3a3a3a" },
  primary: {
    main: "#F05A28",
    contrastText: "#000",
  },
  secondary: {
    main: "#F4BD21",
    contrastText: "#000",
  },
  error: {
    main: "#BC2222",
    contrastText: "#fff",
  },
  text: {
    primary: "#fff",
    secondary: "#CECECE",
    disabled: "#fff",
  },
  action: {
    active: "#fff",
    hover: "rgba(255, 255, 255, 0.07)",
  },
  divider: "#fff",
};

const typography = {
  fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
  fontSize: 16,
  h1: {
    fontSize: "1.6rem",
    fontWeight: 400,
  },
  h2: {
    fontSize: "1.5rem",
    fontWeight: 400,
    marginBottom: spacing(1),
  },
  h3: {
    fontSize: "1.2rem",
    fontWeight: 300,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 300,
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.2,
    margin: 0,
  },
  subtitle2: {
    fontSize: "0.8rem",
    fontWeight: 400,
    lineHeight: 1.2,
    margin: 0,
  },
  caption: {
    display: "inline-block",
    fontSize: "0.75rem",
    lineHeight: 1.3,
  },
} as { [name: string]: React.CSSProperties };

const theme = createMuiTheme({
  breakpoints,
  palette,
  spacing,
  typography,
  shape: {
    borderRadius: 0,
  },
});

export default theme;
