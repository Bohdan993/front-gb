import { FC } from "react";
import Image from "next/image";

interface IProps {
  onClick?: () => void;
}

const ButtonPreview: FC<IProps> = ({ onClick }) => {
  return (
    <div className="buttonPreview" onClick={onClick}>
      <Image
        src="/images/icons/preview_icon.svg"
        height={13}
        width={26}
        alt="icon"
      />
      <span>Подивитись як покупець</span>
    </div>
  );
};

export default ButtonPreview;
