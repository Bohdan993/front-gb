import Skeleton from "react-loading-skeleton";
import { FC, useEffect, useState } from "react";
import { ITextNoPay } from "../../../interface/contentNoPay.props";
import { useWindowSize } from "../../../Hooks/useWindowSize/useWindowSize";

const TextContentNoPay: FC<{ textContent: ITextNoPay }> = ({ textContent }) => {
  const windowWidth = useWindowSize();
  const percent = 80;
  const widthContainer =
    windowWidth && Math.min((windowWidth / 100) * percent, 1016); //вычисление процентов
  const [lineArr, setLineArr] = useState<number[]>([]);
  const content_length = textContent.content_length
    ? textContent.content_length
    : 0;
  // const widthContainer = 1691;
  const lengthPx = content_length * 15;
  const currentLine = widthContainer && lengthPx / widthContainer;
  useEffect(() => {
    const newArr = [];
    while (currentLine && currentLine > newArr.length) {
      newArr.push(1);
    }
    setLineArr(newArr);
  }, [currentLine, content_length]);
  return (
    <div className="textContent">
      <h2>{textContent.title}</h2>
      {lineArr.map((item, index) => {
        return (
          <Skeleton
            width={widthContainer}
            enableAnimation={false}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default TextContentNoPay;
