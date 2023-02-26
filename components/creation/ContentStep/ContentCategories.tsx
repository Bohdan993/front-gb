import Image from "next/image";
import { FC } from "react";
import { ICreationProps } from "../../../store/creation/creation.props";
import { connect, ConnectedProps } from "react-redux";

interface IProps extends PropsFromRedux {
  onClick: (type: string) => void;
  isContentLength: boolean;
}

const categories = [
  { id: 1, title: "Текст", icon: "/images/icons/text_icon.svg", type: "text" },
  { id: 2, title: "Список", icon: "/images/icons/icon_list.svg", type: "list" },
  { id: 3, title: "Файл", icon: "/images/icons/icon_file.svg", type: "file" },
  {
    id: 4,
    title: "Картинка",
    icon: "/images/icons/icon_images.svg",
    type: "image",
  },
];

const ContentCategories: FC<IProps> = ({
  onClick,
  content,
  isContentLength,
}) => {
  return (
    <div>
      <div className="row  contentCategories">
        {isContentLength && (
          <div className="contentCategories__title">Додай ще блок</div>
        )}
        {categories.map((category) => (
          <div className="  contentCategories__wrapper " key={category.id}>
            <div
              className="contentCategories__cards"
              onClick={() => onClick(category.type)}
            >
              <Image src={category.icon} height={30} width={30} alt="icon" />
              <span>{category.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapState = ({ creation }: { creation: ICreationProps }) => {
  const { content } = creation;
  return {
    content,
  };
};

const connector = connect(mapState);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ContentCategories);
