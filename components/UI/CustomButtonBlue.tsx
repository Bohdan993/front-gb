import { FC } from "react";
import { IButton } from "../../interface/ui";
import Translate from "../../inc/locale/Translate";

const CustomButtonBlue: FC<IButton> = ({ title, onClick, yellow }) => {
  return (
    <>
      <div
        className={`customButtonBlue ${yellow ? "yellow" : ""}`}
        onClick={onClick}
      >
        <Translate string={title} />
      </div>
    </>
  );
};

export default CustomButtonBlue;
