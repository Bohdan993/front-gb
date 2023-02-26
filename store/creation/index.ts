import { ICreationProps } from "./creation.props";
import initStore from "./initStore";
import { AnyAction } from "redux";

const creationReducer = (
  state: ICreationProps = initStore,
  action: AnyAction
) => {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return {
        ...state,
        currentStep: action.currentStep,
      };
    case "SET_CONTENT":
      return {
        ...state,
        content: action.content,
      };
    case "SET_CREATE_CONTENT":
      return {
        ...state,
        createContent: action.createContent,
      };
    case "SET_CURRENT_INDEX":
      return {
        ...state,
        currentIndex: action.currentIndex,
      };
    default:
      return state;
  }
};

export default creationReducer;
