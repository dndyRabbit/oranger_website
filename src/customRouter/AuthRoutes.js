import React from "react";

import { Routes, Route } from "react-router-dom";
import NoPageFound from "../components/NoPageFound";

import Login from "../pages/login";

import Register from "../pages/register";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
};

export default AuthRoutes;
