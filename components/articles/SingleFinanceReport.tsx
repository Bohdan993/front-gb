import TitleCurrentReport from "./TitleCurrentReport";
import { FC } from "react";
import { roundNumber } from "../../pages/finance";

interface IProps {
  currencySymbol: string;
  boughtAmount: number | undefined;
  boughtCount: number | undefined;
}

const SingleFinanceReport: FC<IProps> = ({
  boughtAmount,
  boughtCount,
  currencySymbol,
}) => {
  return (
    <section className="singleFinanceReport">
      <TitleCurrentReport
        title={"Всього продажів:"}
        current={boughtCount}
        currencySymbol={""}
      />
      <TitleCurrentReport
        title={"Сума проданого:"}
        current={roundNumber(boughtAmount)}
        currencySymbol={currencySymbol}
      />

      {/*<TitleCurrentReport*/}
      {/*  title={"Виплачено:"}*/}
      {/*  current={0}*/}
      {/*  currencySymbol={currencySymbol}*/}
      {/*/>*/}
    </section>
  );
};

export default SingleFinanceReport;
