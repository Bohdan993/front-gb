const ArticleType = ({ type }: { type: string }) => {
  return (
    <div className="buttonsInfo">
      {type ? <div className=" buttonsInfo_technique">{type}</div> : <></>}

      {/*<div className=" buttonsInfo_list">список</div>*/}
      {/*<div className=" buttonsInfo_other">інше</div>*/}
    </div>
  );
};

export default ArticleType;
