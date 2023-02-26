import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ICurrency } from "../../../interface/currency";
import { setCookie } from "../../../api/cookies";

interface ICurrencies {
  currencies: ICurrency[];
}

const CurrencySelector = ({ currencies }: ICurrencies) => {
  const [activeCurrency, setActiveCurrency] = useState<ICurrency | undefined>(
    currencies[0]
  );
  const router = useRouter();

  const selectCurrency = (currency: ICurrency) => {
    setActiveCurrency(currency);
    router.reload();
  };
  useEffect(() => {
    setActiveCurrency(currencies[0]);
  }, [currencies]);

  useEffect(() => {
    if (activeCurrency) {
      localStorage.setItem("currency", JSON.stringify(activeCurrency));
      setCookie("currencyId", JSON.stringify(activeCurrency.id));
    }
  }, [activeCurrency]);

  useEffect(() => {
    const currency = JSON.parse(localStorage.getItem("currency") || "{}");

    setActiveCurrency(
      currencies.find(({ id }: ICurrency) => id === (currency && currency.id))
    );
  }, [currencies]);

  return (
    <>
      <div className="row currency">
        {currencies.map((currency: any) => (
          <div
            className={`col-xs-12 col-md-4 col-lg-3 col-xxl-3 currency__item ${
              activeCurrency == currency ? "active" : ""
            }`}
            key={currency.id}
            onClick={() => selectCurrency(currency)}
          >
            <span className="">{currency.shortName}</span>
            <span className="currency__item_name">{currency.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};
export default CurrencySelector;
