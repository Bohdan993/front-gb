import { IHomePageData } from "../../../pages";
import CustomButtonYellow from "../../UI/CustomButtonYellow";
import { IPopupProps } from "../../../store/popup/popup.props";
import { connect, ConnectedProps } from "react-redux";
interface IProps extends PropsFromRedux {
  content: IHomePageData["first_block"];
}

const FirstBlock = ({ content, openPopup }: IProps): JSX.Element => {
  const {
    title,
    text,
    expert_photo_first,
    expert_photo_second,
    expert_photo_third,
    expert,
    coach,
    business,
  } = content;
  return (
    <div className="container-fluid first_block">
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12 col-xxl-4  header_text">
          <h1>{title}</h1>
          <p>{text}</p>
          <CustomButtonYellow
            title={"Become an expert"}
            onClick={() => openPopup("phone-popup")}
          />
        </div>
        <div className="col-12 col-md-12 col-lg-12 col-xxl-8  d-flex justify-content-between carousel">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 col-xxl-6 first_block__expert_card">
              <div
                className="expert_photo_first"
                style={{
                  backgroundImage: `url('${process.env.NEXT_PUBLIC_STORAGE_URL}/${expert_photo_first}')`,
                }}
              ></div>
              <div className="expert_rectangle">
                <span>{expert}</span>
              </div>
            </div>
            <div className="col-6 col-md-3 col-lg-3 col-xxl-3 first_block__expert_card">
              <div
                className="expert_photo_second"
                style={{
                  backgroundImage: `url('${process.env.NEXT_PUBLIC_STORAGE_URL}/${expert_photo_second}')`,
                }}
              ></div>
              <div className="expert_rectangle_small">
                <span className="rotate_text">
                  <p className="rotate_text__title_one">{coach}</p>
                </span>
              </div>
            </div>

            <div className="col-6 col-md-2 col-lg-3 col-xxl-3 first_block__expert_card">
              <div
                className="expert_photo_second"
                style={{
                  backgroundImage: `url('${process.env.NEXT_PUBLIC_STORAGE_URL}/${expert_photo_third}')`,
                }}
              ></div>
              <div className="expert_rectangle_small">
                <span className="rotate_text">
                  <p className="rotate_text__title_two">{business}</p>
                </span>
              </div>
            </div>
          </div>
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
export default connector(FirstBlock);
