import React, { FC } from "react";
import Image from "next/image";
import DynamicFont from "react-dynamic-font";

interface IProps {
  currencySymbol: string;
  totalCount?: number;
  totalAmount?: number;
  paidOut?: number;
  withdrawalBalance: number;
}

const AllFinanceReport: FC<IProps> = ({
  totalCount,
  currencySymbol,
  totalAmount,
  paidOut,
  withdrawalBalance,
}) => {
  return (
    <section className="allFinanceReport">
      <div className="allFinanceReport__report">
        <div className="allFinanceReport__report_wrapper">
          <div className="allFinanceReport__report_wrapper_imgTitle">
            <div className="allFinanceReport__report_wrapper_imgTitle_img">
              <Image
                priority={true}
                src={"/images/icons/briefcase.svg"}
                height={44}
                width={44}
                alt={"icon"}
              />
            </div>
            <span className="allFinanceReport__report_wrapper_imgTitle_title">
              {"Всього продажів:"}
            </span>
          </div>
          <span className="allFinanceReport__report_wrapper_current">
            <DynamicFont content={String(`${totalCount}`)} />
          </span>
          {/*<TitleCurrentReport current={report.current} title={report.title} />*/}
        </div>
      </div>
      <div className="allFinanceReport__report">
        <div className="allFinanceReport__report_wrapper">
          <div className="allFinanceReport__report_wrapper_imgTitle">
            <div className="allFinanceReport__report_wrapper_imgTitle_img">
              <Image
                priority={true}
                src={"/images/icons/database.svg"}
                height={44}
                width={44}
                alt={"icon"}
              />
            </div>
            <span className="allFinanceReport__report_wrapper_imgTitle_title">
              {"Сума проданого:"}
            </span>
          </div>
          <span className="allFinanceReport__report_wrapper_current">
            <DynamicFont content={String(`${totalAmount} ${currencySymbol}`)} />
          </span>
          {/*<TitleCurrentReport current={report.current} title={report.title} />*/}
        </div>
      </div>
      <div className="allFinanceReport__report">
        <div className="allFinanceReport__report_wrapper">
          <div className="allFinanceReport__report_wrapper_imgTitle">
            <div className="allFinanceReport__report_wrapper_imgTitle_img">
              <Image
                priority={true}
                src={"/images/icons/credit-card.svg"}
                height={44}
                width={44}
                alt={"icon"}
              />
            </div>
            <span className="allFinanceReport__report_wrapper_imgTitle_title">
              {"Виплачено:"}
            </span>
          </div>
          <span className="allFinanceReport__report_wrapper_current">
            <DynamicFont content={String(`${paidOut} ${currencySymbol}`)} />
          </span>
          {/*<TitleCurrentReport current={report.current} title={report.title} />*/}
        </div>
      </div>
      {withdrawalBalance > 0 ? (
        <div className="allFinanceReport__report">
          <div className="allFinanceReport__report_wrapper">
            <div className="allFinanceReport__report_wrapper_imgTitle">
              <div className="allFinanceReport__report_wrapper_imgTitle_img">
                <Image
                  priority={true}
                  src={"/images/icons/credit-card.svg"}
                  height={44}
                  width={44}
                  alt={"icon"}
                />
              </div>
              <span className="allFinanceReport__report_wrapper_imgTitle_title">
                {"На вивід:"}
              </span>
            </div>
            <span className="allFinanceReport__report_wrapper_current">
              <DynamicFont
                content={String(`${withdrawalBalance} ${currencySymbol}`)}
              />
            </span>
            {/*<TitleCurrentReport current={report.current} title={report.title} />*/}
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default AllFinanceReport;
