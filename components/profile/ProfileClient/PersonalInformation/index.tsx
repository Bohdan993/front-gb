import { IExpertProps } from "../../../../store/expert/expert.props";
import { connect, ConnectedProps } from "react-redux";
import PersonalInformation from "./PersonalInformation";

const mapState = ({ expert }: { expert: IExpertProps }) => {
  const { expertData } = expert;
  return {
    expertData,
  };
};

const mapDispatch = {
  setExpert: (data: IExpertProps["expertData"]) => {
    // localStorage.setItem("userName", JSON.stringify(data.name));
    // const { expertData } = store.getState().expert;
    return {
      type: "SET_EXPERT_DATA",
      expertData: data,
    };
  },
};

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PersonalInformation);
