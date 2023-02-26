import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import useAutosizeTextArea from "./useAutosizeTextArea";

interface IProps {
  name?: string;
  value?: string;
  placeholder: string;
  onBlur: (event: ChangeEvent<HTMLTextAreaElement>, name: string) => void;
  title: string;
}

const TextArea: FC<IProps> = ({ value, placeholder, onBlur, title, name }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setInputValue(value ? value : "");
  }, [value]);
  useAutosizeTextArea(textAreaRef.current, inputValue);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const val = event.target?.value;
    setInputValue(val);
  };

  return (
    <div className="textArea">
      <span className="textArea__title">{title}</span>
      <textarea
        onChange={handleChange}
        onBlur={(e) => onBlur(e, name ? name : "")}
        placeholder={placeholder}
        ref={textAreaRef}
        rows={1}
        value={inputValue}
        name={name}
      />
    </div>
  );
};
export default TextArea;
