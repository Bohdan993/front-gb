import { ChangeEvent, FC } from "react";
import Image from "next/image";
import CustomButtonBlue from "./CustomButtonBlue";
import { uploadFile } from "../../api/storage";

interface IProps {
  type?: string;
  setTestFile: (active: string) => void;
  setFileName?: (active: string) => void;
  name: string;
}

const AddFile: FC<IProps> = ({ type, setTestFile, setFileName, name }) => {
  const titleBtn = type === "image" ? "Вибрати зображення" : "Вибрати файл";
  const loaderChange = (e: ChangeEvent<HTMLInputElement> | null | any) => {
    let valueFile = e && e.target.files;
    if (valueFile) {
      type === "file" && setFileName && setFileName(valueFile[0].name);
      uploadFile(valueFile[0]).then((data) => {
        setTestFile(data.file_id);
      });
      // setFile(valueFile[0]);
      // setTestFile && setTestFile("/images/picture-course.png");
    }
  };
  return (
    <div className="addPhotoFile">
      <div className="addPhotoFile__wrapper">
        <input
          multiple={false}
          name={name}
          id={name}
          type="file"
          className="hidden"
          onChange={loaderChange}
          accept={type === "file" ? "" : "image/*"}
        />
        <label htmlFor={name}>
          <Image
            priority={true}
            src={"/images/icons/adding_section.svg"}
            height={41}
            width={56}
            alt={"icon"}
          />

          <div className={`addPhotoFile_btn${type === "image" && "Img"}`}>
            <CustomButtonBlue title={titleBtn} />
          </div>
        </label>
        <span>інфа про формати допустимі</span>
      </div>
    </div>
  );
};

export default AddFile;
