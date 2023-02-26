import Image from "next/image";
import { useState } from "react";
import PopupFeedback from "../../../popup/PopupFeedback";

const SliderCard = ({ info, openPopup, popInfo }: any) => {
    const [open, setOpen] = useState(true)
    const { id, specialization, avatar, text, name } = info;

    const openFeedbackPopup = (currID: number) => {
        if (currID === id) {
            openPopup("feedback-popup")
            popInfo(info)
        }
    }

    return (<>
        <div className="slider_card" onClick={() => openFeedbackPopup(id)}>
            <p>{text.length > 126 ? `${text.slice(126) + '...'}` : text}</p>
            <div className="expert_info">
                <div>
                    <Image src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${avatar}`}
                        width={70}
                        height={70}
                        alt='expert'
                        className="expert_avatar"
                    /></div>


                <div className="specialist">
                    <span>{name}</span>
                    <p>
                        {specialization}
                    </p>
                </div>
            </div>
        </div>

    </>

    )
}
export default SliderCard;