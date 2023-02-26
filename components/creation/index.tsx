import { NextPage } from "next";
import { connect, ConnectedProps } from "react-redux";
import CreationHeaderStep from "./CreationHeaderStep";
import HeaderPre from "./HeaderPre";
import ContentStep from "./ContentStep";
import FooterStep from "./FooterStep";
import { ICreationProps } from "../../store/creation/creation.props";

const Creation: NextPage<PropsFromRedux> = ({
  currentStep,
  createContent,
  setCurrentStep,
}): JSX.Element => {
  return (
    <div className="container75">
      <CreationHeaderStep currentStep={currentStep} />
      <HeaderPre
        currentStep={currentStep}
        date={createContent ? createContent.createdAt : ""}
      />
      <ContentStep
        currentStep={currentStep}
        createContent={createContent}
        setCurrentStep={setCurrentStep}
      />
      <FooterStep />
    </div>
  );
};

const mapState = ({ creation }: { creation: ICreationProps }) => {
  const { currentStep, createContent } = creation;
  return {
    currentStep,
    createContent,
  };
};
const mapDispatch = {
  setCurrentStep: (currentStep: ICreationProps["currentStep"]) => {
    return {
      type: "SET_CURRENT_STEP",
      currentStep,
    };
  },
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Creation);
