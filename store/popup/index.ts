import { IPopupProps } from "./popup.props";
import initStore from "./initStore";
import { AnyAction } from "redux";

const popupReducer = (state: IPopupProps = initStore, action: AnyAction) => {
  switch (action.type) {
    case "OPEN_POPUP":
      return {
        ...state,
        currentPopup: action.currentPopup,
      };
    case "CLOSE_POPUP":
      return {
        ...state,
        currentPopup: "",
      };

    default:
      return state;
  }
};

export default popupReducer;
