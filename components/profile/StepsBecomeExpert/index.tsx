import { IExpertProps } from "../../../store/expert/expert.props";
import StepsBecomeExpert from "./StepsBecomeExpert";
import { connect, ConnectedProps } from "react-redux";

const mapState = ({ expert }: { expert: IExpertProps }) => {
  const { expertData, currentActive } = expert;
  return {
    expertData,
    currentActive,
  };
};

const mapDispatch = {
  setExpert: (data: IExpertProps["expertData"]) => {
    return {
      type: "SET_EXPERT_DATA",
      expertData: data,
    };
  },
  setActive: (currentActive: boolean) => ({
    type: "SET_ACTIVE",
    currentActive,
  }),
};

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(StepsBecomeExpert);
