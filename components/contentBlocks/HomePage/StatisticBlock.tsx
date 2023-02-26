import { IHomePageData } from "../../../pages";
import CustomButtonYellow from "../../UI/CustomButtonYellow";
import { IPopupProps } from "../../../store/popup/popup.props";
import { connect, ConnectedProps } from "react-redux";
interface IProps extends PropsFromRedux {
  content: IHomePageData["statistic_block"];
}
const StatisticBlock = ({ content, openPopup }: IProps): JSX.Element => {
  const { title, first_card, second_card, sub_title, text } = content;
  return (
    <div className="container-fluid statistic_block">
      <div className="row">
        <div className="col">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-lg-2 statistic_block__first_item">
          <h3>{first_card.title}</h3>
          <p>{first_card.text}</p>
        </div>
        <div className="col-sm-8 col-md-4 col-lg-3 statistic_block__second_item">
          <h3>{second_card.title}</h3>
          <span>{second_card.first_number}</span>
          <p>{second_card.first_text}</p>
          <span>{second_card.second_number}</span>
          <p>{second_card.second_text} </p>
        </div>
        <div className="col-sm-10 col-md-4 col-lg-4 statistic_block__third_item">
          <h3>{sub_title}</h3>
          <p>{text}</p>
          <CustomButtonYellow
            title={"Become an expert"}
            onClick={() => openPopup("phone-popup")}
          />
        </div>
      </div>
    </div>
  );
};

const mapState = ({ popup }: { popup: IPopupProps }) => {
  const { currentPopup } = popup;
  return {
    currentPopup,
  };
};
const mapDispatch = {
  openPopup: (currentPopup: string) => ({ type: "OPEN_POPUP", currentPopup }),
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(StatisticBlock);
