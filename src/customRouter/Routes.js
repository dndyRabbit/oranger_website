import React from "react";

import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";

import PageRender from "../customRouter/PageRender";
import PrivateRouter from "../customRouter/PrivateRouter";

import PresensiPetugas from "../pages/dashboard/presensiPetugas";
import HasilPekerjaan from "../pages/dashboard/hasilPekerjaan";
import RutePetugas from "../pages/dashboard/rutePetugas";
import DetailRute from "../pages/dashboard/detailRute";
import TambahRute from "../pages/dashboard/tambahRute";

const Routes = () => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="h-screen w-screen">
      <Route exact path="/" component={auth.token ? Home : Login} />
      <Route
        exact
        path="/dashboard/presensiPetugas"
        component={PresensiPetugas}
      />
      <Route exact path="/dashboard/detailRute" component={DetailRute} />
      <Route exact path="/dashboard/rutePetugas" component={RutePetugas} />
      <Route
        exact
        path="/dashboard/hasilPekerjaan"
        component={HasilPekerjaan}
      />
      <Route exact path="/dashboard/tambahRute" component={TambahRute} />

      <PrivateRouter exact path="/:page" component={PageRender} />
      <PrivateRouter exact path="/:page/:id" component={PageRender} />
    </div>
  );
};

export default Routes;
