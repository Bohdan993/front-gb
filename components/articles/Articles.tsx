import CustomButtonBlue from "../UI/CustomButtonBlue";
import React, { FC, useEffect, useState } from "react";
import ArticleMainSections from "./ArticleMainSections";
import { IUArticles } from "../../interface/articles.props";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { deleteArticle } from "../../api/creation";
import { connect, ConnectedProps } from "react-redux";
import { IPopupProps } from "../../store/popup/popup.props";
import PopupDeleteArticle from "../popup/PopupDeleteArticle/PopupDeleteArticle";
import { getArticles, getMyArticle } from "../../api/articles";
import { getBankCards } from "../../api/bankCards";
import PopupEarn from "../popup/PopupEarn";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface IArticlesProps extends PropsFromRedux {
  onDetail?: (articleType: { id: number; title: string }, slug: string) => void;
  articles: IUArticles[];
  authorID?: number;
  load: boolean;
  currentPage: number;
  totalPages: number;
}

const Articles: FC<IArticlesProps> = ({
  onDetail,
  articles,
  openPopup,
  currentPopup,
  closePopup,
  authorID,
  load,
  totalPages,
  currentPage,
}) => {
  const router = useRouter();
  const [articlesArr, setArticlesArr] = useState(articles);
  const [isCurrentPage, setIsCurrentPage] = useState(currentPage + 1);
  const [fetching, setFetching] = useState(false);
  const [currencyId, setCurrencyId] = useState();
  const [isOpenAdmin, setIsOpenAdmin] = useState("");

  useEffect(() => {
    setArticlesArr(articles);
  }, [articles]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currency") || "{}");
    setCurrencyId(data.id);
  }, []);
  useEffect(() => {
    if (isCurrentPage - 1 < totalPages) {
      if (fetching) {
        getArticles(isCurrentPage, currencyId).then((data) => {
          if (data.articles.length) {
            setArticlesArr([...articlesArr, ...data.articles]);
            setIsCurrentPage((prevState) => prevState + 1);
            setFetching(false);
          }
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

  const scrollHandler = (e: any) => {
    if (load) {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const scrollTop = e.target.documentElement.scrollTop;
      const innerHeight = window.innerHeight;
      if (scrollHeight - (scrollTop + innerHeight) < 300) {
        setFetching(true);
      }
    }
  };

  const onClickDetail = (
    articleType: { id: number; title: string },
    slug: string,
    authorId?: number
  ) => {
    if (authorId) {
      getMyArticle(slug, authorId).then((data) => {
        const { article } = data;
        if (data.success === true) {
          onDetail && onDetail(articleType, slug);
        }
      });
    } else {
      getMyArticle(slug).then((data) => {
        const { article } = data;
        if (data.success === true) {
          if (article.isOpenByAdmin) {
            setIsOpenAdmin(slug);
          } else {
            setIsOpenAdmin("");
            onDetail && onDetail(articleType, slug);
          }
        }
      });
    }
  };

  const onClickDeleteArticle = (id: number, index: number) => {
    deleteArticle(id).then((data) => console.log(data));
    const newArticles = [...articlesArr];
    newArticles.splice(index, 1);
    setArticlesArr(newArticles);
  };

  const [isCopied, setIsCopied] = useState(false);

  const copyTextToClipboard = async (text: string) => {
    return text;
    // if (text) {
    //   // return await navigator.clipboard.writeText(text);
    //   setCopyLink(text);
    // } else {
    //   // return document.execCommand("copy", true, text);
    //   // console.log("document", document);
    // }
  };

  const onClickShare = (slug: string) => {
    getBankCards().then((data) => {
      if (data.success) {
        const { bankCards } = data;
        if (bankCards.length) {
          const copyLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${authorID}/${slug}`;
          copyTextToClipboard(copyLink)
            .then(() => {
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          openPopup("PopupEarn");
        }
      }
    });
  };
  return (
    <>
      {articlesArr && articlesArr.length ? (
        articlesArr.map((article, index) => (
          <section className="oneArticle " key={article.id}>
            <PopupDeleteArticle
              index={index}
              currentPopup={currentPopup}
              closePopup={closePopup}
              deleteArticle={() => onClickDeleteArticle(article.id, index)}
            />
            {!article.isPublished ? (
              <div className={" buttonsInfo"}>
                <span className={"buttonsInfo_list"}>чернетка</span>
              </div>
            ) : (
              <></>
            )}
            <div className="row">
              {isOpenAdmin === article.slug ? (
                <div className="oneArticle__isOpenAdmin">
                  адміністратор зараз редагує цю статтю
                </div>
              ) : (
                <></>
              )}
              <ArticleMainSections
                title={article.title ? article.title : ""}
                type={
                  article.articleType && article.articleType.title
                    ? article.articleType.title
                    : ""
                }
                typeIcon={
                  article.category && article.category.icon
                    ? article.category.icon
                    : ""
                }
                descriptionItems={
                  article.descriptionItems ? article.descriptionItems : []
                }
                category={article.category?.title ? article.category.title : ""}
              />
              <div className="col-12 col-lg-2 oneArticle__card_priceDetails">
                <span className=" oneArticle__card_priceDetails_price">
                  {article.price ? article.price : ""}
                  {article.currency ? article.currency.symbol : ""}
                </span>
                {router.asPath === "/my-articles" ||
                router.asPath.includes("admin") ? (
                  <></>
                ) : (
                  <>
                    {article.isPublished ? (
                      <Link href={`/${article.authorId}/${article.slug}`}>
                        <CustomButtonBlue
                          title={"Детальніше"}
                        />
                      </Link>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </div>
            {router.asPath === "/my-articles" ||
            router.asPath.includes("admin") ? (
              <>
                <div
                  className="oneArticle_delete"
                  onClick={() => openPopup(`delete-popup_${index}`)}
                >
                  <Image
                    priority={true}
                    src={"/images/icons/delete.svg"}
                    height={32}
                    width={25}
                    alt={"delete"}
                  />
                </div>
                {article.isPublished ? (
                  <CopyToClipboard
                    text={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${authorID}/${article.slug}`}
                  >
                    <div
                      className="oneArticle_share"
                      onClick={() => {
                        onClickShare(article.slug);
                      }}
                    >
                      {isCopied ? (
                        <div
                          className={
                            isCopied
                              ? "oneArticle_share_complete"
                              : "oneArticle_share_done"
                          }
                        >
                          скопійовано в буфер обміну
                        </div>
                      ) : (
                        <></>
                      )}
                      <Image
                        priority={true}
                        src={"/images/icons/Ios_share.svg"}
                        height={37}
                        width={37}
                        alt={"icon"}
                      />
                    </div>
                  </CopyToClipboard>
                ) : (
                  ""
                )}
                <div
                  className="oneArticle_edit"
                  onClick={() =>
                    onClickDetail(article.articleType, article.slug)
                  }
                >
                  <Image
                    priority={true}
                    src={"/images/icons/Edit.svg"}
                    height={28}
                    width={28}
                    alt={"icon"}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </section>
        ))
      ) : (
        <></>
      )}
      {currentPopup === "PopupEarn" ? <PopupEarn type="addCard" /> : <></>}
    </>
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
  closePopup: () => ({ type: "CLOSE_POPUP" }),
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Articles);
