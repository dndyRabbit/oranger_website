import React from "react";

import DashboardNav from "../../components/DashboardNav";
import Nav from "../../components/Nav";

const HasilPekerjaan = () => {
  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className=" w-full max-w-5xl ">
        <h2 className="my-4 font-semibold text-xl">DASHBOARD</h2>

        <DashboardNav />
      </div>
    </div>
  );
};

export default HasilPekerjaan;
