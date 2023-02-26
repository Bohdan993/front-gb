import { FC } from "react";
import { IButton } from "../../interface/ui";

const BlueButton: FC<IButton> = ({ title, onClick }) => {
  return (
    <div className={`blueButton`} onClick={onClick}>
      <span>{title}</span>
    </div>
  );
};

export default BlueButton;
