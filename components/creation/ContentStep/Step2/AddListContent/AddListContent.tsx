import { PropsFromRedux } from "../AddTextContent";
import { IList } from "../../../../../store/creation/creation.props";
import { ChangeEvent, FC, useEffect, useState } from "react";
import ButtonPlus from "../../../../UI/ButtonPlus";
import List from "../../../../UI/List";
import TextBlock from "../AddTextContent/TextBlock";

interface IProps extends PropsFromRedux {
  typeContent: IList;
  index: number;
}
const AddListContent: FC<IProps> = ({
  typeContent,
  index,
  // setContent,
  createContent,
  setCreateContent,
}) => {
  const newCreateContent = { ...createContent };
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
    setList(typeContent.items ? typeContent.items : []);
  }, [typeContent]);
  const onBlur = (event: ChangeEvent<HTMLInputElement>, indexInput: number) => {
    list[indexInput] = event.target && event.target.value;
    typeContent.items = list;
    newCreateContent.content[index] = typeContent;
    setCreateContent(newCreateContent);
    // setContent(typeContent, PopupEarn.tsx);
  };

  const onClickAdd = () => {
    const number = list.length + 1;
    setList([...list, `текст ${number}`]);
  };

  const deleteList = (index: number) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };
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
      <div className="addListContent">
        <TextBlock
          valueInput={typeContent.title ? typeContent.title : ""}
          onBlur={onBlurTextBlock}
          inputName={"title"}
        />
        {list.map((item, index) => (
          <List
            onBlur={onBlur}
            value={item}
            index={index}
            key={index}
            onClickDelete={() => deleteList(index)}
          />
        ))}
        <ButtonPlus onClickAdd={onClickAdd} />
      </div>
    </>
  );
};

export default AddListContent;
