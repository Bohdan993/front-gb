import Image from "next/image";
import CustomButtonYellow from "../../UI/CustomButtonYellow";
import { IHomePageData } from "../../../pages";
import { IPopupProps } from "../../../store/popup/popup.props";
import { connect, ConnectedProps } from "react-redux";
interface IProps extends PropsFromRedux {
  content: IHomePageData["lesson_block"];
}

const LessonsBlock = ({ content, openPopup }: IProps) => {
  return (
    <div className="container-fluid lessons_block">
      <div className="row lessons_block__first">
        <div className="col-sm-12 clo-md-12 col-lg-5">
          <h1>{content.title}</h1>
        </div>
        <div className="col-md-9 col-lg-6 lessons_block__first__left">
          <h3>{content.sub_title}</h3>
          <p>{content.text}</p>
          <CustomButtonYellow
            title={"Become an expert"}
            onClick={() => openPopup("phone-popup")}
          />
        </div>
      </div>
      <div className="row align-items-center lessons_block__second">
        <div className="col-sm-10 col-md-4 col-lg-4 lessons_block__second__item">
          <div className="icon">
            <Image
              src="/images/icons/icon_create.svg"
              width={75}
              height={75}
              alt="icon create"
            />
          </div>

          <div className="lessons_block__second__item__text">
            <div>{content.icon_create.title}</div>
            <span>{content.icon_create.sub_title}</span>
          </div>
        </div>
        <div className="separator_first"></div>
        <div className="col-sm-10 col-md-4 col-lg-4 lessons_block__second__item">
          <div className="icon">
            <Image
              src="/images/icons/icon_share.svg"
              width={75}
              height={75}
              alt="icon share"
            />
          </div>

          <div className="lessons_block__second__item__text">
            <div>{content.icon_share.title}</div>
            <span>{content.icon_share.sub_title}</span>
          </div>
        </div>
        <div className="separator_second"></div>
        <div className="col-sm-10 col-md-4 col-lg-4 lessons_block__second__item">
          <div className="icon">
            {" "}
            <Image
              src="/images/icons/icon_earn.svg"
              width={75}
              height={75}
              alt="icon earn"
            />
          </div>

          <div className="lessons_block__second__item__text">
            <div>{content.icon_earn.title}</div>
            <span>{content.icon_earn.sub_title}</span>
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
export default connector(LessonsBlock);
