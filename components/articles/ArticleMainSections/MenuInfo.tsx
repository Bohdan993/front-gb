import { FC } from "react";

interface IProps {
  descriptionItems: { id: number; title: string }[];
  pay?: true;
}

const MenuInfo: FC<IProps> = ({ descriptionItems, pay }) => {
  const styleLi = pay ? "_pay" : "";
  return (
    <div className="menuInfo">
      <ul className="row menuInfo__list">
        {descriptionItems.map((list, index) => (
          <li
            className={
              descriptionItems.length === 2
                ? `col-lg-12 menuInfo__list_item${styleLi}`
                : `col-lg-6 menuInfo__list_item${styleLi}`
            }
            key={index}
          >
            {list.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuInfo;
