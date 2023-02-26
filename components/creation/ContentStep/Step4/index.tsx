import { ICreationProps } from "../../../../store/creation/creation.props";
import { connect, ConnectedProps } from "react-redux";
import Success from "./Success";

const mapState = ({ creation }: { creation: ICreationProps }) => {
  const { createContent } = creation;
  return {
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
export default connector(Success);
