import { ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import { IExpertProps } from "../../store/expert/expert.props";
import CustomButtonBlue from "./CustomButtonBlue";
import { uploadFile } from "../../api/storage";
import { postUserChangeData } from "../../api/user";

interface IProps {
  expertData: IExpertProps["expertData"];
  setExpert: (data: IExpertProps["expertData"]) => void;
}

const LoadImages: FC<IProps> = ({ expertData, setExpert }) => {
  const [images, setImages] = useState<File | string>();
  let newData = { ...expertData };
  useEffect(() => {
    expertData && setImages(expertData.avatar_id);
  }, [expertData]);
  const loaderChange = (e: ChangeEvent<HTMLInputElement> | null | any) => {
    let valueFile = e && e.target.files;
    if (valueFile) {
      uploadFile(valueFile[0]).then((data) => {
        newData.avatar_id = data.file_id;
        setExpert(newData);
        localStorage.setItem("user", JSON.stringify(newData));
        expertData && setImages(expertData.avatar_id);
        postUserChangeData(newData).then();
      });
    }
  };
  const titleBtn = images ? "Змінити фото" : "Додати фото";
  return (
    <div className="loadImages">
      <div className="loadImages__loader">
        <div className="loadImages__loader_wrapper">
          <input
            name="imageFile"
            id="imageFile"
            type="file"
            className="hidden"
            onChange={loaderChange}
            accept="image/*"
          />
          <label htmlFor="imageFile">
            <div className="loadImages__loader_img">
              <Image
                priority={true}
                src={
                  images
                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${images}`
                    : "/images/icons/load_images2.svg"
                }
                height={203}
                width={203}
                alt={"icon"}
                objectFit="cover"
              />
            </div>
            <CustomButtonBlue title={titleBtn} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoadImages;
