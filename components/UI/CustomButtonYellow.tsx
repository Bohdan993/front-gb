
import { FC } from "react";
import { IButton } from "../../interface/ui";
import Translate from "../../inc/locale/Translate";


const CustomButtonYellow: FC<IButton> = ({ title, onClick }) => {
    return (
        <>
            <div className="customButtonYellow" onClick={onClick}>
                <span><Translate string={title} /></span>
            </div>
        </>
    );
};

export default CustomButtonYellow;
