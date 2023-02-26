import { FC, useEffect } from "react";

import ChangeContent from "./Step1";
import Step2 from "./Step2/AddContent";
import Step3 from "./Step3";
import Success from "./Step4";
import { IArticle } from "../../../store/creation/creation.props";

interface IProps {
  createContent: IArticle;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
}

const ContentStep: FC<IProps> = ({
  currentStep,
  createContent,
  setCurrentStep,
}) => {
  const { articleTypeId } = createContent;
  useEffect(() => {
    if (createContent && articleTypeId) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }, [articleTypeId]);

  return (
    <>
      {currentStep === 1 && <ChangeContent />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
      {currentStep === 4 && <Success />}
    </>
  );
};

export default ContentStep;
