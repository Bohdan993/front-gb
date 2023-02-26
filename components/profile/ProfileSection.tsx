import React, { FC } from "react";
import AvatarProfile from "./AvatarProfile";
import { IUser } from "../../interface/user.props";

interface IProps {
  userData: IUser;
}
const ProfileSection: FC<IProps> = ({ userData }): JSX.Element => {
  return (
    <section>
      <div className="profileSection">
        <AvatarProfile
          avatar={userData && userData.avatar_id}
          name={userData && userData.name}
          specialization={userData && userData.specialization}
        />
        <span className="profileSection__slogan">
          {userData && userData.description}
        </span>
      </div>
    </section>
  );
};

export default ProfileSection;
