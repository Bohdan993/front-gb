import { FC } from "react";
import ArticleCategory from "./ArticleCategory";
import ArticleTitle from "./ArticleTitle";
import ArticleType from "./ArticleType";
import MenuInfo from "./MenuInfo";

interface IProps {
  title: string;
  type: string;
  typeIcon: string;
  descriptionItems: { id: number; title: string }[];
  category: string;
}

const ArticleMainSections: FC<IProps> = ({
  title,
  type,
  typeIcon,
  descriptionItems,
  category,
}) => {
  return (
    <>
      <div className=" col-12 col-lg-8 col-xl-9  col-xxl-10    articleMainSections ">
        <div className=" col-xs-6 articleMainSections__card">
          <ArticleCategory category={category} categoryIcon={typeIcon} />
          <ArticleTitle title={title} />
          <ArticleType type={type} />
          <MenuInfo descriptionItems={descriptionItems} />
        </div>
      </div>
    </>
  );
};

export default ArticleMainSections;
