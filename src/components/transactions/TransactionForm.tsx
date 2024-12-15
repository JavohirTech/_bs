import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TransactionForm = ({ formData, handleInputChange, handleFormSubmit, setIsModalOpen, exchangesData }) => {
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const exchangeRate = exchangesData ? exchangesData[formData.currency] : 1;
    setConvertedAmount(parseFloat(formData.amount) * exchangeRate);
  }, [formData.amount, formData.currency, exchangesData]);

  return (
    <motion.div
      className={`modal fade show`}
      style={{ display: 'block' }}
      tabIndex={-1}
      role="dialog"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{formData.id ? "Kirim-chiqimni tahrirlash" : "Kirim-chiqim qo'shish"}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)} aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group mb-3">
                <label>Miqdor (UZS)</label>
                <input
                    type="number"
                    name="amount"
                    placeholder={"Miqdor kiriting"}
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                />
              </div>
              <div className="form-group mb-3">
                <label>Valyuta</label>
                <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="form-control"
                >
                  {exchangesData && Object.keys(exchangesData).map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Konvertatsiya qilingan miqdor</label>
                <input
                    type="text"
                    value={convertedAmount ? convertedAmount.toFixed(2) : 0}
                    className="form-control"
                    readOnly
                />
              </div>
              <div className="form-group mb-3">
                <label>Kategoriya</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-control"
                >
                  <option value="income">Kirim</option>
                  <option value="outcome">Chiqim</option>
                </select>
              </div>

              {formData.category === "income" && (
                  <div className="form-group mb-3">
                    <label>Kirim manbasi</label>
                    <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    >
                      <option value="">Manbani tanlang</option>
                      <option value="salary">Oylik</option>
                      <option value="investment">Investitsiya</option>
                      <option value="gift">Exson</option>
                    </select>
                  </div>
              )}

              {formData.category === "outcome" && (
                  <div className="form-group mb-3">
                    <label>Chiqim manzili</label>
                    <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    >
                      <option value="">Manzilni tanlang</option>
                      <option value="groceries">Oziq-ovqat</option>
                      <option value="rent">Ijara</option>
                      <option value="utilities">Kommunal xizmatlar</option>
                    </select>
                  </div>
              )}

              <div className="form-group mb-3">
                <label>Izoh</label>
                <textarea
                    placeholder={"Izoh kiriting"}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                ></textarea>
              </div>

              <div className="form-group mb-3">
                <label>Sana</label>
                <input
                    type="date"
                    name="createdAt"
                    value={formData.createdAt}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                />
              </div>

              <div className={"text-end"}>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setIsModalOpen(false)}
                >
                  Bekor qilish
                </button>

                <button type="submit" className="ms-2 btn btn-primary text-white">
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};