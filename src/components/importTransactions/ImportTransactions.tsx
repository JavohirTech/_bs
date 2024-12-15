import React from 'react';
import {useNotification} from "../../context/NotificationContext.tsx";

export const ImportTransactions = () => {
  const {showNotification} = useNotification();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          try {
            const transactions = JSON.parse(event.target.result as string);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            showNotification('Muvaffaqiyatli', 'Transaksiyalar import qilindi', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 3000)
          } catch (error) {
            showNotification('Xatolik', 'Transaksiyalar import qilishda xatolik', "error");
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
      <div>
        <input id="importFile" type="file" hidden accept=".json" onChange={handleFileUpload}/>
        <label htmlFor="importFile" className="btn text-white btn-info">
          <i className="fa-solid fa-arrow-up-to-line me-2"></i> Import
        </label>
      </div>
  );
};
