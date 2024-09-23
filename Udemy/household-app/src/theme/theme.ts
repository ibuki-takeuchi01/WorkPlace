import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
  }

  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  palette: {
    // 収入の色を定義
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
      contrastText: "#fff",
    },
    // 支出の色を定義
    expenseColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
      contrastText: "#fff",
    },
    // 残高用の色の定義
    balanceColor: {
      main: green[500],
      light: green[100],
      dark: green[700],
      contrastText: "#fff",
    }
  },
});