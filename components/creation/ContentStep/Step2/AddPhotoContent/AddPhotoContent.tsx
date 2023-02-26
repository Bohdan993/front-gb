import { PropsFromRedux } from "../AddTextContent";
import { IFile } from "../../../../../store/creation/creation.props";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import AddFile from "../../../../UI/AddFile";
import Image from "next/image";
import TextBlock from "../AddTextContent/TextBlock";

interface IProps extends PropsFromRedux {
  typeContent: IFile;
  index: number;
}
const AddPhotoContent: FC<IProps> = ({
  index,
  setCreateContent,
  createContent,
  typeContent,
}) => {
  const newCreateContent = { ...createContent };
  const [testFile, setTestFile] = useState<string | undefined>(
    typeContent.url ? typeContent.url : ""
  );
  useEffect(() => {
    setTestFile(typeContent.url ? typeContent.url : undefined);
  }, [typeContent]);
  useEffect(() => {
    typeContent.url = testFile;
    newCreateContent.content[index] = typeContent;
    setCreateContent(newCreateContent);
    // typeContent.url = testFile;
    // setContent(typeContent, PopupEarn.tsx);
  }, [index, testFile]);

  const onclickDelete = () => {
    typeContent.url = undefined;
    newCreateContent.content[index] = typeContent;
    setCreateContent(newCreateContent);
    setTestFile(undefined);
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
      <TextBlock
        valueInput={typeContent.title ? typeContent.title : ""}
        onBlur={onBlurTextBlock}
        inputName={"title"}
      />
      {testFile ? (
        <div className="addPhotoContent">
          <div className="addPhotoContent__img">
            <Image
              priority={true}
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${testFile}`}
              height={1580}
              width={2290}
              alt={"image"}
              objectFit={"cover"}
            />
          </div>

          <div className="addPhotoContent__btnDelete" onClick={onclickDelete}>
            <Image
              src="/images/icons/delete.svg"
              width={12}
              height={15}
              alt="icon"
            />
          </div>
        </div>
      ) : (
        <AddFile
          type={typeContent.type}
          setTestFile={setTestFile}
          name={"img"}
        />
      )}
    </>
  );
};

export default AddPhotoContent;
