import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ExpenseCategory, IncomeCategory } from "../types";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import GroupIcon from '@mui/icons-material/Group';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TrainIcon from '@mui/icons-material/Train';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string
}

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

type IncomeExpense = "income" | "expense"

const TransactionForm = ({ onCloseForm, isEntryDrawerOpen, currentDay }: TransactionFormProps) => {
  const formWidth = 320;
  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <DryCleaningIcon fontSize="small" /> },
    { label: "住居費", icon: <OtherHousesIcon fontSize="small" /> },
    { label: "交際費", icon: <GroupIcon fontSize="small" /> },
    { label: "娯楽", icon: <SportsEsportsIcon fontSize="small" /> },
    { label: "交通費", icon: <TrainIcon fontSize="small" /> },
    { label: "医療費", icon: <MedicalServicesIcon fontSize="small" /> },
  ]
  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <AttachMoneyIcon fontSize="small" /> },
    { label: "ボーナス", icon: <CurrencyExchangeIcon fontSize="small" /> },
    { label: "その他収入", icon: <SavingsIcon fontSize="small" /> },
  ]

  const [categories, setCategories] = useState(expenseCategories);

  const { control, setValue, watch } = useForm({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    }
  })

  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
  };

  const currentType = watch("type");

  useEffect(() => {
    const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories)
  }, [currentType]);

  useEffect(() => {
    setValue("date", currentDay)
  }, [currentDay])

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  variant={field.value === "income" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => incomeExpenseToggle("income")}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField {...field} id="カテゴリ" label="カテゴリ" select>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.label}>
                    <ListItemIcon>
                      {category.icon}
                    </ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
              />
            )}
          />
          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="内容" type="text" />
            )}
          />
          {/* 保存ボタン */}
          <Button type="submit" variant="contained" color={currentType === "income" ? "primary" : "error"} fullWidth>
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
