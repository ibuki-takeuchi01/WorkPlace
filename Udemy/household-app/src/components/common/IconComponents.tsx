import { ExpenseCategory, IncomeCategory } from "../../types"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import GroupIcon from '@mui/icons-material/Group';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TrainIcon from '@mui/icons-material/Train';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';

const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
  食費: <FastfoodIcon fontSize="small" />,
  日用品: <DryCleaningIcon fontSize="small" />,
  住居費: <OtherHousesIcon fontSize="small" />,
  交際費: <GroupIcon fontSize="small" />,
  娯楽: <SportsEsportsIcon fontSize="small" />,
  交通費: <TrainIcon fontSize="small" />,
  医療費: <MedicalServicesIcon fontSize="small" />,
  給与: <AttachMoneyIcon fontSize="small" />,
  ボーナス: <CurrencyExchangeIcon fontSize="small" />,
  その他収入: <SavingsIcon fontSize="small" />,
}

export default IconComponents