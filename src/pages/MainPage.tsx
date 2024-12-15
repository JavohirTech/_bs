import {LineChart} from "../components/lineChart/LineChart.tsx";
import {useEffect, useState} from "react";
import {numberFormatter} from "../helpers/numberFormatter.ts";
import {EmptyTransactions} from "../components/emptyTransactions/EmptyTransactions.tsx";

export const MainPage = () => {
  const [transactions, setTransactions] = useState<{
    id: number;
    amount: string;
    category: string;
    subCategory: string;
    createdAt: string;
    description: string;
    type: string;
  }[]>([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(savedTransactions);
  }, []);

  const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const incomeTransactions = sortedTransactions.filter(transaction => transaction.category === "income");
  const outcomeTransactions = sortedTransactions.filter(transaction => transaction.category === "outcome");

  const totalIncome = incomeTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
  const totalOutcome = outcomeTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const currentMonth = new Date().getMonth();
  const monthlyOutcome = outcomeTransactions
      .filter(transaction => new Date(transaction.createdAt).getMonth() === currentMonth)
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const highestOutcome = outcomeTransactions.reduce((max, transaction) => Math.max(max, parseFloat(transaction.amount)), 0);

  return (
      <div className="container my-5">
        {transactions?.length > 0 ? <>
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-md-3">
              <div
                  className="border border-success rounded-4 p-3 text-center h-100 d-flex flex-column justify-content-center">
                <p className="my-0 p-0">Jami kirim</p>
                <h1 className="text-success">{numberFormatter(totalIncome.toString(), " ", "so'm")}</h1>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div
                  className="border border-danger rounded-4 p-3 text-center h-100 d-flex flex-column justify-content-center">
                <p className="my-0 p-0">Jami chiqim</p>
                <h1 className="text-danger">{numberFormatter(totalOutcome.toString(), " ", "so'm")}</h1>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div
                  className="border border-info rounded-4 p-3 text-center h-100 d-flex flex-column justify-content-center">
                <p className="my-0 p-0">Oylik chiqim</p>
                <h1 className="text-info">{numberFormatter(monthlyOutcome.toString(), " ", "so'm")}</h1>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div
                  className="border border-warning rounded-4 p-3 text-center h-100 d-flex flex-column justify-content-center">
                <p className="my-0 p-0">Eng ko'p chiqim</p>
                <h1 className="text-warning">{numberFormatter(highestOutcome.toString(), " ", "so'm")}</h1>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-4">
            <div className="col-12 col-md-6">
              <div className="rounded-4 bg-gradient-success p-4 h-100 overflow-auto" style={{maxHeight: "40vh"}}>
                <h4>Kirimlarim</h4>
                {incomeTransactions.length > 0 ? incomeTransactions.map(transaction => (
                    <div key={transaction.id} className="mb-3 border-bottom pb-2">
                      <p className="mb-1"><strong>Miqdor:</strong> {numberFormatter(transaction.amount, " ", "so'm")}
                      </p>
                      <p className="mb-1"><strong>Tur:</strong> {transaction.category}</p>
                      <p className="mb-1"><strong>Kichik tur:</strong> {transaction.subCategory}</p>
                      <p className="mb-1"><strong>Sana:</strong> {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mb-1"><strong>Izoh:</strong> {transaction.description}</p>
                    </div>
                )) : <div>
                  <p className="text-white">Kirimlar mavjud emas</p>
                </div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="rounded-4 bg-gradient-secondary p-4 h-100 overflow-auto" style={{maxHeight: "40vh"}}>
                <h4>Chiqimlarim</h4>
                {outcomeTransactions.length > 0 ? outcomeTransactions.map(transaction => (
                    <div key={transaction.id} className="mb-3 border-bottom pb-2">
                      <p className="mb-1"><strong>Chiqim:</strong> {numberFormatter(transaction.amount, " ", "so'm")}
                      </p>
                      <p className="mb-1"><strong>Tur:</strong> {transaction.category}</p>
                      <p className="mb-1"><strong>Kichik tur:</strong> {transaction.subCategory}</p>
                      <p className="mb-1"><strong>Sana:</strong> {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mb-1"><strong>Izoh:</strong> {transaction.description}</p>
                    </div>
                )) : <div>
                  <p className="text-white">Kirimlar mavjud emas</p>
                </div>}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="card rounded-4 p-4">
                <LineChart/>
              </div>
            </div>
          </div>
        </> : <EmptyTransactions/>}
      </div>
  );
};
