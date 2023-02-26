import Link from "next/link";
import { useRouter } from "next/router";
import SvgProfile from "./svg/SvgProfile";
import SvgCabinet from "./svg/SvgCabinet";
import SvgFinance from "./svg/SvgFinance";
import SvgSettings from "./svg/SvgSettings";
import SvgExit from "./svg/SvgExit";
import React, { FC, useEffect, useState } from "react";
import SvgFrame from "./svg/SvgFrame";
import AvatarBlock from "./AvatarBlock";
import { getCookie } from "../../../api/cookies";
import { IExpertProps } from "../../../store/expert/expert.props";
import { connect, ConnectedProps } from "react-redux";

const SideNav: FC<PropsFromRedux> = ({ expertData }) => {
  const router = useRouter();
  const [isToken, setIsToken] = useState<boolean>();

  const logOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const token = getCookie("token");
    setIsToken(!!token);
  }, []);
  if (isToken === false) {
    return <></>;
  }

  return (
    <nav className="aside__nav">
      <AvatarBlock />
      <ul className="aside__nav__menu">
        {expertData.name || expertData.avatar_id ? (
          <li
            className={
              router.pathname == "/profile"
                ? "aside__nav__menu_item_active"
                : "aside__nav__menu_item"
            }
          >
            <Link href="/profile">
              <a className="aside__nav__menu_item_link">
                <SvgProfile />
                <span className="nav__title">Моя сторінка</span>
              </a>
            </Link>
          </li>
        ) : (
          <></>
        )}
        <li
          className={
            router.pathname == "/my-articles"
              ? "aside__nav__menu_item_active"
              : "aside__nav__menu_item"
          }
        >
          <Link href="/my-articles">
            <a className="aside__nav__menu_item_link aside__nav__menu_item_link-Active">
              <SvgCabinet />
              <span className="nav__title">Мої продукти</span>
            </a>
          </Link>
        </li>
        <li
          className={
            router.pathname == "/bought-articles"
              ? "aside__nav__menu_item_active"
              : "aside__nav__menu_item"
          }
        >
          <Link href="/bought-articles">
            <a className="aside__nav__menu_item_link">
              <SvgFrame />
              <span className="nav__title">Куплені</span>
            </a>
          </Link>
        </li>
        {expertData.name || expertData.avatar_id ? (
          <li
            className={
              router.pathname == "/finance"
                ? "aside__nav__menu_item_active"
                : "aside__nav__menu_item"
            }
          >
            <Link href="/finance">
              <a className="aside__nav__menu_item_link">
                <SvgFinance />
                <span className="nav__title">Фінанси</span>
              </a>
            </Link>
          </li>
        ) : (
          <></>
        )}
        <li
          className={`aside__nav__menu_item ${
            router.pathname == "/settings" ? "aside__nav__menu_item_active" : ""
          }`}
        >
          <Link href="/settings">
            <a className="aside__nav__menu_item_link">
              <SvgSettings />
              <span className="nav__title">Налаштування</span>
            </a>
          </Link>
        </li>
        <li
          className={
            router.pathname == "#"
              ? "aside__nav__menu_item_active"
              : "aside__nav__menu_item"
          }
          onClick={logOut}
        >
          <div className="aside__nav__menu_item_link">
            <SvgExit />
            <span className="nav__title">Вихід</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

const mapState = ({ expert }: { expert: IExpertProps }) => {
  const { expertData } = expert;
  return {
    expertData,
  };
};
const connector = connect(mapState);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SideNav);
