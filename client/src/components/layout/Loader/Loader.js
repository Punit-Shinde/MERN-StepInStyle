import React from "react";
import loader from "../../../images/steps.gif";
import "./Loader.css"

const Loading = () => {
  return (
<div className="loaderContainer">
      <img  src={loader} alt="" />
    </div>
  );
};

export default Loading;
