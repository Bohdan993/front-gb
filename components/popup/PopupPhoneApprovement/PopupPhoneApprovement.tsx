import Image from "next/image";
import dynamic from "next/dynamic";
import { ChangeEvent, FC, useEffect, useRef } from "react";
import { PropsFromRedux } from "./index";
import { useState } from "react";
import { postLoginPhone, postLoginSmsCode } from "../../../api/auth";
import InputPhone from "../../UI/InputPhone";
import { postUserData } from "../../../api/user";
import { useRouter } from "next/router";
import { postPayment } from "../../../api/payment";
import { HookOutside } from "../../../Hooks/HookOutside";
import Translate from "../../../inc/locale/Translate";

const ReactCodeInput = dynamic(import("react-code-input"));
const props = {
  className: "input_code",
  inputStyle: {
    background: "#FFFFFF",
    border: "1px solid #C4CFD6",
    borderRadius: "6px",
    marginRight: "10px",
    outlineColor: "#1229C6",
    textAlign: "center" as const,
  },
};
const PopupPhoneApprovement: FC<PropsFromRedux> = ({
  closePopup,
  currentPopup,
  setExpert,
  expertData,
  buyArticleID,
  setBuyArticleID,
}) => {
  const router = useRouter();
  const isAdminPage = router.asPath.includes("/admin");
  const [code, setCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [confirmCode, setConfirmCode] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [focus, setFocus] = useState(false);
  let expertNewData = { ...expertData };

  const bodyRef = useRef(document.body);

  useEffect(() => {
    bodyRef.current.classList.toggle(
      "modalOpen",
      currentPopup === "phone-popup"
    );
    return () => {
      bodyRef.current.classList.remove("modalOpen");
    };
  }, [currentPopup]);

  useEffect(() => {
    setFocus(currentPopup === "phone-popup");
  }, [currentPopup]);

  const onClickPhone = (name: string) => {
    const newData = { phone: phoneNumber };

    postLoginPhone(newData).then((data) => {
      if (data.success === true) {
        setCode(data.smsCode.toString());
        name === "phone" && setConfirmCode(true);
      }
    });
  };

  const onClickSmsCode = () => {
    if (phoneNumber && code) {
      postLoginSmsCode(phoneNumber, code).then(() => {
        postUserData().then((data) => {
          if (!data.success) {
            setIsError(true);
          } else {
            setIsError(false);
            const user = data.user;
            expertNewData = user;
            setExpert(expertNewData);
            localStorage.setItem("user", JSON.stringify(user));
            setPhoneNumber("");
            setCode("");
            setConfirmCode(false);
            closePopup();
            if (buyArticleID) {
              postPayment(buyArticleID).then((data) => {
                if (data.success) {
                  window.location.href = data.checkout_url;
                } else {
                }
              });
            } else {
              if (
                !user ||
                (!user.description &&
                  !user.name &&
                  !user.specialization &&
                  !user.avatar_id)
              ) {
                router.push("/become-expert/");
                // window.location.href = "/become_expert/"
              } else {
                if (router.asPath === "/") {
                  router.push("/profile/");
                  // window.location.href = "/profile/"
                } else {
                  router.reload();
                }
              }
            }
          }
        });
      });
    }
  };

  const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const phone = value.replaceAll(/[\s\(\)-]/g, "");
    setPhoneNumber(phone);
  };
  const refPopupOutside = HookOutside(() => {
    closePopup;
    setBuyArticleID(null);
  });
  // ${
  //        currentPopup === "phone-popup" ? "open_popup" : ""
  //      }
  return (
    <div className={`overlay`}>
      <div
        className="container popupEarn confirmation_phone"
        ref={isAdminPage ? null : refPopupOutside}
      >
        {isAdminPage ? (
          <></>
        ) : (
          <div
            className="close_btnPopup"
            onClick={() => {
              setBuyArticleID(null);
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
        )}
        <div className="illustration_phone">
          <div className="illustration_phone_img">
            <Image
              src="/images/illustration_phone.svg"
              width={252}
              height={176}
              alt="illustration phone"
            />
          </div>
        </div>
        {confirmCode ? (
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <h1>
                  <Translate string="confirmPhone" />
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <span className="send_code_subtitle">
                  <Translate string={"CodeSent"} /> {phoneNumber}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col text-center code">
                <ReactCodeInput
                  type="text"
                  fields={4}
                  name="code"
                  {...props}
                  inputMode="numeric"
                  className="input_code"
                  onChange={(value: string) => setCode(value)}
                  value={code}
                />
                {isError ? (
                  <div className="errorSmsCode">
                    <Translate string={"InvalidCode"} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col text-center  repeated_send_code">
                <span>
                  <Translate string={"Didn't get the code?"} />
                </span>
                <a href="#" onClick={() => onClickPhone("repeat")}>
                  <Translate string={"Resend"} />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col text-center ">
                <button className="submit_code" onClick={onClickSmsCode}>
                  <Translate string={"Confirm"} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <h1>
                  <Translate string={"Confirm it's really you"} />
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <p>
                  <Translate string={"security"} />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col phone_form">
                <InputPhone blurHandler={blurHandler} focus={focus} />
                <button onClick={() => onClickPhone("phone")}>
                  <Translate string={"Confirm"} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupPhoneApprovement;
