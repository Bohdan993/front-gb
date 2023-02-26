import { FC } from "react";

const ButtonPlus: FC<{ onClickAdd: () => void }> = ({ onClickAdd }) => {
  return (
    <>
      <div className="buttonPlus" onClick={onClickAdd}>
        <span className="buttonPlus_plus">+</span>
        <span className="buttonPlus_title">додати елемент списку</span>
      </div>
    </>
  );
};
export default ButtonPlus;
