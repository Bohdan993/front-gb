import { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}
const ContentLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="contentLayout">
      {/*<Image*/}
      {/*  src="/images/icons/Icon_type_content.svg"*/}
      {/*  alt="icon"*/}
      {/*  height={30}*/}
      {/*  width={30}*/}
      {/*/>*/}
      {children}
      {/*<BlueButton*/}
      {/*  title="Pедагувати"*/}
      {/*  onClick={() => onclickDiv(index)}*/}
      {/*/>*/}
    </div>
  );
};

export default ContentLayout;
