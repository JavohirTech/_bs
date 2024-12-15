import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {useEffect, useState} from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Transaction = {
  id: number;
  amount: string;
  category: string;
  subCategory: string;
  createdAt: string;
  description: string;
  type: string;
};

export const LineChart = () => {
  const [chartData, setChartData] = useState<{
    labels: string[],
    datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number }[]
  }>({labels: [], datasets: []});

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");

    const incomeData = savedTransactions
        .filter((transaction: Transaction) => transaction.category === "income")
        .reduce((acc: { [key: string]: number }, transaction: Transaction) => {
          const month = new Date(transaction.createdAt).toLocaleString('uz-UZ', {month: 'long'});
          acc[month] = (acc[month] || 0) + parseFloat(transaction.amount);
          return acc;
        }, {});

    const outcomeData = savedTransactions
        .filter((transaction: Transaction) => transaction.category === "outcome")
        .reduce((acc: { [key: string]: number }, transaction: Transaction) => {
          const month = new Date(transaction.createdAt).toLocaleString('uz-UZ', {month: 'long'});
          acc[month] = (acc[month] || 0) + parseFloat(transaction.amount);
          return acc;
        }, {});

    const labels = Object.keys(incomeData);
    const incomeValues = Object.values(incomeData);
    const outcomeValues = Object.values(outcomeData);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Kirim',
          data: incomeValues as number[],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Chiqim',
          data: outcomeValues as number[],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: 'Oylik Kirim va Chiqim',
      },
    },
  };

  return <Bar options={options} data={chartData}/>;
};