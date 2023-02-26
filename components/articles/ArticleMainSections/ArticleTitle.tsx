import React, { FC } from "react";

interface IProps {
  title: string;
}

const ArticleTitle: FC<IProps> = ({ title }) => {
  return (
    <>
      <div className="ArticleTitle">
        <span className="ArticleTitle_title">{title}</span>
      </div>
    </>
  );
};

export default ArticleTitle;
