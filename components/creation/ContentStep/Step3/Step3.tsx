import SelectCategory from "../../../UI/SelectR";
import SelectLanguage from "../../../UI/SelectR";
import InputCustom from "../../../UI/InputCustom";
import TextArea from "../../../UI/textarea";
import { ChangeEvent, FC, useEffect, useState } from "react";
import List from "../../../UI/List";
import ButtonPlus from "../../../UI/ButtonPlus";
import { PropsFromRedux } from "./index";
import PriceStep from "./PriceStep";
import { getCategories, getLanguages } from "../../../../api/creation";
import { IOptionsSelect } from "../../../../interface/articles.props";

const Step3: FC<PropsFromRedux> = ({ createContent, setCreateContent }) => {
  const newCreateContent = { ...createContent };
  const [inputTitle, setInputTitle] = useState<string>(
    newCreateContent.title ? newCreateContent.title : ""
  );
  const [description, setDescription] = useState<string>(
    newCreateContent.description ? newCreateContent.description : ""
  );
  const [descriptionItems, setDescriptionItem] = useState(
    newCreateContent.descriptionItems ? newCreateContent.descriptionItems : []
  );
  const [optionsCategory, setOptionsCategory] = useState<IOptionsSelect[]>([]);
  const [optionsLanguage, setOptionsLanguage] = useState<IOptionsSelect[]>([]);
  useEffect(() => {
    window.scrollTo(0, 0);

    getCategories().then((categories) => {
      setOptionsCategory([{id:0, title:"Категорія"}, ...categories]);
    });

    getLanguages().then((languages) => {
      setOptionsLanguage([{id:0, title:"Мова"}, ...languages]);
    });
  }, []);

  const onBlurInput = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    newCreateContent.title = title;
    // newCreateContent.slug = newCreateContent.slug + title;
    setInputTitle(title);
    setCreateContent(newCreateContent);
  };

  const omBlurTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    newCreateContent.description = description;
    setDescription(description);
    setCreateContent(newCreateContent);
  };

  const omBlurList = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target && event.target.value;
    descriptionItems[index] = { title: value };
    newCreateContent.descriptionItems = descriptionItems;
    setCreateContent(newCreateContent);
  };

  const onChangeSelect = (newValue: number | null, name: string) => {
    const newData = { ...newCreateContent, [name]: newValue };
    setCreateContent(newData);
  };

  const onClickAdd = () => {
    // const number = descriptionItems.length + 1;
    setDescriptionItem([...descriptionItems, { title: "" }]);
  };

  const onChangePrice = (price: number) => {
    newCreateContent.price = price;
    setCreateContent(newCreateContent);
  };
  const onChangeCurrency = (currencyId: number | null) => {
    newCreateContent.currencyId = currencyId;
    setCreateContent(newCreateContent);
  };

  const deleteList = (index: number) => {
    const newDescriptionItems = [...descriptionItems];
    newDescriptionItems.splice(index, 1);
    setDescriptionItem(newDescriptionItems);
  };

  return (
    <div className="step3">
      {/*<h1>Створи контент</h1>*/}
      <div className="step3__name">
        <InputCustom
          name="title"
          type="text"
          placeholder="додай назву"
          title="Назва товару"
          onBlur={onBlurInput}
          value={inputTitle}
        />
      </div>
      <div className="step3__description">
        <TextArea
          placeholder="додай опис"
          onBlur={omBlurTextarea}
          title="Опис товару"
          value={description}
        />
      </div>
      <div className="step3__list">
        {descriptionItems.map((list, index) => (
          <List
            onBlur={omBlurList}
            value={list.title}
            index={index}
            key={index}
            onClickDelete={() => deleteList(index)}
          />
        ))}
        <ButtonPlus onClickAdd={onClickAdd} />
      </div>
      <div className="step3__category">
        <SelectCategory
          title="Категорія"
          placeholder="категорія"
          options={optionsCategory}
          name="categoryId"
          onChange={onChangeSelect}
          valueId={createContent.categoryId ? createContent.categoryId : 0}
        />
      </div>
      <div className="step3__language">
        <SelectLanguage
          title="Мова"
          placeholder="обери мову"
          options={optionsLanguage}
          name="languageId"
          onChange={onChangeSelect}
          valueId={createContent.languageId ? createContent.languageId : 0}
        />
      </div>
      <div className="step3__price">
        {/*grid*/}
        <PriceStep
          onChange={onChangePrice}
          onChangeCurrency={onChangeCurrency}
          valueId={createContent.currencyId ? createContent.currencyId : 0}
          totalPrice={createContent.price ? createContent.price : 0}
        />
        {/*bootstrap*/}
        {/*<PriceStep3 onChange={onChangePrice} />*/}
      </div>
    </div>
  );
};

export default Step3;
