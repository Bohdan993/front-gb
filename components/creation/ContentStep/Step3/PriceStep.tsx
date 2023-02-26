import { ChangeEvent, FC, useEffect, useState } from "react";
import InputCustom from "../../../UI/InputCustom";
import SelectR from "../../../UI/SelectR";
import { getCurrencies } from "../../../../api/creation";
import { IOptionsSelect } from "../../../../interface/articles.props";

interface IProps {
  onChange: (price: number) => void;
  onChangeCurrency: (currencyId: number | null) => void;
  valueId: number | "UAH";
  totalPrice: number;
  popupWithdrawal?: boolean;
}
const PriceStep3: FC<IProps> = ({
  onChange,
  onChangeCurrency,
  valueId,
  totalPrice,
  popupWithdrawal,
}) => {
  const [optionsCurrency, setOptionsCurrency] = useState<IOptionsSelect[]>([]);
  const percent = popupWithdrawal ? -3 : 15;
  const [price, setPrice] = useState<number>(totalPrice);
  const [currency, setCurrency] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const priceTotal = popupWithdrawal
    ? totalPrice
    : Math.round(totalPrice / ((100 + percent) / 100));
  useEffect(() => {
    setPrice(priceTotal);
  }, [popupWithdrawal ? priceTotal : ""]);

  useEffect(() => {
    if (price) {
      let result = (percent / 100) * price + price;
      result = Math.round(result * 100) / 100;
      setCurrentPrice(result);
    }
  }, [price]);

  useEffect(() => {
    onChange(popupWithdrawal ? price : currentPrice);
  }, [price, currentPrice]);

  useEffect(() => {
    if (valueId) {
      const currentCurrency = optionsCurrency.find(
        popupWithdrawal
          ? (options) => options.shortName === "UAH"
          : (options) => options.id === valueId
      );

      if (currentCurrency) {
        setCurrency(currentCurrency.symbol);
      }
    }
  }, [optionsCurrency, valueId]);

  const onChangeSelect = (newValue: number | null) => {
    const currentCurrency = optionsCurrency.find(
      (options) => options.id === newValue
    );
    onChangeCurrency(newValue);
    currentCurrency &&
      currentCurrency.title &&
      setCurrency(currentCurrency.title);
  };
  useEffect(() => {
    getCurrencies().then((data) => {
      setOptionsCurrency([{id:0 ,title:"", symbol:""}, ...data]);
    });
  }, []);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target && event.target.value);

    setPrice(Number(value));
  };

  return (
    <div className="priceStep">
      <div className="priceStep__price ">
        <span className="priceStep__price_title">
          {popupWithdrawal ? "Сума виводу" : "Ваша ціна"}
        </span>
        <div className="priceStep__price_price">
          <InputCustom
            name="price"
            type="number"
            onChange={onChangeInput}
            value={price.toString()}
          />
          <SelectR
            title=""
            placeholder=""
            options={optionsCurrency}
            name="currency"
            onChange={onChangeSelect}
            valueId={valueId}
          />
        </div>
      </div>
      {popupWithdrawal ? (
        <></>
      ) : (
        <div className="priceStep__commission ">
          <span className="priceStep__commission_title">Комісія getbase</span>
          <div className="priceStep__commission_totalCommission">
            + {percent}%
          </div>
        </div>
      )}
      {popupWithdrawal ? (
        <></>
      ) : (
        <div className="priceStep__commission_sum ">=</div>
      )}

      <div className="priceStep__finalPrice ">
        <span className="priceStep__finalPrice_title">
          {popupWithdrawal ? "Ви отримаєте" : "Ціна клієнта"}
        </span>
        <div className="priceStep__finalPrice_total">
          <div className="priceStep__finalPrice_total_currentPrise">
            {currentPrice}
          </div>
          <div className="priceStep__finalPrice_total_currency">{currency}</div>
        </div>
      </div>
    </div>
  );
};

export default PriceStep3;
