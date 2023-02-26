import React, {
  ChangeEvent,
  FC,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

interface IProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
  name?: string;
  title?: string;
  value?: string;
  type: string;
  placeholder?: string;
  id?: string;
  focus?: boolean;
  onFocus?: () => void;
}

const InputCustom: FC<IProps> = ({
  onChange,
  name,
  title,
  value,
  type,
  onBlur,
  placeholder,
  id,
  focus,
  onFocus,
}) => {
  const refInput: RefObject<HTMLInputElement> = useRef(null);
  const error = undefined;
  const [isValue, setIsValue] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [length, setLength] = useState(999);

  useEffect(() => {
    if (name?.includes("bank")) {
      setLength(4);
    } else if (name === "specialization" || name === "name") {
      setLength(30);
    } else {
      setLength(999);
    }
  }, [name]);

  useEffect(() => {
    if (focus && refInput.current) {
      refInput.current.focus();
    }
  }, [focus]);

  useEffect(() => {
    setIsValue(value);
  }, [value]);

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputChangeValue = event.target && event.target.value;
    const isValid = inputChangeValue.match(/^\d*$/);
    if ((name?.includes("bank") && isValid) || !name?.includes("bank")) {
      setIsValue(inputChangeValue);
      onChange && onChange(event, name ? name : "");
    }
  };
  const inputBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const inputBlurValue = event.target && event.target.value;
    setIsValue(inputBlurValue);

    onBlur && onBlur(event, name ? name : "");
  };
  const onOpenPassword = () => {
    setIsOpen(!isOpen);
  };

  // const inputStyle =
  //   name === "description"
  //     ? { fontWeight: "400", lineHeight: "20px", color: "#808080" }
  //     : { fontWeight: "700", lineHeight: "29px", color: "#282828" };

  const eyeIcon = isOpen
    ? "/images/icons/eye_open.svg"
    : "/images/icons/icon_eye_on.svg";
  return (
    <div className="inputCustom" id={id ? id : ""}>
      {title && (
        <div className="inputCustom__title">
          <span>{title}</span>
        </div>
      )}
      <div
        className={error ? " inputCustom__input" : "inputCustom__input_error"}
      >
        <input
          ref={refInput}
          placeholder={placeholder && placeholder}
          // style={inputStyle}
          maxLength={length}
          value={isValue}
          name={name}
          type={isOpen ? "text" : type}
          onBlur={(event) => {
            inputBlur(event);
          }}
          onFocus={onFocus}
          onChange={(event) => {
            inputChange(event);
          }}
        />
        <div className="inputCustom__input_error__error_input">
          <span>{error}</span>
        </div>
        {type === "password" && (
          <div className="inputCustom__input_eye" onClick={onOpenPassword}>
            <Image
              priority={true}
              src={eyeIcon}
              width={20}
              height={16}
              alt={"icon"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputCustom;
