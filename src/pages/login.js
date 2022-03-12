import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../redux/actions/authAction";
import { LoadingFullscreen } from "../components/LoadingBar";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  console.log(alert.loading);

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
    <div className="flex mx-auto w-full h-full items-center justify-center">
      <div className="w-full h-auto max-w-[450px] max-h-[400px] bg-white rounded-lg shadow-lg p-4 ">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <img
            src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_32.jpg"
            alt=""
            className="w-[150px] h-[75px]"
          />

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
              placeholder="Examples@gmail.com"
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
        </form>
      </div>

      {alert.loading && <LoadingFullscreen />}
    </div>
  );
};

export default Login;
