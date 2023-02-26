import React, { FC, useEffect, useState } from "react";
import DynamicFont from "react-dynamic-font";
import { IExpertProps } from "../../../store/expert/expert.props";
import { connect, ConnectedProps } from "react-redux";
import { postUserData } from "../../../api/user";
import { getCookie, setCookie } from "../../../api/cookies";
import { useRouter } from "next/router";
import store from "../../../store";
import CustomButtonBlue from "../../UI/CustomButtonBlue";

interface IProps extends PropsFromRedux {
  isHeader?: boolean;
}

const AvatarBlock: FC<IProps> = ({ expertData, setExpert, isHeader }) => {
  const router = useRouter();
  const [user, setUser] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (getCookie("token")) {
      if (
        (localStorage.getItem("user") &&
          localStorage.getItem("user") !== "undefined") ||
        (expertData && expertData.id)
      ) {
        setUser(JSON.parse(localStorage.getItem("user") || `{}`));
        setExpert(JSON.parse(localStorage.getItem("user") || `{}`));
      } else {
        postUserData().then((data) => {
          if (data && data.success && data.user) {
            setUser(data.user);
            setExpert(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            // localStorage.setItem("user", JSON.stringify(undefined));
          } 
        });
      }
    } else {
      // router.reload();
    }
  }, []);

  useEffect(() => {
    if (expertData.name || expertData.avatar_id) {
      setUser(expertData);
    } else if (getCookie("token")) {
      postUserData().then((data) => {
        if (data && data.success && data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          postUserData().then((data) => {
            if (data && data.success && data.user) {
              setUser(data.user);
              localStorage.setItem("user", JSON.stringify(data.user));
            } else {
              setCookie("token", "");
              router.reload();
            }
          });
        }
      });
    }
  }, [expertData]);
  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("user") !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user") || `{}`));
    }
  }, []);
  return (
    <>
      {user.name || user.avatar_id ? (
        <div
          className="aside__nav__avatar"
          onClick={() => router.push("/profile")}
        >
          <picture>
            <img
              src={
                user.avatar_id
                  ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${user.avatar_id}`
                  : "/images/icons/ava_icon.svg"
              }
              alt={"icon"}
            />
          </picture>
          <div className="aside__nav__avatar_wrapper">
            {isHeader ? (
              <span className="aside__nav__avatar_wrapper_name">
                <DynamicFont content={user.name ? user.name : "Твоє імʼя"} />
              </span>
            ) : (
              <span className="aside__nav__avatar_wrapper_name">
                {user.name ? user.name : "Твоє імʼя"}
              </span>
            )}
            <span className="aside__nav__avatar_wrapper_type">
              <DynamicFont
                content={
                  user.specialization
                    ? user.specialization
                    : "Твоя спеціалізація"
                }
              />
            </span>
          </div>
        </div>
      ) : (
        <CustomButtonBlue
          title={"Стати експертом"}
          yellow={isHeader}
          onClick={() => router.push("/become-expert")}
        />
      )}
    </>
  );
};

const mapState = ({ expert }: { expert: IExpertProps }) => {
  const { expertData } = expert;
  return {
    expertData,
  };
};
const mapDispatch = {
  setExpert: (data: IExpertProps["expertData"]) => {
    const { expertData } = store.getState().expert;
    let newData = { ...expertData, data };
    newData = data;
    return {
      type: "SET_EXPERT_DATA",
      expertData: newData,
    };
  },
};
const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AvatarBlock);
