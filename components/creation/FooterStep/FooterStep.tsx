import { FC, useEffect, useState } from "react";
import BlueButton from "../../UI/BlueButton";
import YellowButton from "../../UI/YellowButton";
import { PropsFromRedux } from "./index";
import { patchArticles } from "../../../api/creation";
import { IArticle } from "../../../store/creation/creation.props";
import { useRouter } from "next/router";

const FooterStep: FC<PropsFromRedux> = ({
  currentStep,
  setCurrentStep,
  createContent,
  setCreateContent,
}) => {
  const router = useRouter();
  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(false);
  const checkCreateContent = (createContent: IArticle) => {
    return !!(
      createContent.title &&
      createContent.description &&
      createContent.categoryId &&
      createContent.languageId &&
      createContent.price &&
      createContent.currencyId
    );
  };
  const isHasTextTitle = createContent.content
    .filter((i) => i.type === "text")
    .some((i) => i.title !== "");
  const isHasText = createContent.content
    .filter((i) => i.type === "text")
    .some((i) => i.title);
  const isText = createContent.content.some((i) => i.type === "text");

  useEffect(() => {
    if (currentStep === 2) {
      if (isText) {
        if (isHasText && isHasTextTitle) {
          setIsActiveBtn(true);
        } else {
          setIsActiveBtn(false);
        }
      } else {
        setIsActiveBtn(true);
      }
    } else if (currentStep === 3) {
      if (checkCreateContent(createContent)) {
        setIsActiveBtn(true);
      } else {
        setIsActiveBtn(false);
      }
    } else if (createContent && createContent.articleTypeId) {
      setIsActiveBtn(true);
    }
  }, [currentStep, createContent]);

  const onClick = async (mark: string) => {
    createContent.isPublished = mark !== "foulCopy";
    if (mark === "next") {
      if (currentStep === 3) {
        if (checkCreateContent(createContent)) {
          // createContent.isPublished = isPublished;
          try {
            const { success, article } = await patchArticles(createContent);
            if (success) {
              setCreateContent(article);
              setCurrentStep(4);
            } else {
              setCurrentStep(3);
            }
          } catch (error) {}
        } else {
          setCurrentStep(3);
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else if (mark === "foulCopy") {
      try {
        const { success, article } = await patchArticles(createContent);
        if (success) {
          router.push("/my-articles");
        }
      } catch (error) {}
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  if (currentStep === 1) {
    if (createContent.articleTypeId) {
      return (
        <div className="footerStep">
          <div />
          <YellowButton
            title="Далі"
            yellow={isActiveBtn}
            onClick={() => onClick("next")}
          />
        </div>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      {currentStep === 4 ? (
        <></>
      ) : (
        <div className="footerStep">
          <BlueButton title="Назад" onClick={() => onClick("back")} />
          <div className="footerStep__wrapperBtn">
            <BlueButton
              title="Зберегти чернетку"
              onClick={() => onClick("foulCopy")}
            />

            <YellowButton
              title="Далі"
              yellow={isActiveBtn}
              onClick={() => onClick("next")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FooterStep;
