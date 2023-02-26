import Image from "next/image";
import { PropsFromRedux } from "./index";
import { getCurrencies } from "../../../api/creation";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Translate from "../../../inc/locale/Translate";
import CurrencySelector from "./CurrencySelector";
import { setCookie } from "../../../api/cookies";
import { HookOutside } from "../../../Hooks/HookOutside";

const PopupLanguageSelect: FC<PropsFromRedux> = ({
  currentPopup,
  closePopup,
}) => {
  const router = useRouter();
  const [currencies, setCurrencies] = useState([]);
  const [activeLanguage, setActiveLanguage] = useState(router.locale);
  const refPopupOutside = HookOutside(closePopup);
  const bodyRef = useRef(document.body);

  useEffect(() => {
    bodyRef.current.classList.toggle(
      "modalOpen",
      currentPopup === "language-popup"
    );
    return () => {
      bodyRef.current.classList.remove("modalOpen");
    };
  }, [currentPopup]);

  useEffect(() => {
    getCurrencies().then((data) => {
      setCurrencies(data);
    });
  }, []);

  const activeOnClickLanguage = async (language: "uk" | "en") => {
    setActiveLanguage(language);
    await router.push(router.asPath, router.asPath, { locale: language });
    await router.reload();
  };

  useEffect(() => {
    setCookie("language", JSON.stringify(router.locale));
  }, [router.locale]);

  return (
    <div className={`overlay`}>
      <div className="container popup choose_languages" ref={refPopupOutside}>
        <div
          className="close_btn"
          onClick={() => {
            closePopup();
          }}
        >
          <Image
            src="/images/icons/close_popup.svg"
            width={30}
            height={30}
            alt="close button"
          />
        </div>

        <div className=" text-center">
          <h3>
            <Translate string="Choose a language" />
          </h3>
        </div>

        <div className="choose_language_btn ">
          {/*<Link href={router.asPath} locale={"uk"}>*/}
          <div
            className={`ukr ${router.locale === "uk" ? "active" : ""}`}
            onClick={() => activeOnClickLanguage("uk")}
          >
            <Image
              src="/images/ukraine.svg"
              width={44}
              height={44}
              alt="ua"
              className="rounded_flag"
            />

            <span>
              <Translate string="Ukrainian" />{" "}
            </span>
          </div>
          {/*</Link>*/}

          {/*<Link href={router.asPath} locale={"en"}>*/}
          <div
            className={`eng ${router.locale === "en" ? "active" : ""}`}
            onClick={() => activeOnClickLanguage("en")}
          >
            <Image
              src="/images/english.svg"
              width={44}
              height={44}
              alt="eng"
              className="rounded_flag"
            />
            <span>
              <Translate string="English" />
            </span>
          </div>
          {/*</Link>*/}
        </div>
        <div className="text-center">
          <h3 className="currencyH3">
            <Translate string="Choose a currency" />
          </h3>
        </div>

        <CurrencySelector currencies={currencies} />
      </div>
    </div>
  );
};

export default PopupLanguageSelect;
