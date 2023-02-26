import Image from "next/image";
import { PropsFromRedux } from "./index";
import { FC } from "react";
import { PopUp } from "../../contentBlocks/HomePage/HowToUse";

const PopupFeedback: FC<PropsFromRedux & { popupInfo: PopUp }> = ({
    currentPopup,
    closePopup,
    popupInfo }
) => {

    const { id, specialization, avatar, text, name } = popupInfo;
    return (
        <div
            className={`popup_background ${currentPopup === "feedback-popup" ? "open_popup" : ""
                }`}
        >
            <div className={`container popup feedback-popup`}>
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
                <div className="row">
                    <div className="col text-center">
                        <h3>Коментар</h3>
                    </div>
                    <div className="expert_info">


                        {avatar && avatar !== "" ? (
                            <div>
                                <Image src={avatar}
                                    width={70}
                                    height={70}
                                    alt='expert'
                                    className="expert_avatar"
                                /></div>) : ""}



                        <div className="specialist">
                            <span>{name}</span>
                            <p>
                                {specialization}
                            </p>
                        </div>

                    </div>
                    <div>{text}</div>
                </div>
            </div>
        </div>
    );
};

export default PopupFeedback;
