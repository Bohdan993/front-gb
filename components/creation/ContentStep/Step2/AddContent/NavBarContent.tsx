import Image from "next/image";
import { FC } from "react";

interface IProps {
  onClickUp: () => void;
  onClickDown: () => void;
  onClickDelete: () => void;
  activeNav: boolean;
}

const NavBarContent: FC<IProps> = ({
  onClickUp,
  onClickDown,
  onClickDelete,
  activeNav,
}) => {
  if (!activeNav) {
    return <></>;
  }
  return (
    <div className={"nawBarContentHidden"}>
      <div className="nawBarContent__arrUp" onClick={onClickUp}>
        <Image
          src="/images/icons/arrow_up.svg"
          height={40}
          width={40}
          alt="arrUp"
        />
      </div>
      <div className="nawBarContent__arrDown" onClick={onClickDown}>
        <Image
          src="/images/icons/arrow_down.svg"
          height={40}
          width={40}
          alt="arrDown"
        />
      </div>
      <div className="nawBarContent__delete" onClick={onClickDelete}>
        <Image
          src="/images/icons/delete_navBar.svg"
          height={40}
          width={40}
          alt="delete"
        />
      </div>
    </div>
  );
};

export default NavBarContent;
