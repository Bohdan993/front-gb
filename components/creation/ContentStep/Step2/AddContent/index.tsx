import { ICreationProps } from "../../../../../store/creation/creation.props";
import { connect, ConnectedProps } from "react-redux";
import AddContent from "./AddContent";

const mapState = ({ creation }: { creation: ICreationProps }) => {
  const { currentStep, currentIndex, createContent } = creation;
  return {
    currentStep,
    currentIndex,
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

  setCurrentIndex: (currentIndex: ICreationProps["currentIndex"]) => {
    return {
      type: "SET_CURRENT_INDEX",
      currentIndex,
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
export default connector(AddContent);
