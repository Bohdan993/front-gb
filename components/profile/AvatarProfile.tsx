import React, { FC } from "react";
import Image from "next/image";

interface IProps {
  avatar: string;
  name: string;
  specialization: string;
}

const AvatarProfile: FC<IProps> = ({ avatar, name, specialization }) => {
  return (
    <>
      <div className="avatarProfile">
        <Image
          priority={true}
          src={
            avatar
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${avatar}`
              : "/images/icons/ava_icon.svg"
          }
          height={150}
          width={150}
          alt={"icon"}
          objectFit="cover"
        />
        <span className="avatarProfile_name">{name ? name : "name"}</span>
        <span className="avatarProfile_status">
          {specialization ? specialization : "specialization"}
        </span>
      </div>
    </>
  );
};

export default AvatarProfile;
