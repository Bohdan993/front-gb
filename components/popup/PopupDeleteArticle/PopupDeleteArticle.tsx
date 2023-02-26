import React, { FC } from "react";
import { PropsFromRedux } from "../PopupLanguageSelect";
import Image from "next/image";
import CustomButtonBlue from "../../UI/CustomButtonBlue";

interface IProps extends PropsFromRedux {
  deleteArticle: () => void;
  index: number;
}

const PopupDeleteArticle: FC<IProps> = ({
  currentPopup,
  closePopup,
  deleteArticle,
  index,
}) => {
  const title = "Ви впевнені, що хочете видалити цю статтю?";
  return (
    <>
      {currentPopup === `delete-popup_${index}` ? (
        <div
          className={`popup_background ${
            currentPopup === `delete-popup_${index}` ? "open_popup" : ""
          }`}
        >
          <div className={`container popup popupDelete`}>
            <div
              className="close_btn"
              onClick={() => {
                closePopup();
              }}
            >
              <Image
                src="/images/icons/close_popup.svg"
                width={30}
                height={30}
                alt="close button"
              />
            </div>
            <div className="text-center popupDelete_title ">
              <h3>{title}</h3>
            </div>

            <div className="row text-center justify-content-around justify-content-md-around align-items-center mt-md-5  popupDelete_btn ">
              <div className="col-6 col-md-4 yes justify-content-center d-flex">
                <CustomButtonBlue
                  title={"Tak"}
                  onClick={() => {
                    closePopup();
                    deleteArticle();
                  }}
                />
              </div>
              <div className="col-6 col-md-4  no justify-content-center d-flex">
                <CustomButtonBlue
                  title={"Hi"}
                  onClick={() => {
                    closePopup();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PopupDeleteArticle;
