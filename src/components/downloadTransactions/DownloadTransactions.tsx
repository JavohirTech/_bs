import {useNotification} from "../../context/NotificationContext.tsx";

const downloadJSON = (data: object, filename: string) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const DownloadTransactions = () => {
  const {showNotification} = useNotification();

    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  const handleDownload = () => {
    downloadJSON(transactions, 'transactions.json');
    showNotification('Muvaffaqiyatli', 'Transaksiyalar yuklandi', 'success');
  };

  return (
    <div>
      <button className="btn btn-primary text-white" disabled={transactions?.length <= 0} onClick={handleDownload}>
        <i className="fa-solid fa-arrow-down-to-line me-2"></i> Export
      </button>
    </div>
  );
};