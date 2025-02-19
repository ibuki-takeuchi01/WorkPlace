import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ExpenseCategory, IncomeCategory, Transaction } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Schema, transactionSchema } from "../validations/schema";
import { useAppContext } from "./AppContext";

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

type IncomeExpense = "income" | "expense"

const TransactionForm = ({ onCloseForm, isEntryDrawerOpen, currentDay, selectedTransaction, setSelectedTransaction, isDialogOpen, setIsDialogOpen }: TransactionFormProps) => {
  const { onSaveTransaction, onDeleteTransaction, onUpdateTransaction, isMobile } = useAppContext();
  const formWidth = 320;

  /** グローバルな値を取得 */
  const context = useAppContext()

  /** 支出用カテゴろ */
  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <DryCleaningIcon fontSize="small" /> },
    { label: "住居費", icon: <OtherHousesIcon fontSize="small" /> },
    { label: "交際費", icon: <GroupIcon fontSize="small" /> },
    { label: "娯楽", icon: <SportsEsportsIcon fontSize="small" /> },
    { label: "交通費", icon: <TrainIcon fontSize="small" /> },
    { label: "医療費", icon: <MedicalServicesIcon fontSize="small" /> },
  ]

  /** 収入用カテゴリ */
  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <AttachMoneyIcon fontSize="small" /> },
    { label: "ボーナス", icon: <CurrencyExchangeIcon fontSize="small" /> },
    { label: "その他収入", icon: <SavingsIcon fontSize="small" /> },
  ]

  const [categories, setCategories] = useState(expenseCategories);

  const { control, setValue, watch, formState: { errors }, handleSubmit, reset } = useForm<Schema>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
    resolver: zodResolver(transactionSchema),
  })

  /** 収支タイプを切り替える関数 */
  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
    setValue("category", "");
  };

  /** 収支タイプを監視する関数 */
  const currentType = watch("type");

  useEffect(() => {
    const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories)
  }, [currentType]);

  useEffect(() => {
    setValue("date", currentDay)
  }, [currentDay]);

  /** 送信処理 */
  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction.id)
        .then(() => {
          console.log("更新が完了しました。");
          setSelectedTransaction(null);
          if (isMobile) {
            setIsDialogOpen(false);
          }
        })
        .catch((error) => {
          console.error(error);
        })
    } else {
      onSaveTransaction(data).then(() => {
        console.log("保存が完了しました。");
        setSelectedTransaction(null);
      })
        .catch((error) => {
          console.error(error);
        })
    }

    reset({
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    });
  };

  /** フォーム切り替え時にカテゴリの値を初期化する */
  useEffect(() => {
    if (selectedTransaction) {
      const categoryExists = categories.some((category) => category.label === selectedTransaction.category);
      setValue("category", categoryExists ? selectedTransaction.category : "");
    };
  }, [selectedTransaction, categories])

  /** フォーム内容を初期化 */
  useEffect(() => {
    if (selectedTransaction) {
      setValue("type", selectedTransaction.type)
      setValue("date", selectedTransaction.date)
      setValue("amount", selectedTransaction.amount)
      setValue("content", selectedTransaction.content)
    } else {
      reset({
        type: "expense",
        date: currentDay,
        amount: 0,
        category: "",
        content: "",
      });
    }
  }, [selectedTransaction]);

  /** 取引を削除する処理 */
  const handleDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction?.id);
      if (isMobile) {
        setIsDialogOpen(false);
      }
      setSelectedTransaction(null);
    }
  }

  /** 入力エリア共通コンポーネント */
  const formContent = (
    <>
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
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
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
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="category-select-label">カテゴリ</InputLabel>
                <Select
                  {...field}
                  labelId="category-select-label"
                  id="category-select"
                  label="カテゴリ"
                >
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category.label}>
                      <ListItemIcon>
                        {category.icon}
                      </ListItemIcon>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>
            )}
          />
          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.amount}
                helperText={errors.amount?.message}
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
              <TextField
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field} label="内容" type="text" />
            )}
          />
          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            {selectedTransaction ? "更新" : "保存"}
          </Button>
          {/* 削除ボタン */}
          {selectedTransaction && (
            <Button
              onClick={handleDelete}
              variant="outlined"
              color={"secondary"}
              fullWidth
            >
              削除
            </Button>
          )}
        </Stack>
      </Box>
    </>
  )

  return (
    <>
      {isMobile ? (
        /** モバイル */
        <Dialog open={isDialogOpen} onClose={onCloseForm} fullWidth maxWidth={"sm"}>
          <DialogContent>
            {formContent}
          </DialogContent>
        </Dialog>
      ) : (
        /** PC */
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
          {formContent}
        </Box>
      )}
    </>
  );
};
export default TransactionForm;
