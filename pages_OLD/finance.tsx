import { FC, useEffect, useState } from "react";
import SingleArticleReport from "../components/articles/SingleArticleReport";
import { GetServerSideProps } from "next";
import { IUserArticles } from "../interface/user.props";
import { getFinanceArticles, getFinanceArticlesDeleted } from "../api/articles";
import YellowButton from "../components/UI/YellowButton";
import FinanceEarn from "../components/articles/FinanceEarn";
import CustomButtonYellow from "../components/UI/CustomButtonYellow";
import PopupWithdrawal from "../components/popup/PopupWithdrawal/PopupWithdrawal";
import FinanceReport from "../components/articles/FinanceReport";
import { IBankCard } from "../interface/bankCard";

interface IProps {
  myFinance: IUserArticles;
  bankCards: IBankCard[];
}
export const roundNumber = (number: number | string | undefined) => {
  // Math.round((Number(number) * 100) / 100);
  return Number(number).toFixed(2);
};

const Finance: FC<IProps> = ({ myFinance, bankCards }) => {
  const { currency, totalCount, totalAmount, paidOut, withdrawalBalance } =
    myFinance;
  const balance = roundNumber(myFinance.balance);

  const [openPopup, setOpenPopup] = useState(false);
  const [isWithdrawAvailable, setWithdrawAvailable] = useState(bankCards.length ? true : false);
  const [articlesArr, setArticlesArr] = useState(myFinance.articles);
  const [deletedArticles, setDeletedArticles] = useState<
    IUserArticles["articles"]
  >([]);
  const [isCurrentPage, setIsCurrentPage] = useState(myFinance.currentPage + 1);
  const [fetching, setFetching] = useState(false);
  const [currencyId, setCurrencyId] = useState();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currency") || "{}");
    setCurrencyId(data.id);
  }, []);

  const scrollHandler = (e: any) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    if (scrollHeight - (scrollTop + innerHeight) < 300) {
      setFetching(true);
    }
  };

  const loadDeleted = () => {
    getFinanceArticlesDeleted().then((data) => {
      setDeletedArticles(data.articles);
    });
  };

  useEffect(() => {
    if (isCurrentPage - 1 < myFinance.totalPages) {
      if (fetching) {
        getFinanceArticles(isCurrentPage, currencyId).then((data) => {
          setArticlesArr([...articlesArr, ...data.articles]);
          setIsCurrentPage((prevState) => prevState + 1);
          setFetching(false);
        });
      }
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <section className="container75">
        <div className="finance">
          <div className="finance_wrapper">
            <div className="finance__balance">
              <h1>Баланс</h1>
              <h2>
                {balance} {currency?.symbol}
              </h2>
            </div>
            {isWithdrawAvailable ? (
              <CustomButtonYellow
                title={"Вивести кошти"}
                onClick={() => setOpenPopup(true)}
              />
            ) : (
              <></>
            )}
          </div>
          {isWithdrawAvailable ? <></> : <FinanceEarn isWithdrawAvailable={isWithdrawAvailable} setWithdrawAvailable={setWithdrawAvailable} />}

          <FinanceReport
            totalCount={totalCount}
            currencySymbol={currency?.symbol ? currency.symbol : ""}
            totalAmount={totalAmount}
            paidOut={roundNumber(paidOut)}
            withdrawalBalance={roundNumber(withdrawalBalance)}
          />
          {articlesArr.map((article) => (
            <SingleArticleReport article={article} key={article.id} />
          ))}

          {myFinance.isDeleted ? (
            <div className="deletedBlock">
              {deletedArticles.length ? (
                <>
                  <h2 className="mt-4 mb-2 text-center">Архівні статті</h2>
                  {deletedArticles.map((article) => (
                    <SingleArticleReport article={article} key={article.id} />
                  ))}
                </>
              ) : (
                <YellowButton
                  title="Завантажити архівні статті"
                  yellow={true}
                  onClick={loadDeleted}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
      {openPopup ? (
        <PopupWithdrawal
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          totalBalance={Number(balance)}
          currentCurrency={currency}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Finance;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const token =
    req && req.cookies && req.cookies["token"] ? req.cookies["token"] : "";
  const currencyId =
    req && req.cookies && req.cookies["currencyId"]
      ? req.cookies["currencyId"]
      : "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-finance?currencyId=${currencyId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
    }
  );
  const resBankCards = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/bank-cards`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
    }
  );

  const myFinance = await res.json();
  const dataBankCards = await resBankCards.json();
  const { bankCards } = dataBankCards;
  return {
    props: { myFinance, bankCards },
  };
};
