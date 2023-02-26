import React, { FC } from "react";
import Image from "next/image";
import { IList } from "../../../store/creation/creation.props";

const ListContent: FC<{ listContent: IList }> = ({ listContent }) => {
  const items = listContent.items ? listContent.items : [];
  return (
    <div className="listContent">
      <h2>{listContent.title}</h2>
      {items.map((item, index) => (
        <div className="listContent__item" key={index}>
          <div className="listContent__item_img">
            <Image
              priority={true}
              src="/images/icons/List-Ellipse.svg"
              height={30}
              width={30}
              alt={"icon"}
            />
          </div>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default ListContent;
