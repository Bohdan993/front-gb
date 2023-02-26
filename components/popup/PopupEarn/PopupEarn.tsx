import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import PhysicalPerson from "./PhysicalPerson";
import InputCheckbox from "../../UI/InputCheckbox";
import YellowButton from "../../UI/YellowButton";
import LegalPerson from "./LegalPerson";
import { HookOutside } from "../../../Hooks/HookOutside";
import { IBankCard } from "../../../interface/bankCard";
import { patchBankCards, postBankCards } from "../../../api/bankCards";
import { PropsFromRedux } from "./index";

interface IPersonArr {
  id: number;
  type: "Physical" | "Legal";
  icon: string;
  title: string;
}

interface IProps extends PropsFromRedux {
  bankCard?: IBankCard;
  afterSubmit?: () => void;
  type: string;
}
export interface IPersonData {
  name?: string;
  cardNumber?: string;
  inn?: string;
  mfo?: string;
  iban?: string;
}

const PopupEarn: FC<IProps> = ({
  closePopup,
  bankCard,
  type,
  currentPopup,
  afterSubmit
}) => {
  const [isPerson, setIsPerson] = useState<"Physical" | "Legal">("Physical");
  const [personData, setPersonData] = useState<IPersonData>({});
  const [checkOffer, setCheckOffer] = useState<boolean>(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const activePerson = (type: "Physical" | "Legal") => {
    setIsPerson(type);
  };
  const refPopupOutside = HookOutside(closePopup);

  const submit = (submitData: IPersonData) => {
    setPersonData(submitData);
  };
  const bodyRef = useRef(document.body);

  useEffect(() => {
    bodyRef.current.classList.toggle("modalOpen", currentPopup === "PopupEarn");
    return () => {
      bodyRef.current.classList.remove("modalOpen");
    };
  }, [currentPopup]);

  useEffect(() => {
    if (bankCard) {
      const newPersonData = { ...personData };
      newPersonData.name = bankCard.name;
      newPersonData.cardNumber = bankCard.cardNumber.toString();
      setPersonData(newPersonData);
    }
  }, []);

  useEffect(() => {
    if (isPerson === "Physical") {
      if (
        checkOffer &&
        personData.name &&
        personData.cardNumber &&
        personData.cardNumber.length > 15
      ) {
        setIsActiveBtn(true);
      } else {
        setIsActiveBtn(false);
      }
    } else {
      if (
        checkOffer &&
        personData.name &&
        personData.inn &&
        personData.mfo &&
        personData.iban
      ) {
        setIsActiveBtn(true);
      } else {
        setIsActiveBtn(false);
      }
    }
  }, [isPerson, personData, checkOffer]);

  const submitForm = () => {
    if (type === "editCard") {
      if (bankCard && bankCard.id) {
        patchBankCards(bankCard.id, personData).then((data) => {
          if (data.success) {
            closePopup();
            // router.reload;
          }
        });
      }
    } else if (type === "addCard") {
      postBankCards(personData).then((data) => {
        if (data.success) {
          closePopup();
          afterSubmit && afterSubmit();
        }
      });
    }
  };

  return (
    <div className={"overlay"}>
      <div className="popupEarn" ref={refPopupOutside}>
        <div className="popupEarn__close_btn" onClick={closePopup}>
          <Image
            src="/images/icons/close_popup.svg"
            width={20}
            height={20}
            alt="close button"
          />
        </div>
        <div className="popupEarn__title">Дані для отримання грошей</div>
        {/*<div className="popupEarn__subtitle">Оберіть тип отримувача</div>*/}
        {/*<div className="popupEarn__wrapperBtn">*/}
        {/*  <div className="popupEarn__personBtn">*/}
        {/*    {personArr.map((item) => (*/}
        {/*      <div*/}
        {/*        className={*/}
        {/*          isPerson === item.type*/}
        {/*            ? "popupEarn__person popupEarn__person_active"*/}
        {/*            : "popupEarn__person"*/}
        {/*        }*/}
        {/*        key={item.id}*/}
        {/*        onClick={() => activePerson(item.type)}*/}
        {/*      >*/}
        {/*        <Image*/}
        {/*          className={"popupEarn__person_img"}*/}
        {/*          src={item.icon}*/}
        {/*          width={36}*/}
        {/*          height={36}*/}
        {/*          alt="close button"*/}
        {/*        />*/}
        {/*        <div className="popupEarn__person_title">{item.title}</div>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="popupEarn__cartPerson">
          {isPerson === "Physical" && (
            <PhysicalPerson submit={submit} personData={personData} />
          )}
          {isPerson === "Legal" && (
            <LegalPerson submit={submit} personData={personData} />
          )}
        </div>

        <div className="popupEarn__checkbox">
          <InputCheckbox check={checkOffer} setCheck={setCheckOffer} />
        </div>
        <div className="popupEarn__btn">
          <YellowButton
            yellow={isActiveBtn}
            title={"Прив’язати карту"}
            onClick={submitForm}
          />
        </div>
      </div>
    </div>
  );
};

export default PopupEarn;
