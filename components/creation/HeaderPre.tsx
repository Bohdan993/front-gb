import { FC } from "react";
import ButtonPreview from "../UI/ButtonPreview";
import Image from "next/image";
import { useRouter } from "next/router";
import BlueButton from "../UI/BlueButton";
import { postAdminIsOpen } from "../../api/admin";

interface IProps {
  currentStep: number;
  date: string;
}

const HeaderPre: FC<IProps> = ({ currentStep, date }) => {
  const router = useRouter();
  const createDate = date ? new Date(date).toLocaleDateString("uk-UK") : "";

  if (currentStep === 4) {
    return <></>;
  }
  const onClickPreview = () => {
    const slug = router.query.slug;
    window.open(`/me/${slug}`, "_blank");
  };

  const clickBack = () => {
    // postAdminIsOpen(false, article.article.id).then((data) => {
    //   console.log(data);
    // });
    router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/articles`);
  };

  return (
    <>
      {/*{currentStep !== 3 && (*/}
      <div className="headerPre">
        {currentStep === 1 ? (
          <h1>Тип контенту</h1>
        ) : (
          <div className="headerPre__addContent">
            <div className="headerPre__addContent_wrapper">
              <h1>
                {currentStep !== 3
                  ? "Додай контент до продукту"
                  : "Створи контент"}
              </h1>
              <ButtonPreview onClick={onClickPreview} />
            </div>
          </div>
        )}
        {currentStep === 2 ? (
          <div className="headerPre__saveData">
            <Image
              src="/images/icons/icon_save.svg"
              height={32}
              width={32}
              alt="icon"
            />
            <span>{createDate}</span>
          </div>
        ) : (
          <></>
        )}
        {router.asPath.includes("/admin") ? (
          <BlueButton title={"Назад"} onClick={() => clickBack()} />
        ) : (
          <></>
        )}
      </div>
      {/*)}*/}
    </>
  );
};

export default HeaderPre;
