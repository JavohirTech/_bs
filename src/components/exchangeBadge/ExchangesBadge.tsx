import  {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getExchanges} from "../../services/exchangesSvc.ts";
import {queryCacheOptions} from "../../mock/cacheOptions.ts";

export const ExchangesBadge = () => {
  const { data: exchangesData, isLoading, isError } = useQuery("getExchanges", getExchanges, {...queryCacheOptions});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!exchangesData) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
          prevIndex + 1 >= Object.keys(exchangesData).length ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [exchangesData]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load exchange rates</div>;

  const currencyEntries = Object.entries(exchangesData);
  const [currentCurrency, currentRate] = currencyEntries[currentIndex] || [];

  return (
      <div className={"d-flex align-items-center gap-3"} style={{width: "200px"}}>
        <span>1 UZS:</span>
        {currentCurrency && (
            <div className={"badge bg-secondary"}>
              <strong>{currentCurrency}:</strong> {currentRate?.toString() ?? 0}
            </div>
        )}
      </div>
  );
};
