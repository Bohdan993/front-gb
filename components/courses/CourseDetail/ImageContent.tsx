import React, { FC } from "react";
import Image from "next/image";
import { IFile } from "../../../store/creation/creation.props";

const ImageContent: FC<{ imageContent: IFile }> = ({ imageContent }) => {
  return (
    <>
      {imageContent.url ? (
        <div className="imageContent">
          <h2>{imageContent.title}</h2>
          <Image
            priority={true}
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${imageContent.url}`}
            height={1580}
            width={2290}
            alt={"image"}
            objectFit={"contain"}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ImageContent;
