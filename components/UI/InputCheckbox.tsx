import React, { FC } from "react";
import Link from "next/link";
interface IProps {
  check: boolean;
  setCheck: (active: boolean) => void;
}
const InputCheckbox: FC<IProps> = ({ check, setCheck }) => {
  return (
    <div className="inputCheckbox">
      <label className="inputCheckbox__label" htmlFor="offer">
        <input
          type="checkbox"
          id={"offer"}
          checked={check}
          onClick={() => setCheck(!check)}
        />
        <span className="inputCheckbox__title">
          Я погоджуюсь з{" "}
          <Link href="/terms-and-conditions">
            <a target="_blank">офертою</a>
          </Link>
        </span>
      </label>
    </div>
  );
};

export default InputCheckbox;
