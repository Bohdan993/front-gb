import Header from '../../contentBlocks/Header/Header';
import { IPopupProps } from '../../../store/popup/popup.props'
import { connect, ConnectedProps } from "react-redux";


const mapState = ({ popup }: { popup: IPopupProps }) => {
    const { currentPopup } = popup;
    return {
        currentPopup
    };
};

const mapDispatch = {
    openPopup: (currentPopup: string) => ({ type: 'OPEN_POPUP', currentPopup })
};

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Header);
