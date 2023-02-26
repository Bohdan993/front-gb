import Step3 from "./Step3";
import { connect, ConnectedProps } from "react-redux";
import { ICreationProps } from "../../../../store/creation/creation.props";

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
  setCreateContent: (newData: ICreationProps["createContent"]) => {
    return {
      type: "SET_CREATE_CONTENT",
      createContent: newData,
    };
  },
};

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Step3);
