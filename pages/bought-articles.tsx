import { GetServerSideProps, NextPage } from "next";
import AvatarProfile from "../components/profile/AvatarProfile";
import ArticleMainSections from "../components/articles/ArticleMainSections";
import { useRouter } from "next/router";
import { IUserArticles } from "../interface/user.props";
import { useEffect, useState } from "react";
import { getArticlesPay } from "../api/articles";

interface IProps {
  payArticles: IUserArticles;
}
const MyCourses: NextPage<IProps> = ({ payArticles }): JSX.Element => {
  const router = useRouter();
  const [articlesArr, setArticlesArr] = useState(payArticles.articles);
  const [isCurrentPage, setIsCurrentPage] = useState(
    payArticles.currentPage + 1
  );
  const [fetching, setFetching] = useState(false);

  const onArticle = (userId: number, slug: string) => {
    router.push(`/${userId}/${slug}`);
  };
  const onAuthor = (userId: number) => {
    router.push(`/${userId}`);
  };

  useEffect(() => {
    if (isCurrentPage - 1 < payArticles.totalPages) {
      if (fetching) {
        getArticlesPay(isCurrentPage).then((data) => {
          setArticlesArr([...articlesArr, ...data.articles]);
          setIsCurrentPage((prevState) => prevState + 1);
          setFetching(false);
        });
      }
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getArticlesPay(1).then((data) => {
        setArticlesArr(data.articles);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollHandler = (e: any) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    if (scrollHeight - (scrollTop + innerHeight) < 300) {
      setFetching(true);
    }
  };

  return (
    <div className="container75">
      <section className="myCourses">
        <h1>Куплені</h1>
        {articlesArr.map((article) => (
          <div className="oneArticle" key={article.id}>
            <div className="myCourses__course">
              <div onClick={() => onAuthor(article!.author!.id)}>
                <AvatarProfile
                  avatar={article.author ? article.author.avatar_id : ""}
                  name={article.author ? article.author.name : ""}
                  specialization={
                    article.author ? article.author.specialization : ""
                  }
                />
              </div>
              <div
                className="row myCourses__course_article "
                onClick={() => onArticle(article.authorId, article.slug)}
              >
                <ArticleMainSections
                  title={article.title ? article.title : ""}
                  type={article.articleType ? article.articleType.title : ""}
                  typeIcon={article.category ? article.category.icon : ""}
                  descriptionItems={
                    article.descriptionItems ? article.descriptionItems : []
                  }
                  category={article.category ? article.category.title : ""}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyCourses;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const token =
    req && req.cookies && req.cookies["token"] ? req.cookies["token"] : "";
  const resArticles = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/bought-articles/`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
    }
  );
  const payArticles = await resArticles.json();
  // if (!payArticles.success) {
  //   res.writeHead(307, { Location: "/404" });
  //   res.end();
  // }
  return {
    props: { payArticles },
  };
};
