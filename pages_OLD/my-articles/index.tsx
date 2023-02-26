import React from "react";
import { GetServerSideProps, NextPage } from "next";
import CreateLessons from "../../components/profile/ProfileClient/CreateLessons";
import { IUserArticles } from "../../interface/user.props";
import Articles from "../../components/articles/Articles";
import { ICreationProps } from "../../store/creation/creation.props";
import { connect, ConnectedProps } from "react-redux";
import { useRouter } from "next/router";
import { IPopupProps } from "../../store/popup/popup.props";
import { getDeletedArticles } from "../../api/articles";
import YellowButton from "../../components/UI/YellowButton";

interface IProps extends PropsFromRedux {
  userArticles: IUserArticles;
}

const MyArticles: NextPage<IProps> = ({
  userArticles,
  setCurrentStep,
  currentStep,
}): JSX.Element => {
  const router = useRouter();

  const [deletedArticles, setDeletedArticles] = React.useState([]);
  const onDetail = (
    articleType: { id: number; title: string },
    slug: string
  ) => {
    router.push(`/my-articles/${slug}/edit`);
    if (articleType) {
      setCurrentStep((currentStep = 2));
    } else {
      setCurrentStep((currentStep = 1));
    }
  };
  const onClickStep = () => {
    setCurrentStep((currentStep = 1));
  };

  const loadDeleted = () => {
    getDeletedArticles().then(({ articles }) => {
      setDeletedArticles(articles);
    });
  };

  return (
    <div className="container75">
      <CreateLessons
        onClickStep={onClickStep}
        titleButton={
          userArticles.articles && userArticles.articles.length
            ? "Створити ще один товар"
            : "Створити перший товар"
        }
      />
      <Articles
        articles={userArticles.articles}
        onDetail={onDetail}
        authorID={userArticles.author.id}
        load={true}
        currentPage={Number(userArticles.currentPage)}
        totalPages={Number(userArticles.totalPages)}
      />

      {userArticles.isDeleted ? (
        <div className="deletedBlock">
          {deletedArticles.length ? (
            <>
              <h2 className="mt-4 mb-2 text-center">Архівні статті</h2>
              <Articles
                articles={deletedArticles}
                onDetail={onDetail}
                authorID={userArticles.author.id}
                load={false}
                currentPage={1}
                totalPages={1}
              />
            </>
          ) : (
            <YellowButton
              title="Завантажити архівні статті"
              yellow={true}
              onClick={loadDeleted}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapState = ({
  creation,
}: {
  creation: ICreationProps;
  popup: IPopupProps;
}) => {
  const { currentStep } = creation;
  return {
    currentStep,
  };
};
const mapDispatch = {
  openPopup: (currentPopup: string) => ({ type: "OPEN_POPUP", currentPopup }),
  setCurrentStep: (currentStep: ICreationProps["currentStep"]) => {
    return {
      type: "SET_CURRENT_STEP",
      currentStep,
    };
  },
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(MyArticles);

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

  return {
    props: { userArticles },
  };
};
