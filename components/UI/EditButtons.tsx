import Image from "next/image";
import React from "react";

const deleteBtn = "/images/icons/delete.svg";
const editBtn = "/images/icons/Edit.svg";

const EditButtons = () => {
  return (
    <div className="editButtons">
      <div className="editButtons__delete">
        <Image
          priority={true}
          src={deleteBtn}
          height={32}
          width={25}
          alt={"delete"}
        />
      </div>
      <div className="editButtons__edit">
        <Image
          priority={true}
          src={editBtn}
          height={28}
          width={28}
          alt={"icon"}
        />
      </div>
    </div>
  );
};

export default EditButtons;
