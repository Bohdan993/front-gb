import React, { FC, useState } from "react";
import YellowButton from "../../UI/YellowButton";
import PopupEarn from "../../popup/PopupEarn";
import { PropsFromRedux } from "./index";

interface IProps extends PropsFromRedux {
  isWithdrawAvailable: boolean;
  setWithdrawAvailable: (value: boolean) => void;
}

const FinanceEarn: FC<IProps> = ({ currentPopup, openPopup, isWithdrawAvailable, setWithdrawAvailable }) => {

  const afterAddCard = () => {
    setWithdrawAvailable(true);
  };

  return (
    <>
      <div className="allFinanceReport financeEarn">
        <div className="financeEarn__title">Час заробляти </div>
        <div className="financeEarn__desc">
          Для того, щоб почати продавати, додайте реквізити для виплати.
        </div>
        <YellowButton
          yellow={true}
          title={"Додати реквізити"}
          onClick={() => openPopup("PopupEarn")}
        />
      </div>
      {currentPopup === "PopupEarn" ? <PopupEarn type="addCard" afterSubmit={afterAddCard} /> : <></>}
    </>
  );
};

export default FinanceEarn;
