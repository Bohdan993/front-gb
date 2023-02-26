import { GetServerSideProps, NextPage } from "next";
import StepsBecomeExpert from "../components/profile/StepsBecomeExpert";
import YellowButton from "../components/UI/YellowButton";
import { connect, ConnectedProps } from "react-redux";
import { IExpertProps } from "../store/expert/expert.props";
import { useRouter } from "next/router";
import { IUserDataProps } from "../interface/user.props";
import { useEffect } from "react";
import store from "../store";

interface IProps extends PropsFromRedux {
  userData: IUserDataProps;
}

const BecomeExpert: NextPage<IProps> = ({
  currentActive,
  userData,
  setExpert,
}): JSX.Element => {
  const router = useRouter();
  const onClick = () => {
    userData && localStorage.setItem("user", JSON.stringify(userData.user));
    router.push("my-articles/create");
  };
  useEffect(() => {
    userData && setExpert(userData.user);
    userData && localStorage.setItem("user", JSON.stringify(userData.user));
  }, [userData]);
  return (
    <section className=" container75">
      <section className="becomeExpert">
        <h1 className="becomeExpert__h1">Стань експертом</h1>
        <StepsBecomeExpert />
        <div className="becomeExpert__nextBtn">
          <YellowButton
            title={"Далі"}
            yellow={currentActive}
            onClick={onClick}
          />
        </div>
      </section>
    </section>
  );
};

const mapState = ({ expert }: { expert: IExpertProps }) => {
  const { currentActive } = expert;
  return {
    currentActive,
  };
};

const mapDispatch = {
  setExpert: (data: IExpertProps["expertData"]) => {
    const { expertData } = store.getState().expert;
    let newData = { ...expertData, data };
    newData = data;
    return {
      type: "SET_EXPERT_DATA",
      expertData: newData,
    };
  },
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(BecomeExpert);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const { token } = req.cookies;

  const getUser = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
    }
  );
  const userData = await getUser.json();

  return {
    props: { userData },
  };
};
