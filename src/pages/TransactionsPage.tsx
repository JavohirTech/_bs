import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Empty} from '../components/empty/Empty';
import {useQuery} from "react-query";
import {getExchanges} from "../services/exchangesSvc.ts";
import {queryCacheOptions} from "../mock/cacheOptions.ts";
import {TransactionList} from "../components/transactions/TransactionList.tsx";
import {TransactionFilters} from "../components/transactions/TransactionFilters.tsx";
import {TransactionForm} from "../components/transactions/TransactionForm.tsx";

export interface Transaction {
  id: number;
  amount: string;
  category: string;
  subCategory: string;
  createdAt: string;
  description: string;
  type: string;
  currency: string;
  convertedAmount?: number | undefined;
}

export const TransactionsPage = () => {
  const {data: exchangesData} = useQuery("getExchanges", getExchanges, {...queryCacheOptions});

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Transaction>>({
    id: 0,
    amount: "",
    category: "",
    subCategory: "",
    createdAt: "",
    description: "",
    type: "income",
    currency: "UZS",
    convertedAmount: 0,
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    subCategory: "",
    amount: ""
  });

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(savedTransactions);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "category" && {subCategory: ""}),
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      category: "",
      subCategory: "",
      amount: ""
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const exchangeRate = exchangesData?.[formData.currency!] ?? 1;
    const convertedAmount = parseFloat(formData.amount || "0") * exchangeRate;

    if (formData.id) {
      const updatedTransactions = transactions.map((transaction) =>
          transaction.id === formData.id
              ? {
                ...transaction,
                ...formData,
                id: transaction.id,
                convertedAmount,
                amount: formData.amount || transaction.amount,
                category: formData.category || transaction.category,
                subCategory: formData.subCategory || transaction.subCategory,
                createdAt: formData.createdAt || transaction.createdAt,
                description: formData.description || transaction.description,
                type: formData.type || transaction.type,
                currency: formData.currency || transaction.currency
              }
              : transaction
      ) as Transaction[];

      setTransactions(updatedTransactions);
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    } else {
      const newTransaction: Transaction = {
        id: Date.now(),
        convertedAmount,
        amount: formData.amount || "",
        category: formData.category || "income",
        subCategory: formData.subCategory || "",
        createdAt: formData.createdAt || new Date().toISOString(),
        description: formData.description || "",
        type: formData.type || "income",
        currency: formData.currency || "UZS"
      };

      const updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    }

    setIsModalOpen(false);
    setFormData({
      id: 0,
      amount: "",
      category: "",
      subCategory: "",
      createdAt: "",
      description: "",
      type: "income",
      currency: "UZS",
      convertedAmount: 0,
    });
  };

  const handleEdit = (id: number) => {
    const transactionToEdit = transactions.find((item) => item.id === id);
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const transactionToArchive = transactions.find((item) => item.id === id);
    if (transactionToArchive) {
      const archivedTransactions = JSON.parse(localStorage.getItem("archivedTransactions") || "[]");
      const updatedArchivedTransactions = [...archivedTransactions, transactionToArchive];
      localStorage.setItem("archivedTransactions", JSON.stringify(updatedArchivedTransactions));
    }
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const filteredTransactions = transactions
      .filter(transaction =>
          (!filters.startDate || new Date(transaction.createdAt) >= new Date(filters.startDate)) &&
          (!filters.endDate || new Date(transaction.createdAt) <= new Date(filters.endDate)) &&
          (!filters.category || transaction.category === filters.category) &&
          (!filters.subCategory || transaction.subCategory === filters.subCategory) &&
          (!filters.amount || transaction.amount === filters.amount)
      )
      .sort((a, b) => sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

  const isFiltered = filters.startDate || filters.endDate || filters.category || filters.subCategory || filters.amount;

  return (
      <div className="container mx-auto my-5">
        <div className="d-flex justify-content-between">
          <h3>Kirim-chiqimlarim</h3>
          <button
              className="btn btn-primary text-white"
              onClick={() => {
                setFormData({
                  id: 0,
                  amount: "",
                  category: "",
                  subCategory: "",
                  createdAt: "",
                  description: "",
                  type: "income",
                  currency: "UZS",
                  convertedAmount: 0,
                });
                setIsModalOpen(true);
              }}
          >
            <i className="fa-duotone fa-regular fa-plus"></i> Qo'shish
          </button>
        </div>

        <TransactionFilters
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleClearFilters={handleClearFilters}
            isFiltered={isFiltered}
        />

        <div className="container mt-5">
          {filteredTransactions.length === 0 ? (
              <Empty/>
          ) : (
              <TransactionList
                  transactions={filteredTransactions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
              />
          )}
        </div>

        {isModalOpen && (
            <TransactionForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
                setIsModalOpen={setIsModalOpen}
                exchangesData={exchangesData}
            />
        )}
      </div>
  );
};