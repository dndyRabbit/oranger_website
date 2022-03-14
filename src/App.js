import { BrowserRouter as Router } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";

import { getAllUser } from "./redux/actions/userAction";

import "react-toastify/dist/ReactToastify.css";
import Notify from "./components/Toaster";
import Routes from "./customRouter/Routes";

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
      <Routes />
      <Notify />
    </Router>
  );
}

export default App;
