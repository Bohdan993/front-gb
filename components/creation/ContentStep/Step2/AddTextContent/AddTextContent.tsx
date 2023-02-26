import { ChangeEvent, FC } from "react";
import { PropsFromRedux } from "./index";
import { ITextContent } from "../../../../../store/creation/creation.props";
import TextBlock from "./TextBlock";

interface IProps extends PropsFromRedux {
  index: number;
  typeContent: ITextContent;
}

const AddTextContent: FC<IProps> = ({
  index,
  createContent,
  setCreateContent,
  typeContent,
}) => {
  const newCreateContent = { ...createContent };

  const onBlurTextBlock = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => {
    typeContent[name] = e.target.value;
    newCreateContent.content[index] = typeContent;
    setCreateContent(newCreateContent);
  };
  return (
    <>
      <TextBlock
        valueInput={typeContent.title ? typeContent.title : ""}
        valueTextarea={typeContent.content ? typeContent.content : ""}
        onBlur={onBlurTextBlock}
        inputName={"title"}
        textareaName={"content"}
      />
    </>
  );
};

export default AddTextContent;
