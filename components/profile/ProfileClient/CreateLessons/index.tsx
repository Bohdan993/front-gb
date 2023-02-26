import YellowButton from "../../../UI/YellowButton";
import { useRouter } from "next/router";
import { FC } from "react";

interface IProps {
  titleButton: string;
  onClickStep: () => void;
}

const CreateLessons: FC<IProps> = ({ onClickStep, titleButton }) => {
  const router = useRouter();
  const onClick = () => {
    onClickStep && onClickStep();
    router.push("my-articles/create");
  };
  return (
    <div className="createLessons">
      <div className="row align-items-center">
        <div className="col-xs-12 col-lg-6 createLessons__title">
          <h2>*Створюй уроки, методики, відповіді на питання </h2>
        </div>
        <div className="col-xs-12 col-lg-6 createLessons__create">
          <h3 className="createLessons__create_title">Створюй уроки</h3>
          <span className="createLessons__create_text">
            Створюй уроки, методики, відповіді на питання і продавай онлайн
          </span>
          <div className="createLessons__create_btn">
            <YellowButton title={titleButton} yellow={true} onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLessons;
