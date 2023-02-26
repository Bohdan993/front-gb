import React, { ChangeEvent, FC, useEffect, useState } from "react";
import InputCustom from "../../UI/InputCustom";
import { IPersonData } from "./PopupEarn";

const inputArr = [
  { id: 1, type: "text", placeholder: "0000", name: "bank" },
  { id: 2, type: "text", placeholder: "0000", name: "bank" },
  { id: 3, type: "text", placeholder: "0000", name: "bank" },
  { id: 4, type: "text", placeholder: "0000", name: "bank" },
];
interface IProps {
  submit: (submitData: IPersonData) => void;
  personData: IPersonData;
}
const PhysicalPerson: FC<IProps> = ({ submit, personData }) => {
  const { name, cardNumber } = personData;
  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({
    bank1: "",
    bank2: "",
    bank3: "",
    bank4: "",
  });
  const [inputName, setInputName] = useState("");
  const [focusedField, setFocusedField] = useState(0);
  let newObj = {};
  useEffect(() => {
    if (cardNumber) {
      const parts = String(cardNumber).split("");
      for (let i = 0; i < 4; i++) {
        newObj = {
          ...newObj,
          [`bank${i + 1}`]: parts.slice(i * 4, (i + 1) * 4).join(""),
        };
      }
    }
  }, [personData]);

  useEffect(() => {
    setInputValue(newObj);
    setInputName(name ? name : "");
  }, [personData]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    let value = e.target.value;
    if (value.length === 4) {
      focusedField < 4 && setFocusedField(focusedField + 1);
    } else if (value.length === 0) {
      focusedField > 1 && setFocusedField(focusedField - 1);
    }
    setInputValue({ ...inputValue, [name]: value });
  };
  const onBlur = () => {
    submit({ name: inputName, cardNumber: Object.values(inputValue).join("") });
  };

  return (
    <div className={"physicalPerson"}>
      <InputCustom
        type={"text"}
        title={"Ім’я"}
        placeholder={"ПІБ тримача карти"}
        name={"name"}
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
        onBlur={onBlur}
      />
      <div className="physicalPerson__card">
        <div className="physicalPerson__titleCard inputCustom__title">
          <span>Номер карти</span>
        </div>
        <div className="physicalPerson__wrapperCard">
          {inputArr.map((input) => (
            <InputCustom
              key={input.id}
              type={input.type}
              title={""}
              placeholder={input.placeholder}
              name={input.name + input.id}
              onChange={handleInput}
              value={inputValue[input.name + input.id]}
              focus={focusedField === input.id}
              onFocus={() => setFocusedField(input.id)}
              onBlur={onBlur}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhysicalPerson;
