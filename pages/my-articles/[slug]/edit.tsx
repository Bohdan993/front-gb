import React, { FC, useEffect } from "react";
import Creation from "../../../components/creation";
import { GetServerSideProps } from "next";
import { ICreationProps } from "../../../store/creation/creation.props";
import { connect, ConnectedProps } from "react-redux";

interface IProps extends PropsFromRedux {
  article: any;
}

const Edit: FC<IProps> = ({ setCreateContent, article, createContent }) => {
  useEffect(() => {
    // newCreateContent.slug = articles.data.slug;
    setCreateContent(article.article);
  }, []);

  if (createContent && createContent.createdAt) {
    return <Creation />;
  } else {
    return <></>;
  }
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

  const token =
    req && req.cookies && req.cookies["token"] ? req.cookies["token"] : "";
  const resArticle = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/me/${slug}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
    }
  );

  const article = await resArticle.json();

  return {
    props: { article },
  };
};
