import { FC, useEffect, useRef, useState } from "react";
import { PropsFromRedux } from "./index";

import ContentCategories from "../../ContentCategories";
import NavBarContent from "./NavBarContent";
import ContentLayout from "../ContentLayout";

import TextContent from "../AddTextContent";
import PhotoContent from "../AddPhotoContent";
import FileContent from "../AddFileContent";
import ListContent from "../AddListContent";
import { patchArticles } from "../../../../../api/creation";
import BlueButton from "../../../../UI/BlueButton";

const AddContent: FC<PropsFromRedux> = ({
  currentIndex,
  setCurrentIndex,
  createContent,
  setCreateContent,
}) => {
  const newCreateContent = { ...createContent };
  let arrContent: any = newCreateContent.content;
  const [activeNav, setActiveNav] = useState(false);
  const addContentRef = useRef<HTMLDivElement>(null);
  const topAddContent =
    addContentRef &&
    addContentRef.current &&
    addContentRef.current.getBoundingClientRect().top;
  const divActiveID = document.querySelector(`#divActive_${currentIndex}`);
  const topDiv = divActiveID && divActiveID.getBoundingClientRect().top;
  const yOffset = window.pageYOffset;
  const positionNav = topDiv && topDiv - (topAddContent ? topAddContent : 0);

  useEffect(() => {
    const scrollTo = topDiv ? topDiv + yOffset : yOffset;
    scroll(0, scrollTo);
  }, [currentIndex]);

  const onClick = (type: string) => {
    arrContent.push({ type: type });
    newCreateContent.content = arrContent;
    setCreateContent(newCreateContent);
  };

  const correctArr = (_arr: any[], _param: number[]) => {
    _arr[_param[1]] = _arr.splice(_param[0], 1, _arr[_param[1]])[0];
  };

  const onClickUp = (index: number) => {
    if (index !== 0) {
      correctArr(arrContent, [index - 1, index]);
      newCreateContent.content = arrContent;
      setCreateContent(newCreateContent);
      setCurrentIndex(currentIndex - 1);
    }
  };
  const onClickDown = (index: number) => {
    if (createContent.content.length - 1 !== index) {
      correctArr(arrContent, [index + 1, index]);
      newCreateContent.content = arrContent;
      setCreateContent(newCreateContent);
      setCurrentIndex(currentIndex + 1);
    }
  };
  const onClickDelete = (index: number) => {
    arrContent.splice(index, 1);
    setCreateContent(newCreateContent);
    setActiveNav(!activeNav);
  };

  useEffect(() => {
    if (createContent !== newCreateContent) {
      patchArticles(newCreateContent).then(() => {});
    }
    // patchArticles(newCreateContent).then(() => {});
  }, [createContent]);

  const onclickDiv = (index: number) => {
    if (currentIndex === index) {
      activeNav ? setActiveNav(false) : setActiveNav(true);
    } else {
      setCurrentIndex(index);
      setActiveNav(true);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="addContent">
      {createContent &&
      createContent.content &&
      createContent.content.length ? (
        <div className=" row align-items-center addContent__content">
          <div className="col-xs-12 col-lg-11" ref={addContentRef}>
            {/*<ContentLayout>*/}
            {createContent &&
              createContent.content.map((item, index) => (
                <div
                  key={index}
                  id={`divActive_${index}`}
                  className={"addContent__divActive"}
                >
                  <div>
                    {item.type === "text" && (
                      <ContentLayout>
                        <TextContent typeContent={item} index={index} />
                        <div className="d-flex justify-content-end mt-2">
                          <BlueButton
                            title="Pедагувати"
                            onClick={() => onclickDiv(index)}
                          />
                        </div>
                      </ContentLayout>
                    )}
                    {item.type === "image" && (
                      <ContentLayout>
                        <PhotoContent typeContent={item} index={index} />{" "}
                        <div className="d-flex justify-content-end mt-2">
                          <BlueButton
                            title="Pедагувати"
                            onClick={() => onclickDiv(index)}
                          />
                        </div>
                      </ContentLayout>
                    )}
                    {item.type === "file" && (
                      <ContentLayout>
                        <FileContent typeContent={item} index={index} />{" "}
                        <div className="d-flex justify-content-end mt-2">
                          <BlueButton
                            title="Pедагувати"
                            onClick={() => onclickDiv(index)}
                          />
                        </div>
                      </ContentLayout>
                    )}
                    {item.type === "list" && (
                      <ContentLayout>
                        <ListContent typeContent={item} index={index} />{" "}
                        <div className="d-flex justify-content-end mt-2">
                          <BlueButton
                            title="Pедагувати"
                            onClick={() => onclickDiv(index)}
                          />
                        </div>
                      </ContentLayout>
                    )}
                  </div>
                </div>
              ))}
            {/*</ContentLayout>*/}
            <div
              className="addContent__content_navBar"
              style={{ top: positionNav ? positionNav : 100 }}
            >
              <NavBarContent
                activeNav={activeNav}
                onClickDelete={() => onClickDelete(currentIndex)}
                onClickDown={() => onClickDown(currentIndex)}
                onClickUp={() => onClickUp(currentIndex)}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <ContentCategories
        onClick={onClick}
        isContentLength={!!createContent.content.length}
      />
    </div>
  );
};

export default AddContent;
