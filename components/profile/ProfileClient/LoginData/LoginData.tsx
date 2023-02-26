import { ChangeEvent, FC } from "react";
import { PropsFromRedux } from "./index";
import InputCustom from "../../../UI/InputCustom";
import YellowButton from "../../../UI/YellowButton";

const inputs = [
  { id: 1, name: "login", title: "Логін", type: "text" },
  { id: 2, name: "password", title: "Пароль", type: "password" },
  {
    id: 3,
    name: "repeatPassword",
    title: "Повторити пароль",
    type: "password",
  },
];

const LoginData: FC<PropsFromRedux> = ({ loginData, setLoginData }) => {
  const onClick = () => {};
  const onChangerInput = (
    event: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const newData = {
      ...loginData,
      [name]: event.target && event.target.value,
    };
    loginData[name] = event.target && event.target.value;
    setLoginData(newData);
  };
  return (
    <div className="loginData">
      <h2>Дані для входу</h2>
      <div className="loginData__inputs">
        {inputs.map((input) => (
          <InputCustom
            key={input.name}
            name={input.name}
            title={input.title}
            type={input.type}
            onChange={onChangerInput}
            value={loginData[input.name]}
          />
        ))}
      </div>
      <div className="loginData__btn">
        <YellowButton
          title={"Стати експертом"}
          yellow={true}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default LoginData;
