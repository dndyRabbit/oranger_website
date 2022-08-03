import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { LoadingFullscreen } from "../components/LoadingBar";

import Logo from "../images/lgoo.png";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  console.log(auth);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);

    dispatch(login(userData));
  };

  return (
    <div className="flex mx-auto w-full h-full items-center justify-center p-5 ">
      <div className="w-full h-auto max-w-[500px] max-h-[600px] bg-white rounded-lg shadow-lg p-4 ">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <img src={Logo} alt="" className=" h-25 w-80 self-center" />

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
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder=""
              className="p-2 bg-transparent border border-gray-300 rounded-md"
              onChange={handleChangeInput}
              value={password}
            />
          </div>

          <button
            className="border-gray-400 py-2 rounded-lg border hover:bg-slate-800 hover:text-white transition"
            type="submit"
            // disabled={email && password ? false : true}
          >
            Login
          </button>

          <p>
            Belum punya akun admin?{" "}
            <Link
              to={"/register"}
              className="italic text-orange-400 hover:text-gray-500"
            >
              Register now
            </Link>
          </p>
        </form>
      </div>

      {alert.loading && <LoadingFullscreen />}
    </div>
  );
};

export default Login;
