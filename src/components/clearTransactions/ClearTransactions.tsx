import {useState, useEffect} from 'react';
import {useNotification} from "../../context/NotificationContext.tsx";

export const ClearTransactions = () => {
  const {showNotification} = useNotification();
  const [_, setShowModal] = useState(false);
  const transactions = localStorage.getItem('transactions');

  const handleClear = () => {
    localStorage.removeItem('transactions');
    showNotification('Muvaffaqiyatli', 'Transaksiyalar tozalandi', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleConfirmClear = () => {
    handleClear();
    handleCloseModal();
  };

  useEffect(() => {
    const modalElement = document.getElementById('clearTransactionsModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', handleCloseModal);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener('hidden.bs.modal', handleCloseModal);
      }
    };
  }, []);

  return (
      <>
        <button className="btn btn-danger text-white" disabled={!transactions || transactions.length === 0}
                onClick={handleShowModal} data-bs-toggle="modal"
                data-bs-target="#clearTransactionsModal">
          <i className="fa-solid fa-trash me-2"></i> Tozalash
        </button>

        <div className="modal fade" id="clearTransactionsModal" tabIndex={-1}
             aria-labelledby="clearTransactionsModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="clearTransactionsModalLabel">
                  Transaksiyalarni tozalash
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Transaksiyalar tozalanadi. Ishonchingiz komilmi?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Bekor qilish
                </button>
                <button type="button" className="btn btn-danger text-white" data-bs-dismiss="modal"
                        onClick={handleConfirmClear}>Tozalash
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};