import { ICreationProps } from "../../../../store/creation/creation.props";
import { connect, ConnectedProps } from "react-redux";
import ChangeContent from "./ChangeContent";

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
  setCreateContent: (data: ICreationProps["createContent"]) => {
    return {
      type: "SET_CREATE_CONTENT",
      createContent: data,
    };
  },
};

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ChangeContent);
