import HeaderSvg from "./HeaderSvg";
import { FC } from "react";
import { ISteps } from "../../../interface/cereation.props";

const steps = [
  { id: 1, description: "Тип контенту", title: "Крок 1" },
  { id: 2, description: "Опис", title: "Крок 2" },
  { id: 3, description: "Ціна", title: "Крок 3" },
];

const CreationHeaderStep: FC<ISteps> = ({ currentStep }) => {
  if (currentStep === 4) {
    return <></>;
  }
  return (
    <div className="creationHeaderStep">
      <HeaderSvg currentStep={currentStep} />
      <div className="creationHeaderStep__steps">
        {steps.map((step) => (
          <div className="creationHeaderStep__steps__step" key={step.id}>
            <span className="creationHeaderStep__steps__step_description">
              {step.description}
            </span>
            <span className="creationHeaderStep__steps__step_currentStep">
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreationHeaderStep;
