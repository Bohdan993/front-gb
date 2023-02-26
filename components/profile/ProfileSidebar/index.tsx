import { FC, useState } from "react";
import SideNav from "./SideNav";
import { useRouter } from "next/router";

interface IProps {
  name?: string;
}

const ProfileSidebar: FC<IProps> = ({ name }) => {
  const router = useRouter();
  const routerLocation = router.pathname.includes("/edit");
  const [isHover, setIsHover] = useState(false);

  if (name === "burger") {
    return (
      <aside className="aside_open">
        <SideNav />
      </aside>
    );
  }
  //
  // if (!routerLocation) {
  //   return (
  //     <aside className="aside_open">
  //       <SideNav />
  //     </aside>
  //   );
  // }

  return (
    <aside
      className={isHover ? "aside_open" : "aside"}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <SideNav />
    </aside>
  );
};

export default ProfileSidebar;
