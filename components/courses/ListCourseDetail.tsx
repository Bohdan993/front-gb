import React, { FC } from "react";
import Image from "next/image";

const list = [
  {
    id: 1,
    name: "one",
    icon: "/images/icons/List-Ellipse.svg",
    text: "This is a post about hiring and not a typical Medium post about design, life or why you should do 100 other things in life and not date a travelling girl.",
  },
  {
    id: 2,
    name: "two",
    icon: "/images/icons/List-Ellipse.svg",
    text: "This is a post about hiring and not a typical Medium post about design, life or why you should do 100 other things in life and not date a travelling girl.",
  },
  {
    id: 3,
    name: "three",
    icon: "/images/icons/List-Ellipse.svg",
    text: "This is a post about hiring and not a typical Medium post about design, life or why you should do 100 other things in life and not date a travelling girl.",
  },
  {
    id: 4,
    name: "four",
    icon: "/images/icons/List-Ellipse.svg",
    text: "This is a post about hiring and not a typical Medium post about design, life or why you should do 100 other things in life and not date a travelling girl.",
  },
];

const ListCourseDetail: FC = () => {
  return (
    <div className="activeCourseDetail">
      <h2>Help us shape the future of Data Visualization.</h2>
      <p>
        This is a post about hiring and not a typical Medium post about design,
        life or why you should do 100 other things in life and not date a
        travelling girl.
      </p>
      <div className="activeCourseDetail__menu">
        {list.map((item) => (
          <div className="activeCourseDetail__menu_item" key={item.id}>
            <div className="activeCourseDetail__menu_item_img">
              <Image
                priority={true}
                src={item.icon}
                height={30}
                width={30}
                alt={"icon"}
              />
            </div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCourseDetail;
