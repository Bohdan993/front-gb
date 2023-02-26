import React, { FC } from "react";
import { ITextContent } from "../../../store/creation/creation.props";

const TextContent: FC<{ textContent: ITextContent }> = ({ textContent }) => {
  return (
    <div className="textContent">
      <h2>{textContent.title}</h2>
      <p>{textContent.content}</p>
    </div>
  );
};

export default TextContent;
