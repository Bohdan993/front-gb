import { FC } from "react";
import TextContent from "./TextContent";
import ImageContent from "./ImageContent";
import FileContent from "./FileContent";
import ListContent from "./ListContent";
import {
  IFile,
  IList,
  ITextContent,
} from "../../../store/creation/creation.props";

interface IProps {
  content: [ITextContent | IFile | IList] | any[];
}

const CourseDetail: FC<IProps> = ({ content }) => {
  return (
    <div className="courseDetail">
      {content &&
        content.map((item, index) => (
          <div key={index}>
            {item.type === "text" ? (
              <TextContent textContent={item} />
            ) : item.type === "image" ? (
              <ImageContent imageContent={item} />
            ) : item.type === "file" ? (
              <FileContent fileContent={item} />
            ) : item.type === "list" ? (
              <ListContent listContent={item} />
            ) : (
              <></>
            )}
          </div>
        ))}
    </div>
  );
};

export default CourseDetail;
