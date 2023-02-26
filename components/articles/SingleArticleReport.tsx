import React, { FC } from "react";
import ArticleCategory from "./ArticleMainSections/ArticleCategory";
import { IUArticles } from "../../interface/articles.props";
import ArticleTitle from "./ArticleMainSections/ArticleTitle";
import SingleFinanceReport from "./SingleFinanceReport";
import ArticleType from "./ArticleMainSections/ArticleType";
import MenuInfo from "./ArticleMainSections/MenuInfo";
import Link from "next/link";

interface IProps {
  article: IUArticles;
}

const SingleArticleReport: FC<IProps> = ({ article }) => {
  const {
    articleType,
    title,
    category,
    descriptionItems,
    boughtCount,
    boughtAmount,
    currency,
    slug,
  } = article;
  return (
    <>
      <div className="singleArticleReport">
        <div className="singleArticleReport__top">
          <ArticleCategory
            categoryIcon={category && category.icon ? category.icon : ""}
            category={category && category.title}
          />
          {/*<div className="singleArticleReport__top_img">*/}
          {/*  <Image*/}
          {/*    priority={true}*/}
          {/*    src={IosShare}*/}
          {/*    height={37}*/}
          {/*    width={37}*/}
          {/*    alt={"icon"}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        <Link href={`/me/${slug}`}>
          <a>
            <ArticleTitle title={title} />
          </a>
        </Link>
        <SingleFinanceReport
          boughtCount={boughtCount}
          boughtAmount={boughtAmount}
          currencySymbol={currency && currency.symbol}
        />
        <ArticleType type={articleType && articleType.title} />
        <MenuInfo descriptionItems={descriptionItems} />
        {/*<EditButtons />*/}
      </div>
    </>
  );
};

export default SingleArticleReport;
