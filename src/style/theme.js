import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#880e4f", // ורוד כהה
    },
    secondary: {
      main: "#f06292", // ורוד בהיר
    },
    background: {
      default: "#ffffff", // רקע לבן
    },
    success: {
      main: "#FFB6C1", // ורוד חתיך
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
