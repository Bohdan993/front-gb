import { FC, ReactNode } from "react";
import Header from "../Header";
import StickyBox from "react-sticky-box";
import ProfileSidebar from "../../profile/ProfileSidebar";
import Footer from "../Footer";
import { useRouter } from "next/router";

interface IProps {
  children?: ReactNode;
}
const Layout: FC<IProps> = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Header />
      <>
        <main className={router.asPath === "/" ? "" : "layout__web"}>
          {router.asPath === "/" ||
          router.asPath === "/terms-and-conditions" ||
          router.asPath.startsWith("/me/") ? (
            <></>
          ) : (
            <StickyBox
              offsetTop={20}
              offsetBottom={20}
              className="layout__sticky d-none d-md-block"
            >
              <ProfileSidebar />
            </StickyBox>
          )}
          {children}
        </main>
      </>
      <Footer />
    </>
  );
};

export default Layout;
