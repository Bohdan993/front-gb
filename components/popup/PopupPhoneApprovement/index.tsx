import PopupPhoneApprovement from "./PopupPhoneApprovement";
import { IPopupProps } from "../../../store/popup/popup.props";
import { connect, ConnectedProps } from "react-redux";
import { IExpertProps } from "../../../store/expert/expert.props";

const mapState = ({
  popup,
  expert,
}: {
  popup: IPopupProps;
  expert: IExpertProps;
}) => {
  const { expertData, buyArticleID } = expert;
  const { currentPopup } = popup;
  return {
    currentPopup,
    expertData,
    buyArticleID,
  };
};

const mapDispatch = {
  closePopup: () => ({ type: "CLOSE_POPUP" }),
  setExpert: (data: IExpertProps["expertData"]) => {
    return {
      type: "SET_EXPERT_DATA",
      expertData: data,
    };
  },
  setBuyArticleID: (id: number | null) => ({
    type: "BUY_ARTICLE",
    buyArticleID: id,
  }),
};

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PopupPhoneApprovement);
