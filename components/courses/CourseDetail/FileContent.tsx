import React, { FC } from "react";
import Image from "next/image";
import CustomButtonBlue from "../../UI/CustomButtonBlue";
import { IFile } from "../../../store/creation/creation.props";
import Link from "next/link";

const FileContent: FC<{ fileContent: IFile }> = ({ fileContent }) => {
  return (
    <>
      {fileContent.url ? (
        <div className="fileContent">
          <h2>{fileContent.title}</h2>
          <div className="fileContent__file">
            <div className="fileContent__file_img">
              <Image
                priority={true}
                src={"/images/icons/download_pin.svg"}
                height={42}
                width={22}
                alt={"icon"}
              />
            </div>
            <span>{fileContent.fileName}</span>
            <Link
              href={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${fileContent.url}`}
            >
              <CustomButtonBlue title={"Завантажити"} />
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FileContent;
