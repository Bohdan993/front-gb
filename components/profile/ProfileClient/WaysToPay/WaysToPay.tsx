import React, { FC, useEffect, useState } from "react";
import { PropsFromRedux } from "./index";
import PopupEarn from "../../../popup/PopupEarn";
import { deleteBankCards, getBankCards } from "../../../../api/bankCards";
import { IBankCard } from "../../../../interface/bankCard";
import BankCard from "./BankCard";
import YellowButton from "../../../UI/YellowButton";

const WaysToPay: FC<PropsFromRedux> = ({ currentPopup, openPopup }) => {
  const [bankCards, setBankCards] = useState<IBankCard[]>([]);
  let newRequisites = [...bankCards];
  const deleteRequisites = (index: number, id: number) => {
    deleteBankCards(id).then((data) => {
      if (data.success) {
        newRequisites.splice(index, 1);
        setBankCards(newRequisites);
      }
    });
  };
  useEffect(() => {
    getBankCards().then((data) => {
      if (data.success) {
        const { bankCards } = data;
        setBankCards(bankCards);
      }
    });
  }, [currentPopup]);

  return (
    <div className="createLessons waysToPay">
      <h2 className="waysToPay__title">Способи оплати</h2>

      {bankCards.map((bankCard, index) => (
        <div className="waysToPay__item" key={bankCard.id}>
          <BankCard
            index={index}
            bankCard={bankCard}
            deleteRequisites={() => deleteRequisites(index, bankCard.id)}
          />
          {currentPopup === `PopupEarn${index}` ? (
            <PopupEarn bankCard={bankCard} type="editCard" />
          ) : (
            <></>
          )}
        </div>
      ))}
      <div className="waysToPay__addCard">
        <YellowButton
          yellow={true}
          title={"Додати спосіб"}
          onClick={() => openPopup("PopupEarn")}
        />
      </div>
      {currentPopup === "PopupEarn" ? <PopupEarn type="addCard" /> : <></>}
    </div>
  );
};

export default WaysToPay;
