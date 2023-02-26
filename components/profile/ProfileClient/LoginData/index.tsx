import { IExpertProps } from "../../../../store/expert/expert.props";
import store from "../../../../store";
import { connect, ConnectedProps } from "react-redux";
import LoginData from "./LoginData";

const mapState = ({ expert }: { expert: IExpertProps }) => {
  const { loginData } = expert;
  return {
    loginData,
  };
};

const mapDispatch = {
  setLoginData: (data: IExpertProps["loginData"]) => {
    const { loginData } = store.getState().expert;
    return {
      type: "SET_LOGIN_DATA",
      loginData: {
        ...loginData,
      },
    };
  },
};

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(LoginData);
