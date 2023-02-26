import { FC } from "react";
import { IFileNoPay } from "../../../interface/contentNoPay.props";

const FileContentNoPay: FC<{ fileContent: IFileNoPay }> = ({ fileContent }) => {
  return (
    <>
      {fileContent && (
        <div className="fileContentNoPay">
          <div className="fileContentNoPay__leftBlock" />
          <div className="fileContentNoPay__textBlock"></div>
        </div>
      )}
    </>
  );
};

export default FileContentNoPay;
