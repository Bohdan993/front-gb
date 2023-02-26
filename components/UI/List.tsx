import { ChangeEvent, FC } from "react";
import Image from "next/image";
import InputCustom from "./InputCustom";

interface IProps {
  onBlur: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  value: string;
  index: number;
  onClickDelete: () => void;
}

const List: FC<IProps> = ({ onBlur, value, index, onClickDelete }) => {
  return (
    <>
      <div className="list">
        <Image
          src="/images/icons/List-Ellipse.svg"
          width={30}
          height={30}
          alt="icon"
        />
        <InputCustom
          name={"input"}
          type={"text"}
          value={value}
          onBlur={(event) => onBlur(event, index)}
        />
        <Image
          onClick={onClickDelete}
          className="list_btnDelete"
          src="/images/icons/delete.svg"
          width={17}
          height={20}
          alt="icon"
        />
      </div>
    </>
  );
};

export default List;
