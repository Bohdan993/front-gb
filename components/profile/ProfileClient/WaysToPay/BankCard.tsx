import React, { FC } from "react";
import BlueButton from "../../../UI/BlueButton";
import { IBankCard } from "../../../../interface/bankCard";
import { IPopupProps } from "../../../../store/popup/popup.props";
import { connect, ConnectedProps } from "react-redux";

interface IProps extends PropsFromRedux {
  bankCard: IBankCard;
  deleteRequisites: () => void;
  index: number;
}

const BankCard: FC<IProps> = ({
  bankCard,
  deleteRequisites,
  openPopup,
  index,
}) => {
  const type =
      bankCard.type === "personal" ? "Фізична особа" : "Юридична особа",
    cardTitle = bankCard.title;

  return (
    <>
      <div className="requisites">
        <div className="requisites__wrapper">
          <h2 className="requisites__title">{type}</h2>
          <div className="requisites__data">
            <div className="requisites__card">{cardTitle}</div>
            {/*<div className="requisites__dot" />*/}
            {/*<div className="requisites__name">{name}</div>*/}
          </div>
        </div>
        <div className="requisites__wrapperBtn">
          <BlueButton
            title="оновити"
            onClick={() => openPopup(`PopupEarn${index}`)}
          />
          <BlueButton title="видалити" onClick={deleteRequisites} />
        </div>
      </div>
      {/*{currentPopup === "PopupEarn" ? (*/}
      {/*  <PopupEarn requisites={bankCard} type="editCard" />*/}
      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}
    </>
  );
};

const mapState = ({ popup }: { popup: IPopupProps }) => {
  const { currentPopup } = popup;
  return {
    currentPopup,
  };
};
const mapDispatch = {
  openPopup: (currentPopup: string) => ({ type: "OPEN_POPUP", currentPopup }),
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(BankCard);
