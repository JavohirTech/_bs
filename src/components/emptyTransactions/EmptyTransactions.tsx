import React from 'react';

export const EmptyTransactions = () => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          try {
            const transactions = JSON.parse(event.target.result as string);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            window.location.reload();
          } catch (error) {
            console.error('Error importing transactions:', error);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
      <div className="text-center d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
        <div>
          <img src={"/notFound.svg"} className={"img-fluid w-25"}/>
          <p className={"py-3"}>Transaksiyalar topilmadi!. Lokaldan yuklang</p>
          <input id="importFile" type="file" hidden accept=".json" onChange={handleFileUpload}/>
          <label htmlFor="importFile" className="btn text-white btn-info">
            <i className="fa-solid fa-arrow-up-to-line me-3"></i>
            Import transaksiyalar
          </label>
        </div>
      </div>
  );
};