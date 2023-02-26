import { connect, ConnectedProps } from "react-redux";
import { ICreationProps } from "../../../../../store/creation/creation.props";
import AddPhotoContent from "./AddPhotoContent";

const mapState = ({ creation }: { creation: ICreationProps }) => {
  const { createContent } = creation;
  return {
    createContent,
  };
};

const mapDispatch = {
  setCreateContent: (newData: ICreationProps["createContent"]) => {
    return {
      type: "SET_CREATE_CONTENT",
      createContent: newData,
    };
  },
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(AddPhotoContent);
