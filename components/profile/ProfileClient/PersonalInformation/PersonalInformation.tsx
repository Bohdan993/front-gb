import { ChangeEvent, FC } from "react";
import { PropsFromRedux } from "./index";
import LoadImages from "../../../UI/LoadImages";
import InputCustom from "../../../UI/InputCustom";
import YellowButton from "../../../UI/YellowButton";
import { postUserChangeData } from "../../../../api/user";

const inputs = [
  { id: 1, name: "name", title: "Iм’я", type: "text" },
  { id: 2, name: "specialization", title: "Спеціалізація", type: "text" },
  {
    id: 3,
    name: "description",
    title: "Опис",
    type: "text",
  },
];

const PersonalInformation: FC<PropsFromRedux> = ({ expertData, setExpert }) => {
  const onClick = () => {
    postUserChangeData(expertData).then();
  };
  let newData = { ...expertData };
  const onChangerInput = (
    event: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    newData[name] = event.target && event.target.value;
    setExpert(newData);
    localStorage.setItem("user", JSON.stringify(newData));
  };
  return (
    <div className="personalInformation">
      <h2>Особиста інформація</h2>
      <LoadImages expertData={expertData} setExpert={setExpert} />
      <div className="personalInformation__inputs">
        {inputs.map((input) => (
          <InputCustom
            id={input.name}
            key={input.id}
            name={input.name}
            title={input.title}
            onChange={onChangerInput}
            value={expertData[input.name]}
            type={input.type}
          />
        ))}
      </div>
      <div className="personalInformation__btn">
        <YellowButton title={"Зберегти"} yellow={true} onClick={onClick} />
      </div>
    </div>
  );
};

export default PersonalInformation;
