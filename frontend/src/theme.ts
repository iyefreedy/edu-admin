import { createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey[100],
    },
  },
});

export default theme;
