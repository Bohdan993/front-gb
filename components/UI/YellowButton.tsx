import { FC } from "react";
import { IButton } from "../../interface/ui";

interface IProps extends IButton {
  yellow: boolean;
}

const YellowButton: FC<IProps> = (
  { title, yellow, onClick } = { title: "", yellow: true, onClick: undefined }
) => {
  const onClickBtn = () => {
    yellow && onClick && onClick();
  };
  return (
    <div
      className={yellow ? "yellowButton" : "greyButton"}
      onClick={onClickBtn}
    >
      <span className={yellow ? "yellowButton__title" : "greyButton__title"}>
        {title}
      </span>
    </div>
  );
};

export default YellowButton;
