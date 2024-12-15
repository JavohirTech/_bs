import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Empty } from "../components/empty/Empty.tsx";
import { numberFormatter } from "../helpers/numberFormatter.ts";

export const ArchivedTransactionsPage = () => {
  const [archivedTransactions, setArchivedTransactions] = useState<{
    id: number;
    amount: string;
    category: string;
    subCategory: string;
    createdAt: string;
    description: string;
    type: string;
  }[]>([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);

  // Load archived transactions from localStorage on component mount
  useEffect(() => {
    const savedArchivedTransactions = JSON.parse(localStorage.getItem("archivedTransactions") || "[]");
    setArchivedTransactions(savedArchivedTransactions);
  }, []);

  const handleRecover = (id: number) => {
    const transactionToRecover = archivedTransactions.find((item) => item.id === id);
    if (transactionToRecover) {
      const currentTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      const updatedTransactions = [...currentTransactions, transactionToRecover];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

      const updatedArchivedTransactions = archivedTransactions.filter((item) => item.id !== id);
      setArchivedTransactions(updatedArchivedTransactions);
      localStorage.setItem("archivedTransactions", JSON.stringify(updatedArchivedTransactions));
    }
  };

  const handleDeleteClick = (id: number) => {
    setTransactionToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (transactionToDelete !== null) {
      const updatedArchivedTransactions = archivedTransactions.filter((item) => item.id !== transactionToDelete);
      setArchivedTransactions(updatedArchivedTransactions);
      localStorage.setItem("archivedTransactions", JSON.stringify(updatedArchivedTransactions));
      setShowDeleteModal(false);
      setTransactionToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTransactionToDelete(null);
  };

  return (
      <div className="container mx-auto my-5">
        <h3>Arxivlangan kirim-chiqimlarim</h3>

        {archivedTransactions.length === 0 ? (
            <Empty />
        ) : (
            <div className="container mt-5">
              <div className="row">
                <AnimatePresence>
                  {archivedTransactions.map((transaction) => (
                      <motion.div
                          key={transaction.id}
                          className="col-md-4 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          layout
                      >
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="card-title">Miqdor: {numberFormatter(transaction.amount, " ", "so'm")}</h5>
                              {transaction?.category === "income" ? (
                                  <span className="badge bg-success">
                            <i className="fa-sharp fa-solid fa-arrow-down"></i>
                          </span>
                              ) : (
                                  <span className="badge bg-danger">
                            <i className="fa-sharp fa-solid fa-arrow-up"></i>
                          </span>
                              )}
                            </div>

                            <h6 className="card-subtitle mb-2 text-muted">Turi: {transaction.category}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Kichik tur: {transaction.subCategory}</h6>
                            <p className="card-text">Sana: {transaction.createdAt}</p>
                            <p className="card-text">Izoh: {transaction.description}</p>

                            <div className="d-flex justify-content-between align-items-center">
                              <button
                                  className="btn btn-success text-white"
                                  onClick={() => handleRecover(transaction.id)}
                              >
                                <i className="fa-regular fa-rotate-left me-2"></i> Qayta tiklash
                              </button>
                              <button
                                  className="btn btn-danger text-white"
                                  onClick={() => handleDeleteClick(transaction.id)}
                              >
                                <i className="fa-regular fa-trash me-2"></i> O'chirish
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
        )}

        {showDeleteModal && (
            <motion.div
                className="modal fade show d-block"
                tabIndex={-1}
                role="dialog"
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">O'chirishni tasdiqlang</h5>
                    <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Siz rostdan ham bu kirim-chiqimni o'chirmoqchimisiz?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleCancelDelete}>Bekor qilish</button>
                    <button type="button" className="btn btn-danger text-white" onClick={handleConfirmDelete}>O'chirish</button>
                  </div>
                </div>
              </div>
            </motion.div>
        )}
      </div>
  );
};