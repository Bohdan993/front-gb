import { FC } from "react";
interface IProps {
  title: string;
  current: number | string | undefined;
  currencySymbol: string;
}

const TitleCurrentReport: FC<IProps> = ({ title, current, currencySymbol }) => {
  return (
    <div className="titleCurrentReport">
      <span className="titleCurrentReport_title">{title}</span>
      <span className="titleCurrentReport_current">
        {current} {currencySymbol}
      </span>
    </div>
  );
};

export default TitleCurrentReport;
