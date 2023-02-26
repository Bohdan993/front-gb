import { FC } from "react";

interface IProps {
  currentStep: number;
}
const HeaderSvg: FC<IProps> = ({ currentStep }) => {
  if (currentStep === 4) {
    return <></>;
  }
  return (
    <div className="headerSvg">
      <div className={`headerSvg_step1_${currentStep}`} />
      <div className="headerSvg__line" />
      <div className={`headerSvg_step2_${currentStep}`} />
      <div className="headerSvg__line" />
      <div className={`headerSvg_step3_${currentStep}`} />
    </div>
  );
};

export default HeaderSvg;
