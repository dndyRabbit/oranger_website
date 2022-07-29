import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import { LoadingFullscreen } from "../components/LoadingBar";

import Logo from "../images/lgoo.png";
import valid from "../utils/valid";

const Register = () => {
  const initialState = {
    email: "",
    password: "",
    cf_password: "",
    fullName: "",
  };
  const [userData, setUserData] = useState(initialState);
  const [err, setErr] = useState({});
  const { email, password, cf_password, fullName } = userData;

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);

    const { errMsg, errLength } = valid(userData);

    if (errLength > 0) return setErr(errMsg);

    console.log("ada");

    dispatch(register(userData));

    setUserData(initialState);

    navigate("/");
  };

  return (
    <div className="flex mx-auto w-full h-full items-center justify-center p-5 ">
      <div className="w-full h-auto max-w-[500px]  bg-white rounded-lg shadow-lg p-4 ">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <img src={Logo} alt="" className=" h-25 w-72 self-center" />

          <div className="flex flex-col">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Examples@gmail.com"
              className="p-2 bg-transparent border border-gray-300 rounded-md"
              onChange={handleChangeInput}
              value={email}
            />
            <p className="text-xs text-yellow-500">{err?.email}</p>
          </div>
          <div className="flex flex-col">
            <label>Nama Lengkap</label>
            <input
              type="text"
              name="fullName"
              placeholder="Nama Lengkap..."
              className="p-2 bg-transparent border border-gray-300 rounded-md"
              onChange={handleChangeInput}
              value={fullName}
            />
            <p className="text-xs text-yellow-500">{err?.fullName}</p>
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Pasword..."
              className="p-2 bg-transparent border border-gray-300 rounded-md"
              onChange={handleChangeInput}
              value={password}
            />
            <p className="text-xs text-yellow-500">{err?.password}</p>
          </div>
          <div className="flex flex-col">
            <label>Confirm Password</label>
            <input
              type="password"
              name="cf_password"
              placeholder="Confirm Password..."
              className="p-2 bg-transparent border border-gray-300 rounded-md"
              onChange={handleChangeInput}
              value={cf_password}
            />
            <p className="text-xs text-yellow-500">{err?.cf_password}</p>
          </div>

          <button
            className="border-gray-400 py-2 rounded-lg border hover:bg-slate-800 hover:text-white transition"
            type="submit"
            // disabled={email && password ? false : true}
          >
            Register
          </button>

          <p>
            Sudah punya akun admin?{" "}
            <Link
              to={"/"}
              className="italic text-orange-400 hover:text-gray-500"
            >
              Login now
            </Link>
          </p>
        </form>
      </div>

      {alert.loading && <LoadingFullscreen />}
    </div>
  );
};

export default Register;
