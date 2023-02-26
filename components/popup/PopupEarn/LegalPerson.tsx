import React, { FC, useState } from "react";
import InputCustom from "../../UI/InputCustom";
import { IPersonData } from "./PopupEarn";

interface IProps {
  submit: (submitData: IPersonData) => void;
  personData: IPersonData;
}
const LegalPerson: FC<IProps> = ({ submit, personData }) => {
  const { name, inn, mfo, iban } = personData;
  const [legalData, setLegalData] = useState({
    name: name,
    inn: inn,
    mfo: mfo,
    iban: iban,
  });
  const onBlur = () => {
    submit(legalData);
  };

  return (
    <div className="legalPerson">
      <InputCustom
        type={"text"}
        title={"Назва отримувача"}
        placeholder={"Назва отримувача"}
        name={"name"}
        value={legalData.name}
        onChange={(e) => setLegalData({ ...legalData, name: e.target.value })}
        onBlur={onBlur}
      />
      <div className="legalPerson__wrapperInput">
        <InputCustom
          type={"text"}
          title={"Єрдпоу/Інн"}
          placeholder={"12345678"}
          name={"inn"}
          value={legalData.inn}
          onChange={(e) => setLegalData({ ...legalData, inn: e.target.value })}
          onBlur={onBlur}
        />
        <InputCustom
          type={"text"}
          title={"МФО"}
          placeholder={"123456"}
          name={"mfo"}
          value={legalData.mfo}
          onChange={(e) => setLegalData({ ...legalData, mfo: e.target.value })}
          onBlur={onBlur}
        />
      </div>
      <InputCustom
        type={"text"}
        title={"IBAN"}
        placeholder={"IBAN"}
        name={"iban"}
        value={legalData.iban}
        onChange={(e) => setLegalData({ ...legalData, iban: e.target.value })}
        onBlur={onBlur}
      />
    </div>
  );
};

export default LegalPerson;
