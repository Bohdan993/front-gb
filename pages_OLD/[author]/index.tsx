import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { IUserArticles } from "../../interface/user.props";
import { useRouter } from "next/router";
import SloganSection from "../../components/contentBlocks/SloganSection";
import ProfileSection from "../../components/profile/ProfileSection";
import Articles from "../../components/articles/Articles";
import { getAuthor } from "../../api/author";

interface IProps {
  authorArticles: IUserArticles;
}
const Author: NextPage<IProps> = ({ authorArticles }) => {
  const router = useRouter();
  const [author, setAuthor] = useState(authorArticles);
  const articleDetail = (slug: string, userId: number) => {
    router.push(`${userId}/${slug}`);
  };
  useEffect(() => {
    getAuthor(router.asPath).then((data) => {
      setAuthor(data);
    });
  }, [router]);
  return (
    <div className="expert">
      <div className="expert__mainContainer">
        <SloganSection />
        <ProfileSection userData={author && author.author} />

        <Articles
          onDetail={(_, slug) =>
            articleDetail(slug, author && author.author.id)
          }
          articles={author && author.articles}
          load={true}
          currentPage={author && author.currentPage}
          totalPages={author && author.totalPages}
        />
      </div>
    </div>
  );
};

export default Author;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  locale,
}) => {
  const { author } = query;
  const token =
    req && req.cookies && req.cookies["token"] ? req.cookies["token"] : "";
  const resAuthor = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${author}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
    }
  );
  const authorArticles = await resAuthor.json();
  if (!authorArticles.success) {
    return {
      notFound: true,
    };
  }
  return {
    props: { authorArticles },
  };
};
