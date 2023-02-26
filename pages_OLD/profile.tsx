import { GetServerSideProps, NextPage } from "next";
import SloganSection from "../components/contentBlocks/SloganSection";
import ProfileSection from "../components/profile/ProfileSection";
import Articles from "../components/articles/Articles";
import StarterProfile from "../components/profile/StarterProfile";
import { IUserArticles } from "../interface/user.props";
import { useRouter } from "next/router";


interface IProps {
  userArticles: IUserArticles;
}
const Profile: NextPage<IProps> = ({ userArticles }): JSX.Element => {
  const router = useRouter();
  const articleDetail = (slug: string) => {
    router.push(`me/${slug}`);
  };
  userArticles.articles.length = 0;
  return (
    <div className="container75">
      <div className="expert">
        <SloganSection />
        <ProfileSection userData={userArticles.author} />
        {
          userArticles.articles.length ? (
            <Articles
              onDetail={(_, slug) => articleDetail(slug)}
              articles={userArticles.articles}
              load={true}
              currentPage={userArticles.currentPage}
              totalPages={userArticles.totalPages}
            />
          ) : (
            <StarterProfile/>
          )
        }
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const token =
    req && req.cookies && req.cookies["token"] ? req.cookies["token"] : "";
  const currencyId =
    req && req.cookies && req.cookies["currencyId"]
      ? req.cookies["currencyId"]
      : "";

  const resArticles = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/me?currencyId=${currencyId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
    }
  );
  const userArticles = await resArticles.json();
  if (!userArticles.success) {
    return {
      notFound: true,
    };
  }
  return {
    props: { userArticles },
  };
};
