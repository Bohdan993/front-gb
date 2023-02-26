import React, { FC } from "react";
import { IFileNoPay } from "../../../interface/contentNoPay.props";
import Image from "next/image";

const ImageContentNoPay: FC<{ imageContent: IFileNoPay }> = ({
  imageContent,
}) => {
  return (
    <>
      {imageContent && (
        <div className="imageContentNoPay">
          <Image
            style={{ borderRadius: 12 }}
            priority={true}
            src="/images/blur_img.jpg"
            height={1580}
            width={2290}
            alt={"icon"}
          />
        </div>
      )}
    </>
  );
};

export default ImageContentNoPay;
