import CustomButtonBlue from "../UI/CustomButtonBlue";
import Image from "next/image";

const images = [
  { id: 1, name: "photo2847186.jpeg" },
  { id: 2, name: "photo2847186.jpeg" },
];

const DownloadImages = () => {
  return (
    <div className="downLoadImages">
      <h2>Help us shape the future of Data Visualization.</h2>
      <div className="downLoadImages__loader">
        {images.map((img) => (
          <div className="downLoadImages__loader_name" key={img.id}>
            <Image
              priority={true}
              src={"/images/icons/download_pin.svg"}
              height={42}
              width={22}
              alt={"icon"}
            />
            <span>{img.name}</span>
            <CustomButtonBlue title={"Завантажити"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadImages;
