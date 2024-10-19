import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, cyan, green, grey, indigo, lightBlue, lightGreen, lime, pink, red, teal } from "@mui/material/colors";
import { ExpenseCategory, IncomeCategory } from "../types";

declare module "@mui/material/styles" {
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
    incomeCategoryColor: Record<IncomeCategory, string>;
    expenseCategoryColor: Record<ExpenseCategory, string>;
  }

  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
    incomeCategoryColor: Record<IncomeCategory, string>;
    expenseCategoryColor: Record<ExpenseCategory, string>;
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
    },
    // 収入カテゴリ毎の色を定義
    incomeCategoryColor: {
      給与: lightBlue[600],
      ボーナス: cyan[200],
      その他収入: lightGreen["A700"],
    },
    // 支出カテゴリ毎の色を定義
    expenseCategoryColor: {
      食費: pink[400],
      日用品: teal[300],
      住居費: cyan[400],
      交際費: indigo[500],
      娯楽: lime[400],
      交通費: grey[400],
      医療費: blue[100],
    },
  },
});