import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from 'react-chartjs-2';
import { Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  monthlyTransactions: Transaction[];
}

const BarChart = ({ monthlyTransactions }: BarChartProps) => {

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      // legend: {
      //   position: "top" as const,
      // },
      title: {
        display: true,
        text: "日別収支",
      },
    },
  };

  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);
  console.log(monthlyTransactions);


  const dateLabels = Object.keys(dailyBalances);
  const expenseData = dateLabels.map((day) => dailyBalances[day].expense);
  const incomeData = dateLabels.map((day) => dailyBalances[day].income);

  const labels = [
    "2024-10-15",
    "2024-10-16",
    "2024-10-17",
    "2024-10-18",
    "2024-10-19",
    "2024-10-20",
    "2024-10-21",
  ]

  const data = {
    labels,
    datasets: [
      {
        label: "支出",
        data: [100, 200, 300, 400, 500, 600, 700],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "収入",
        data: [900, 800, 700, 600, 500, 400, 300],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ]
  }

  return <Bar options={options} data={data} />;
}

export default BarChart