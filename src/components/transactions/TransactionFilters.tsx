import {FC} from "react";

type AscDesc =  "asc" | "desc"

interface TransactionFiltersProps {
  sortOrder: string;
  setSortOrder: (value: AscDesc) => void;
  filters: {
    startDate: string;
    endDate: string;
    category: string;
    subCategory: string;
    amount: string;
  };
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleClearFilters: () => void;
  isFiltered: string;
}

export const TransactionFilters:FC<TransactionFiltersProps> = ({
                                     sortOrder,
                                     setSortOrder,
                                     filters,
                                     handleFilterChange,
                                     handleClearFilters,
                                     isFiltered
                                   }) => {
  return (
      <div className="row mt-3">
        <div className="col-12 col-md-2 mb-3">
          <label>Vaqt:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as AscDesc)} className="form-select">
            <option value="">Barchasi</option>
            <option value="asc">Yangi</option>
            <option value="desc">Eski</option>
          </select>
        </div>
        <div className="col-12 col-md-2 mb-3">
          <label>Boshlanish sanasi:</label>
          <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange}
                 className="form-control"/>
        </div>
        <div className="col-12 col-md-2 mb-3">
          <label>Tugash sanasi:</label>
          <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange}
                 className="form-control"/>
        </div>
        <div className="col-12 col-md-2 mb-3">
          <label>Turi:</label>
          <select name="category" value={filters.category} onChange={handleFilterChange} className="form-select">
            <option value="">Barchasi</option>
            <option value="income">Kirim</option>
            <option value="outcome">Chiqim</option>
          </select>
        </div>
        <div className="col-12 col-md-2 mb-3">
          <label>Kichik tur:</label>
          <select name="subCategory" value={filters.subCategory} onChange={handleFilterChange} className="form-select">
            <option value="">Barchasi</option>
            <option value="salary">Oylik</option>
            <option value="investment">Investitsiya</option>
            <option value="gift">Exson</option>
            <option value="groceries">Oziq-ovqat</option>
            <option value="rent">Ijara</option>
            <option value="utilities">Kommunal xizmatlar</option>
          </select>
        </div>
        <div className="col-12 col-md-2 mb-3">
          <label>Miqdor:</label>
          <input type="number" placeholder={"Miqdor bo'yicha qidirish"} name="amount" value={filters.amount}
                 onChange={handleFilterChange} className="form-control"/>
        </div>
        {isFiltered && (
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={handleClearFilters}>Filterni tozalash</button>
            </div>
        )}
      </div>
  );
};