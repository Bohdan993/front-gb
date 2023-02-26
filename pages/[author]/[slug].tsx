import ProfileSection from "../../components/profile/ProfileSection";
import ArticleCategory from "../../components/articles/ArticleMainSections/ArticleCategory";
import ArticleType from "../../components/articles/ArticleMainSections/ArticleType";
import MenuInfo from "../../components/articles/ArticleMainSections/MenuInfo";
import CourseDetail from "../../components/courses/CourseDetail";
import YellowButton from "../../components/UI/YellowButton";
import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { IAuthorArticles } from "../../interface/user.props";
import Articles from "../../components/articles/Articles";
import { useRouter } from "next/router";
import { postPayment } from "../../api/payment";
import { getCookie } from "../../api/cookies";
import { IPopupProps } from "../../store/popup/popup.props";
import { connect, ConnectedProps } from "react-redux";
import CurseDetailNoPay from "../../components/courses/CurseDetailNoPay";
import { getArticle } from "../../api/articles";

interface IProps extends PropsFromRedux {
  articlesData: IAuthorArticles;
}

const Course: FC<IProps> = ({ articlesData, openPopup, setBuyArticleID }) => {
  const router = useRouter();
  const [articles, setArticles] = useState<IAuthorArticles>(articlesData);
  // if (!articles) {
  //   router.reload();
  // }
  console.log(articlesData);
  useEffect(() => {
    getArticle(router.asPath).then((data) => {
      setArticles(data);
    });
  }, [router]);

  const article =
    articles && articles.article
      ? articles.article
      : {
          articleType: { id: 0, title: "" },
          articleTypeId: 0,
          authorId: 0,
          category: {
            id: 0,
            title: "",
            createdAt: "",
            updatedAt: "",
            icon: "",
          },
          categoryId: 0,
          createdAt: "",
          currency: {
            id: 0,
            title: "",
            createdAt: "",
            updatedAt: "",
            symbol: "",
          },
          currencyId: 0,
          description: "",
          id: 0,
          language: { id: 0, title: "", createdAt: "", updatedAt: "" },
          languageId: 0,
          price: 0,
          slug: "",
          title: "",
          updatedAt: "",
          descriptionItems: [],
          content: [],
        };
  // const {
  //   title,
  //   price,
  //   descriptionItems,
  //   category,
  //   currency,
  //   articleType,
  //   description,
  //   content,
  //   createdAt,
  //   id,
  // } = articles.article;

  const createDate = new Date(article.createdAt).toLocaleDateString("uk-UK");
  const pay = articles && articles.access ? articles.access : false;
  const articleDetail = (slug: string, userId: number) => {
    router.push(`/${userId}/${slug}`);
  };
  const onPayment = () => {
    const token = getCookie("token");
    // setBuyArticleID(article.id);
    if (!token) {
      openPopup("phone-popup");
      setBuyArticleID(article.id);
    } else {
      postPayment(article.id).then((data) => {
        if (data.success) {
          window.location.href = data.checkout_url;
        } else {
          console.log(data);
        }
      });
    }
  };

  return (
    <section className="mainContainer">
      <div className="course">
        {pay ? (
          <></>
        ) : (
          <div className="course_price">
            {article.price}
            {article.currency ? article.currency.symbol : ""}
          </div>
        )}
        <div
          className={"course__profileBlock"}
          onClick={() => router.push(`/${articles && articles.author.id}`)}
        >
          <ProfileSection userData={articles && articles.author} />
        </div>
        <div className="course__details">
          <div className="course__details_top">
            <h1>{article.title}</h1>
            <div className="course__details_top_typeData">
              <ArticleCategory
                category={
                  article.category && article.category.title
                    ? article.category.title
                    : ""
                }
                categoryIcon={
                  article.category && article.category
                    ? article.category.icon
                    : ""
                }
              />
              <span className="course__details_top_typeData_data">
                {createDate}
              </span>
            </div>
            <ArticleType
              type={
                article.articleType && article.articleType.title
                  ? article.articleType.title
                  : ""
              }
            />
            <MenuInfo descriptionItems={article.descriptionItems} pay={true} />
          </div>
          <div className="course__details_bottom">
            <div className="course__details_bottom_textOne">
              <p>{article.description}</p>
            </div>
          </div>
          {pay ? (
            <CourseDetail content={article.content} />
          ) : (
            // <></>
            <CurseDetailNoPay content={article.content} />
          )}
        </div>

        <div className="course__articles">
          {articles && articles.articles && articles.articles.length ? (
            <h2>You may also like:</h2>
          ) : (
            <></>
          )}
          <Articles
            articles={articles && articles.articles}
            onDetail={(_, slug) =>
              articleDetail(slug, articles && articles.author.id)
            }
            load={false}
            currentPage={0}
            totalPages={0}
          />
        </div>

        {!pay && (
          <div className="course__btnPay">
            <YellowButton yellow={true} title="Купити" onClick={onPayment} />
          </div>
        )}
      </div>
    </section>
  );
};

const mapState = ({ popup }: { popup: IPopupProps }) => {
  const { currentPopup } = popup;
  return {
    currentPopup,
  };
};

const mapDispatch = {
  openPopup: (currentPopup: string) => ({ type: "OPEN_POPUP", currentPopup }),
  setBuyArticleID: (id: number) => ({
    type: "BUY_ARTICLE",
    buyArticleID: id,
  }),
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Course);

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  locale,
}) => {
  const { slug } = query;
  const { author } = query;
  const token =
    req && req.cookies && req.cookies["token"] ? req.cookies["token"] : "";

  const currencyId =
    req && req.cookies && req.cookies["currencyId"]
      ? req.cookies["currencyId"]
      : "";
  const resArticles = await fetch(
    //Добавить currencyId
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${author}/${slug}?currencyId=${currencyId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
    }
  );
  const articlesData = await resArticles.json();
  if (!articlesData.success) {
    return {
      notFound: true,
    };
  }

  console.log("articles articles 11111111");
  console.log(articlesData);
  console.log("articles articles 2222222");
  return {
    props: { articlesData },
  };
};
