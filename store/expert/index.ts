import { IExpertProps } from "./expert.props";
import initStore from "./initStore";
import { AnyAction } from "redux";

const expertReducer = (state: IExpertProps = initStore, action: AnyAction) => {
  switch (action.type) {
    case "SET_EXPERT_DATA":
      return {
        ...state,
        expertData: action.expertData,
      };
    case "SET_LOGIN_DATA":
      return {
        ...state,
        loginData: action.loginData,
      };
    case "SET_ACTIVE":
      return {
        ...state,
        currentActive: action.currentActive,
      };
    case "BUY_ARTICLE":
      return {
        ...state,
        buyArticleID: action.buyArticleID,
      };
    default:
      return state;
  }
};

export default expertReducer;
