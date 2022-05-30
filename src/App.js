import { BrowserRouter as Router, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { refreshToken } from "./redux/actions/authAction";

import { getAllUser } from "./redux/actions/userAction";

import CustomRouter from "./customRouter/CustomRouter";
import {
  getUsersAndRoles,
  getUsersAndRolesAbsensi,
} from "./redux/actions/wilayahAction";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getAllUser({ auth }));
      dispatch(getUsersAndRoles({ auth }));
      dispatch(getUsersAndRolesAbsensi({ auth }));
    }
  }, [auth.token]);

  return (
    <Router>
      <CustomRouter />
      <ToastContainer autoClose={2000} />
    </Router>
  );
}

export default App;
