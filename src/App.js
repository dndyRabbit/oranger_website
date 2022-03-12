import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";

import PresensiPetugas from "./pages/dashboard/presensiPetugas";
import HasilPekerjaan from "./pages/dashboard/hasilPekerjaan";
import RutePetugas from "./pages/dashboard/rutePetugas";
import DetailRute from "./pages/dashboard/detailRute";
import TambahRute from "./pages/dashboard/tambahRute";
import { getAllUser } from "./redux/actions/userAction";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    if (auth.token) {
      dispatch(getAllUser({ auth }));
    }
  }, [dispatch, auth.token]);

  return (
    <Router>
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

        {alert?.msg &&
          toast.success(`${alert?.msg}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })}

        {alert?.success &&
          toast.success(`${alert?.success}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })}

        {alert?.error &&
          toast.error(`${alert?.error}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })}
        {alert && (
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        )}
      </div>
    </Router>
  );
}

export default App;
