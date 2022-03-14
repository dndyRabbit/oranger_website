import React from "react";
import loading from "../images/loading.gif";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-black opacity-30 absolute items-center justify-center mx-auto">
      <img src={loading} alt="" className="w-[200px] h-[200px]" />
    </div>
  );
};

export default Loading;
