import { GetServerSideProps, NextPage } from "next";
import PersonalInformation from "../components/profile/ProfileClient/PersonalInformation";
import LoginData from "../components/profile/ProfileClient/LoginData";
import CreateLessons from "../components/profile/ProfileClient/CreateLessons";
import { IUserDataProps } from "../interface/user.props";
import { IExpertProps } from "../store/expert/expert.props";
import store from "../store";
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";
import { ICreationProps } from "../store/creation/creation.props";
import WaysToPay from "../components/profile/ProfileClient/WaysToPay";

interface IProps extends PropsFromRedux {
  userData: IUserDataProps;
}

const ProfileClient: NextPage<IProps> = ({
  userData,
  setExpert,
  currentStep,
  setCurrentStep,
}) => {
  useEffect(() => {
    setExpert(userData.user);
  }, [userData]);
  const onClickStep = () => {
    setCurrentStep((currentStep = 1));
  };
  return (
    <>
      <main className="container75">
        <div className="profileClient">
          <div>
            <h1>Профіль</h1>
            <PersonalInformation />
            {/*<LoginData />*/}
            <CreateLessons
              onClickStep={onClickStep}
              titleButton={"Cтворити товар"}
            />
            <WaysToPay />
          </div>
        </div>
      </main>
    </>
  );
};

const mapState = ({
  expert,
  creation,
}: {
  expert: IExpertProps;
  creation: ICreationProps;
}) => {
  const { expertData } = expert;
  const { currentStep } = creation;
  return {
    expertData,
    currentStep,
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
  setCurrentStep: (currentStep: ICreationProps["currentStep"]) => {
    return {
      type: "SET_CURRENT_STEP",
      currentStep,
    };
  },
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ProfileClient);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const { token } = req.cookies;

  const getMember = await fetch(
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
  const userData = await getMember.json();

  return {
    props: { userData },
  };
};
