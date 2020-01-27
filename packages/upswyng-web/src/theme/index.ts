import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import palette from "./palette";
import typography from "./typography";

const theme = createMuiTheme({
  palette,
  typography,
  shape: {
    borderRadius: 0,
  },
});

export default theme;
