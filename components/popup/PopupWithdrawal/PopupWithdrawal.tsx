import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import PriceStep from "../../creation/ContentStep/Step3/PriceStep";
import SelectCard from "../../UI/SelectR";
import { HookOutside } from "../../../Hooks/HookOutside";
import YellowButton from "../../UI/YellowButton";
import { getBankCards } from "../../../api/bankCards";
import { IBankCard } from "../../../interface/bankCard";
import { postWithdrawals } from "../../../api/withdrawals";
import { IWithdrawals } from "../../../interface/withdrawals";
import { ICurrency } from "../../../interface/currency";
import { getMyBalance } from "../../../api/myBalance";

interface IProps {
  setOpenPopup: (active: boolean) => void;
  totalBalance: number;
  currentCurrency: ICurrency | undefined;
  openPopup: boolean;
}

const PopupWithdrawal: FC<IProps> = ({
  setOpenPopup,
  totalBalance,
  currentCurrency,
  openPopup,
}) => {
  const refPopupOutside = HookOutside(() => setOpenPopup(false));
  // const totalBalance = 171.003;
  const [balance, setBalance] = useState<number>(totalBalance);
  const [currency, setCurrency] = useState(currentCurrency);
  const [activeBtn, setActiveBtn] = useState(false);
  const [optionsCard, setOptionsCard] = useState<IBankCard[]>([]);
  const [withdrawalsData, setWithdrawalsData] = useState<IWithdrawals>({
    amount: balance,
    // currencyId: currency ? currency.id : 0,
    bankCardId: optionsCard[0]?.id,
  });

  const bodyRef = useRef(document.body);

  useEffect(() => {
    bodyRef.current.classList.toggle("modalOpen", openPopup);
    return () => {
      bodyRef.current.classList.remove("modalOpen");
    };
  }, [openPopup]);

  useEffect(() => {
    setBalance(totalBalance);
    setCurrency(currentCurrency);
  }, [totalBalance, currentCurrency]);

  useEffect(() => {
    getBankCards().then((data) => {
      if (data.success) {
        const { bankCards } = data;
        setOptionsCard(bankCards);
        const bankCardsId: number = bankCards[0].id;
        setWithdrawalsData({ ...withdrawalsData, bankCardId: bankCardsId });
      }
    });
    // const currencyId = getCookie("currencyId");
    // setWithdrawalsData({ ...withdrawalsData, currencyId: Number(currencyId) });
    getMyBalance().then((data) => {
      const { success, balance, currency } = data;
      if (success) {
        setBalance(balance);
        setCurrency(currency);
      }
    });
  }, []);

  let newWithdrawalsData = { ...withdrawalsData };
  const onChangePrice = (price: number) => {
    newWithdrawalsData.amount = price;
    setWithdrawalsData(newWithdrawalsData);
  };

  const onChangeCurrency = (currencyId: number | null) => {
    if (currencyId) {
      getMyBalance(currencyId).then((data) => {
        const { success, balance, currency } = data;
        if (success) {
          setBalance(balance);
          setCurrency(currency);
        }
      });
      // newWithdrawalsData.currencyId = currencyId;
      setWithdrawalsData(newWithdrawalsData);
    }
  };
  const onChangeSelect = (newValue: number, name: string) => {
    newWithdrawalsData.bankCardId = newValue;
    setWithdrawalsData(newWithdrawalsData);
  };
  useEffect(() => {
    if (withdrawalsData.amount > balance || withdrawalsData.amount <= 0) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }, [withdrawalsData]);

  const onSubmit = () => {
    postWithdrawals(withdrawalsData).then((data) => {
      if (data.success) {
        setOpenPopup(false);
      }
    });
  };

  return (
    <div className="overlay">
      <div className="popupWithdrawal" ref={refPopupOutside}>
        <div
          className="popupWithdrawal__close_btn"
          onClick={() => setOpenPopup(false)}
        >
          <Image
            src="/images/icons/close_popup.svg"
            width={20}
            height={20}
            alt="close button"
          />
        </div>
        <h2 className="popupWithdrawal__title">Хочете вивести кошти?</h2>
        <div className="popupWithdrawal__subtitle">
          Введіть суму та оберіть рахунок, на який виводяться кошти
        </div>
        <div className="popupWithdrawal__balance">
          <div className="popupWithdrawal__balance-title">Баланс</div>
          <div className="popupWithdrawal__balance-sum">
            {currency?.symbol} {balance}
          </div>
        </div>
        <div className="popupWithdrawal__price">
          <PriceStep
            onChange={onChangePrice}
            onChangeCurrency={onChangeCurrency}
            valueId={"UAH"}
            totalPrice={balance}
            popupWithdrawal={true}
          />
          <div className="popupWithdrawal__price-subtitle">
            *Платіжна система бере 3% від суми виводу
          </div>
        </div>
        <div className="popupWithdrawal__selectCard">
          <SelectCard
            title={"Виберіть карту"}
            placeholder={"Виберіть карту"}
            options={optionsCard}
            name={"selectCard"}
            onChange={onChangeSelect}
            valueId={withdrawalsData.bankCardId}
          />
        </div>
        <div className="popupWithdrawal__subtitle popupWithdrawal__limit ">
          *Ліміт на вивід на один рахунок - 150 тисяч гривень, протягом одного
          календарного місяця
        </div>
        <div className="popupWithdrawal__btn">
          <YellowButton
            title="вивести кошти"
            yellow={activeBtn}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default PopupWithdrawal;
