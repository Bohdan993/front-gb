import PopupLanguageSelect from '../PopupLanguageSelect/PopupLanguageSelect'
import { IPopupProps } from '../../../store/popup/popup.props'
import { connect, ConnectedProps } from "react-redux";


const mapState = ({ popup }: { popup: IPopupProps }) => {
    const { currentPopup } = popup;
    return {
        currentPopup
    };
};

const mapDispatch = {
    closePopup: () => ({ type: 'CLOSE_POPUP' })

};

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PopupLanguageSelect);

