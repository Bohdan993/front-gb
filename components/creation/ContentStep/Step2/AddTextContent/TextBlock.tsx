import React, { ChangeEvent, FC } from "react";
import InputCustom from "../../../../UI/InputCustom";
import TextArea from "../../../../UI/textarea";
interface IProps {
  valueInput: string;
  valueTextarea?: string;
  onBlur: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => void;
  inputName: string;
  textareaName?: string;
}
const TextBlock: FC<IProps> = ({
  valueInput,
  valueTextarea,
  onBlur,
  inputName,
  textareaName,
}) => {
  return (
    <div className="addTextContent">
      <InputCustom
        onBlur={onBlur}
        name={inputName}
        title={`Заголовок ${textareaName ? "(обов’язково)" : ""} `}
        value={valueInput}
        type="text"
        placeholder={`Заголовок ${textareaName ? "(обов’язково)" : ""} `}
      />
      {textareaName && (
        <TextArea
          value={valueTextarea}
          placeholder="основний текст"
          onBlur={onBlur}
          title="Опис"
          name={textareaName}
        />
      )}
    </div>
  );
};

export default TextBlock;
