import React, { FC, useEffect, useState } from "react";
import ButtonPreview from "../../../UI/ButtonPreview";
import BlueButton from "../../../UI/BlueButton";
import Image from "next/image";
import { useRouter } from "next/router";
import { PropsFromRedux } from "./index";
import { getArticles } from "../../../../api/articles";

const Success: FC<PropsFromRedux> = ({ createContent, setCurrentStep }) => {
  const router = useRouter();
  const [articlesLength, setArticlesLength] = useState<number>(0);
  const onClickPreview = async () => {
    await router.push(`/me/${createContent.slug}`);
    await setCurrentStep(0);
  };
  const onClickProfile = async () => {
    await router.push(`/profile`);
    await setCurrentStep(0);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const data = JSON.parse(localStorage.getItem("currency") || "{}");
    getArticles(1, data.id).then((data) => {
      setArticlesLength(data.articles.length);
    });
  }, []);
  return (
    <div className="success">
      <Image
        src="/images/icons/illustration_arrow.svg"
        height={128}
        width={133}
        alt="ok"
      />
      <h1>
        {articlesLength > 1
          ? "Продукт успішно створено!"
          : "Твій профіль успішно створено!"}
      </h1>
      <p>
        {articlesLength > 1
          ? "Саме час почати його продавати!"
          : "Саме час почати шерити свої знання світу!"}
      </p>
      <div className="success__btn">
        <ButtonPreview onClick={onClickPreview} />
        <BlueButton title="До мого кабінету" onClick={onClickProfile} />
      </div>
    </div>
  );
};

export default Success;
