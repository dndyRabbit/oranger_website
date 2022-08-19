import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";

import ContentRoutes from "./ContentRoutes";

const Routers = () => {
  const { auth } = useSelector((state) => state);

  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.token) {
      navigate("/");
    }
  }, [auth?.token]);

  return (
    <div className="h-screen w-screen">
      {auth?.token ? <ContentRoutes /> : <AuthRoutes />}
    </div>
  );
};

export default Routers;
