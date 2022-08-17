import { BrowserRouter as Router, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { refreshToken } from "./redux/actions/authAction";

import CustomRouter from "./customRouter/CustomRouter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch, auth.token]);

  useEffect(() => {
    window.document.title = "Oranger";
  }, []);

  return (
    <Router>
      <CustomRouter />
      <ToastContainer autoClose={2000} />
    </Router>
  );
}

export default App;
