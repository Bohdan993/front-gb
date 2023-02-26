import { FC } from "react";

interface IProps {
  categoryIcon: string;
  category: string;
}

const ArticleCategory: FC<IProps> = ({ categoryIcon, category }) => {
  return (
    <>
      {category ? (
        <div className="articleType">
          <div className="articleType__img">
            {categoryIcon && (
              <picture>
                <img
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${categoryIcon}`}
                  alt="icon"
                />
              </picture>
            )}
          </div>
          {/*<Image*/}
          {/*  priority={true}*/}
          {/*  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${categoryIcon}`}*/}
          {/*  height={21}*/}
          {/*  width={18}*/}
          {/*  alt={"icon"}*/}
          {/*  objectFit="cover"*/}
          {/*/>*/}
          <span className="articleType_title">{category}</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ArticleCategory;
