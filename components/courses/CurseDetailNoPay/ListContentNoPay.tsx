import { FC } from "react";
import { IListNoPay } from "../../../interface/contentNoPay.props";
import Skeleton from "react-loading-skeleton";
import { useWindowSize } from "../../../Hooks/useWindowSize/useWindowSize";

const ListContentNoPay: FC<{ listContent: IListNoPay }> = ({ listContent }) => {
  const windowWidth = useWindowSize();
  const percent = 68;
  const widthContainer =
    windowWidth && Math.min((windowWidth / 100) * percent, 860); //вычисление процентов
  const lineArr: number[] = [];
  // const widthContainer = 1522;
  const listArr = listContent.items_length;

  return (
    <div className="listContentNoPay">
      <div className="listContentNoPay__leftBlock" />
      <div className="listContentNoPay__rightBlock">
        {listArr?.map((list, index) => {
          const lengthPx = list * 15;
          const currentLine = widthContainer && lengthPx / widthContainer;
          while (currentLine && currentLine > lineArr.length) {
            lineArr.push(1);
          }

          return (
            <div className="listContentNoPay__rightBlock_list" key={index}>
              {lineArr.map((item, index) => (
                <Skeleton
                  width={widthContainer}
                  enableAnimation={false}
                  key={index}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListContentNoPay;
