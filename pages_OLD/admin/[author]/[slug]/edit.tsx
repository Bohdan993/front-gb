import React, { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import { connect, ConnectedProps } from "react-redux";
import Creation from "../../../../components/creation";
import { ICreationProps } from "../../../../store/creation/creation.props";
import { useRouter } from "next/router";
import { postAdminIsOpen } from "../../../../api/admin";
import { getCookie } from "../../../../api/cookies";

interface IProps extends PropsFromRedux {
  article: any;
}

const Edit: FC<IProps> = ({ setCreateContent, article, openPopup }) => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (router.asPath.includes("/admin") && !token) {
      openPopup("phone-popup");
    }
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      e.preventDefault();
      e.returnValue = "";
      postAdminIsOpen(false, article.article.id).then(() => {});
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (router.asPath.includes("/admin")) {
      postAdminIsOpen(true, article.article.id).then((data) => {});
    }
  }, []);

  useEffect(() => {
    // newCreateContent.slug = articles.data.slug;
    setCreateContent(article.article);
  }, []);

  return <Creation />;
};

const mapState = ({ creation }: { creation: ICreationProps }) => {
  const { createContent } = creation;
  return {
    createContent,
  };
};
const mapDispatch = {
  setCreateContent: (newData: ICreationProps["createContent"]) => {
    return {
      type: "SET_CREATE_CONTENT",
      createContent: newData,
    };
  },
  openPopup: (currentPopup: string) => ({ type: "OPEN_POPUP", currentPopup }),
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Edit);

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  locale,
}) => {
  const { slug } = query;
  const { author } = query;

  const token =
    req && req.cookies && req.cookies["token"] ? req.cookies["token"] : "";
  const resArticle = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${author}/${slug}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
    }
  );

  const article = await resArticle.json();

  if (!article.success) {
    return {
      notFound: true,
    };
  }
  return {
    props: { article },
  };
};
