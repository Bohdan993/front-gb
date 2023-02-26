import { PropsFromRedux } from "../AddTextContent";
import { IFile } from "../../../../../store/creation/creation.props";
import { ChangeEvent, FC, useEffect, useState } from "react";
import AddFile from "../../../../UI/AddFile";
import Image from "next/image";
import Link from "next/link";
import TextBlock from "../AddTextContent/TextBlock";

interface IProps extends PropsFromRedux {
  typeContent: IFile;
  index: number;
}
const AddFileContent: FC<IProps> = ({
  typeContent,
  index,
  // content,
  // setContent,
  createContent,
  setCreateContent,
}) => {
  const newCreateContent = { ...createContent };
  const [file, setFile] = useState<string | undefined>(
    typeContent.url ? typeContent.url : undefined
  );
  const [fileName, setFileName] = useState<string>(
    typeContent.fileName ? typeContent.fileName : ""
  );
  useEffect(() => {
    setFile(typeContent.url ? typeContent.url : undefined);
    setFileName(typeContent.fileName ? typeContent.fileName : "");
  }, [typeContent]);

  useEffect(() => {
    typeContent.url = file;
    typeContent.fileName = fileName;
    newCreateContent.content[index] = typeContent;
    setCreateContent(newCreateContent);
  }, [index, file, typeContent, fileName]);

  const onclickDelete = () => {
    setFile(undefined);
  };

  const pathToFile = `${process.env.NEXT_PUBLIC_STORAGE_URL}/${file}`;

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
        onBlur={onBlurTextBlock}
        inputName={"title"}
      />
      {file ? (
        <div className="addFileContent">
          <div className="addFileContent__file">
            <Image
              src="/images/icons/download_pin.svg"
              width={22}
              height={42}
              alt="icon"
            />
            <Link href={pathToFile}>
              <span className="addFileContent__file_name">{fileName}</span>
            </Link>
            <div
              className="addFileContent__file_btmDelete"
              onClick={onclickDelete}
            >
              <Image
                src="/images/icons/delete.svg"
                width={29}
                height={36}
                alt="icon"
              />
            </div>
          </div>
        </div>
      ) : (
        <AddFile
          name={"file"}
          type={typeContent.type}
          setTestFile={setFile}
          setFileName={setFileName}
        />
      )}
    </>
  );
};

export default AddFileContent;
