import Image from "next/image";
import { PropsFromRedux } from "./index";
import { FC, useEffect, useState } from "react";
import PopupLanguageSelect from "../../popup/PopupLanguageSelect";
import PopupPhoneApprovement from "../../popup/PopupPhoneApprovement";
import CustomButtonBlue from "../../UI/CustomButtonBlue";
import ProfileSidebar from "../../profile/ProfileSidebar";
import { getCookie } from "../../../api/cookies";
import { useRouter } from "next/router";
import AvatarBlock from "../../profile/ProfileSidebar/AvatarBlock";
import Translate from "../../../inc/locale/Translate";
import { ICurrency } from "../../../interface/currency";
import { getCurrencies } from "../../../api/currencies";

const Header: FC<PropsFromRedux> = ({ openPopup, currentPopup }) => {
  const router = useRouter();
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const [currency, setCurrency] = useState<ICurrency>();
  const headerClassName = isBurgerMenu ? "header_menu" : "header";
  const [isToken, setIsToken] = useState(true);

  useEffect(() => {
    if (getCookie("token")) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, [router.asPath]);
  useEffect(() => {
    setIsBurgerMenu(false);
  }, [router.asPath]);

  useEffect(() => {
    const currencyLocal = localStorage.getItem("currency");
    const cookieCurrency = Number(getCookie("currencyId"));
    if (currencyLocal && currencyLocal !== "undefined") {
      setCurrency(JSON.parse(currencyLocal));
    } else {
      console.log(cookieCurrency);
      getCurrencies().then((data) => {
        if (data) {
          const currencyData = data.find(({ id, shortName }: ICurrency) =>
            cookieCurrency ? id === cookieCurrency : shortName === "UAH"
          );
          setCurrency(currencyData);
          localStorage.setItem("currency", JSON.stringify(currencyData));
        }
      });
    }
  }, []);

  return (
    <>
      <header>
        <div
          className={`row  text-center   justify-content-between  ${headerClassName}`}
        >
          <div className=" col-2  col-sm-4 col-xl-7  text-center  align-self-center header__logo">
            <div
              className="header__logo_img"
              onClick={() => router.push("/")}
            />
          </div>
          {!isToken ? (
            <>
              <div className="col-4 col-sm-2 col-xl-1  align-self-center justify-content-center  header__language">
                <div
                  className="header__language_menu"
                  onClick={() => openPopup("language-popup")}
                >
                  <div>
                    <div className="icon">
                      {router.locale === "en" ? (
                        <Image
                          src={"/images/english.svg"}
                          alt={"arrow"}
                          height={17}
                          width={20}
                        />
                      ) : (
                        <Image
                          src={"/images/ukraine.svg"}
                          alt={"arrow"}
                          height={17}
                          width={20}
                        />
                      )}
                    </div>
                    /<div> {currency ? currency.symbol : "₴"} </div>
                  </div>
                  <Image
                    src={"/images/icons/arrow-down.svg"}
                    alt={"arrow"}
                    height={6}
                    width={12}
                  />
                </div>
              </div>
              <div className=" col-md-4 col-xl-2 align-self-center p-0 header__buttonExpert">
                <CustomButtonBlue
                  yellow={!isToken && router.asPath !== "/"}
                  title={"Become an expert"}
                  onClick={() => openPopup("phone-popup")}
                />
              </div>
              <div
                className="col-4	col-sm-3 col-md-2  col-xl-1 align-self-center header__enter"
                onClick={() => openPopup("phone-popup")}
              >
                <span>
                  <Translate string="Sign in" />
                </span>
              </div>
            </>
          ) : (
            <div className={"header__wrapper col-4"}>
              <div className=" header__language">
                <div
                  className="header__language_menu"
                  onClick={() => openPopup("language-popup")}
                >
                  <div>
                    <div className="icon">
                      {router.locale === "uk" ? (
                        <Image
                          src={"/images/ukraine.svg"}
                          alt={"arrow"}
                          height={17}
                          width={20}
                        />
                      ) : (
                        <Image
                          src={"/images/english.svg"}
                          alt={"arrow"}
                          height={17}
                          width={20}
                        />
                      )}
                    </div>
                    /<div> {currency ? currency.symbol : "₴"} </div>
                  </div>
                  <Image
                    src={"/images/icons/arrow-down.svg"}
                    alt={"arrow"}
                    height={6}
                    width={12}
                  />
                </div>
              </div>
              <div className=" header__buttonExpert  ">
                <div>
                  <AvatarBlock isHeader={true} />
                </div>
              </div>
            </div>
          )}
          {isToken ? (
            <div className="col-2 align-self-center header__menuBurger">
              <Image
                src={"/images/icons/burger.svg"}
                alt={"arrow"}
                height={16}
                width={24}
                onClick={() => setIsBurgerMenu(!isBurgerMenu)}
              />
              <div
                className={
                  isBurgerMenu
                    ? "header__menuBurger_menu"
                    : "header__menuBurger_menuClose"
                }
              >
                <ProfileSidebar name={"burger"} />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </header>
      {currentPopup === "language-popup" && <PopupLanguageSelect />}
      {currentPopup === "phone-popup" && <PopupPhoneApprovement />}
    </>
  );
};

export default Header;
