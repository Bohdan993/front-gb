import { ChangeEvent, FC, useEffect, useState } from "react";
import { PropsFromRedux } from "./index";
import LoadImages from "../../UI/LoadImages";
import InputCustom from "../../UI/InputCustom";
import { postUserChangeData } from "../../../api/user";

const StepsBecomeExpert: FC<PropsFromRedux> = ({
  expertData,
  setExpert,
  setActive,
  currentActive,
}) => {
  const [dataExpert, setDataExpert] = useState(expertData);
  useEffect(() => {
    setDataExpert(expertData);
  }, [expertData]);
  useEffect(() => {
    dataExpert &&
    dataExpert.avatar_id &&
    dataExpert.avatar_id !== "" &&
    dataExpert.name &&
    dataExpert.name !== "" &&
    dataExpert.specialization &&
    dataExpert.specialization !== "" &&
    dataExpert.description &&
    dataExpert.description !== ""
      ? setActive((currentActive = true))
      : setActive((currentActive = false));
  }, [dataExpert]);

  const onChangerInput = (
    event: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const newData = {
      ...expertData,
      [name]: event.target && event.target.value,
    };
    dataExpert[name] = event.target && event.target.value;
    setExpert(newData);
    dataExpert.avatar_id &&
    dataExpert.avatar_id !== "" &&
    dataExpert.name &&
    dataExpert.name !== "" &&
    dataExpert.specialization &&
    dataExpert.specialization !== "" &&
    dataExpert.description &&
    dataExpert.description !== ""
      ? setActive((currentActive = true))
      : setActive((currentActive = false));
  };

  const onBlurInput = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    let newData = { ...dataExpert };
    (newData[name] = event.target && event.target.value),
      postUserChangeData(newData).then();
  };
  return (
    <div className="stepsBecomeExpert">
      <h2>Додай дані про себе, щоб створити перший товар</h2>
      <LoadImages expertData={dataExpert} setExpert={setExpert} />
      <div className="stepsBecomeExpert_inputs">
        {dataExpert && dataExpert.avatar_id && (
          <InputCustom
            onChange={onChangerInput}
            onBlur={onBlurInput}
            name="name"
            title="Iм’я"
            value={dataExpert.name}
            type={"text"}
          />
        )}
        {dataExpert && dataExpert.name && (
          <InputCustom
            onChange={onChangerInput}
            onBlur={onBlurInput}
            name="specialization"
            title="Спеціалізація"
            value={dataExpert.specialization}
            type={"text"}
          />
        )}
        {dataExpert && dataExpert.specialization && (
          <InputCustom
            onChange={onChangerInput}
            onBlur={onBlurInput}
            name="description"
            title="Опис"
            value={dataExpert.description}
            type={"text"}
          />
        )}
      </div>
    </div>
  );
};

export default StepsBecomeExpert;
