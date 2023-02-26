import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { PropsFromRedux } from "./index";
import {
  getArticleTypes,
  patchArticles,
  postArticles,
} from "../../../../api/creation";
import { IOptionsSelect } from "../../../../interface/articles.props";
import { useRouter } from "next/router";

const ChangeContent: FC<PropsFromRedux> = ({
  setCurrentStep,
  createContent,
  setCreateContent,
}) => {
  const router = useRouter();
  const [articlesType, setArticlesType] = useState<IOptionsSelect[]>([]);
  useEffect(() => {
    getArticleTypes().then((data) => {
      setArticlesType(data);
    });
  }, []);
  // useEffect(() => {
  //   if (createContent && createContent.articleTypeId) {
  //     setCurrentStep(2);
  //   } else {
  //     setCurrentStep(1);
  //   }
  // }, []);

  const newContent = { ...createContent };
  const onclick = (title: string, id: number) => {
    newContent.articleTypeId = id;
    setCreateContent(newContent);
    newContent.articleTypeId = id;
    //убрать изменить проверку
    if (router.asPath === "/my-articles/create") {
      postArticles(newContent).then((data) => {
        if (data.success) {
          newContent.slug = data.data.slug;
          setCreateContent(newContent);
          setCurrentStep(2);
          router.push(`/my-articles/${newContent.slug}/edit`);
        } else {
          // router.push(`/404`);
        }
      });
    } else {
      patchArticles(newContent).then((data) => {
        newContent.slug = data.article.slug;
        setCreateContent(newContent);
        setCurrentStep(2);
      });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="row gy-4 gx-4 changeContent">
        {articlesType &&
          articlesType.map((content) => (
            <div
              key={content.id}
              className="col-xs-12 col-sm-6 col-xl-4 "
              onClick={() => onclick(content.title, content.id)}
            >
              <div
                className={
                  createContent.articleTypeId === content.id
                    ? "changeContent__card changeContent__card_active"
                    : "changeContent__card"
                }
              >
                <Image
                  src={"/images/icons/instruction_icon.svg"}
                  height={40}
                  width={40}
                  alt="icon"
                />
                <div className="changeContent__card_title">{content.title}</div>
                <div className="changeContent__card_description">
                  {/* Описание описание Описание описаниеОписание описаниеОписание
                  описание */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ChangeContent;
