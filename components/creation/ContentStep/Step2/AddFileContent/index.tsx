import store from "../../../../../store";
import { connect, ConnectedProps } from "react-redux";
import {
  ICreationProps,
  IFile,
} from "../../../../../store/creation/creation.props";
import AddFileContent from "./AddFileContent";

const mapState = ({ creation }: { creation: ICreationProps }) => {
  const { content, createContent } = creation;
  return {
    content,
    createContent,
  };
};

const mapDispatch = {
  setContent: (newData: IFile, index: number) => {
    const { content } = store.getState().creation;
    content[index] = newData;
    return { type: "SET_CONTENT", content };
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
export default connector(AddFileContent);
