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
import { useQuery, useMutation, useQueryClient } from "react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocationUser } from "./redux/actions/locationAction";
import { getAdmin } from "./redux/actions/adminAction";

function App() {
  const { auth, alert, location } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getAllUser({ auth }));
      dispatch(getUsersAndRoles({ auth }));
      dispatch(getUsersAndRolesAbsensi({ auth }));
      dispatch(getUsersAndRolesAbsensi({ auth }));
      dispatch(getAdmin({ auth }));
    }
  }, [auth.token]);

  useEffect(() => {
    if (auth.token) {
      const interval = setInterval(() => {
        dispatch(getLocationUser({ auth }));
      }, 1000 * 60 * 2); //every 2 minute send a location
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Router>
      <CustomRouter />
      <ToastContainer autoClose={2000} />
    </Router>
  );
}

export default App;
