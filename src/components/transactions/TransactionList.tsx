import {numberFormatter} from "../../helpers/numberFormatter.ts";

export const TransactionList = ({transactions, handleEdit, handleDelete}) => {
  return (
      <div className="row">
        {transactions.map((transaction) => (
            <div key={transaction.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className={"d-flex justify-content-between align-items-center"}>
                    <h5 className="card-title">Miqdor: {numberFormatter(transaction.amount, " ", "so'm")}</h5>
                    {transaction?.category === "income" ?
                        <span className="badge bg-success">
                    <i className="fa-sharp fa-solid fa-arrow-down"></i>
                  </span> :
                        <span className="badge bg-danger">
                    <i className="fa-sharp fa-solid fa-arrow-up"></i>
                  </span>}
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted">Kategoriya: {transaction.category}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Kichik kategoriya: {transaction.subCategory}</h6>
                  <p className="card-text">Sana: {transaction.createdAt}</p>
                  <p className="card-text">Izoh: {transaction.description}</p>
                  <p className="card-text">Konvertatsiya qilingan
                    miqdor: {transaction.convertedAmount} {transaction.currency}</p>
                  <div className={"d-flex justify-content-between align-items-center align-self-end"}>
                    <button className="btn btn-primary text-white" onClick={() => handleEdit(transaction.id)}>
                      <i className="fa-regular fa-pen-to-square me-2"></i>
                      Tahrirlash
                    </button>
                    <button className="btn btn-danger text-white" onClick={() => handleDelete(transaction.id)}>
                      <i className="fa-regular fa-trash me-2"></i>
                      O'chirish
                    </button>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
  );
};