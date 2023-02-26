import { FC } from "react";
import TextContentNoPay from "./TextContentNoPay";
import ImageContentNoPay from "./ImageContentNoPay";
import ListContentNoPay from "./ListContentNoPay";
import FileContentNoPay from "./FileContentNoPay";
import {
  IFile,
  IList,
  ITextContent,
} from "../../../store/creation/creation.props";

interface IProps {
  content: [ITextContent | IFile | IList] | any[];
}

const CurseDetailNoPay: FC<IProps> = ({ content }) => {
  return (
    <div className="curseDetailNoPay">
      {content.map((item, index) => (
        <div key={index}>
          {item.type === "text" ? (
            <TextContentNoPay textContent={item} />
          ) : item.type === "image" ? (
            <ImageContentNoPay imageContent={item} />
          ) : item.type === "list" ? (
            <ListContentNoPay listContent={item} />
          ) : item.type === "file" ? (
            <FileContentNoPay fileContent={item} />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default CurseDetailNoPay;
