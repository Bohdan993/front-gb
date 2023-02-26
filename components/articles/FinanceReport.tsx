import React, { FC } from "react";
import DynamicFont from "react-dynamic-font";

interface IProps {
  currencySymbol: string;
  totalCount?: number;
  totalAmount?: number;
  paidOut?: string;
  withdrawalBalance: string;
}

const FinanceReport: FC<IProps> = ({
  totalCount,
  currencySymbol,
  totalAmount,
  paidOut,
  withdrawalBalance,
}) => {
  const financeReports = [
    {
      id: 1,
      icon: "/images/icons/briefcase.svg",
      title: "Всього продажів:",
      amount: String(totalCount),
    },
    {
      id: 2,
      icon: "/images/icons/database.svg",
      title: "Сума проданого:",
      amount: String(totalAmount) + " " + currencySymbol,
    },
    {
      id: 3,
      icon: "/images/icons/credit-card.svg",
      title: "Виплачено:",
      amount: String(paidOut + " " + currencySymbol),
    },
  ];
  return (
    <section className="row justify-content-between oneArticle financeReport">
      {financeReports.map((financeReport) => (
        <div
          className={`financeReport__item widthItem__${
            withdrawalBalance === "0.00"
              ? "three col-4 "
              : "four col-lg-3 col-6"
          } `}
          key={financeReport.id}
        >
          <div className="financeReport__item_wrapper">
            <div className="financeReport__item-wrapper">
              <picture>
                <img
                  src={financeReport.icon}
                  alt="icon"
                  className="financeReport__item-img"
                />
              </picture>
              <div className="financeReport__item-title">
                {financeReport.title}
              </div>
            </div>
            <div className="financeReport__item-amount">
              <DynamicFont content={financeReport.amount} />
            </div>
          </div>
        </div>
      ))}
      {withdrawalBalance !== "0.00" ? (
        <div className="financeReport__item  col-lg-3 col-6 ">
          <div className="financeReport__item_wrapper">
            <div className="financeReport__item-wrapper">
              <picture>
                <img
                  src="/images/icons/credit-card.svg"
                  alt="icon"
                  className="financeReport__item-img"
                />
              </picture>
              <div className="financeReport__item-title">{"На вивід:"}</div>
            </div>
            <div className="financeReport__item-amount">
              <DynamicFont
                content={String(withdrawalBalance + " " + currencySymbol)}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default FinanceReport;
