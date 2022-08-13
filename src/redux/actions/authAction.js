import { toast } from "react-toastify";
import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";

export const login = (userData) => async (dispatch) => {
  try {
    const res = await postDataAPI("loginAdmin", userData);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);
    localStorage.setItem(
      "refreshToken",
      JSON.stringify({
        rf_token: res.data.refresh_token,
        email: res.data.user.email,
      })
    );

    toast.success(res.data.msg);
  } catch (err) {
    toast.warn(err.response.data.msg);
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    await postDataAPI("registerAdmin", userData);

    toast.success("Register Berhasil.");
    toast.success("Hubungi kepala admin untuk mengakses akun.");
  } catch (err) {
    toast.warn(err.response.data.msg);
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  const refreshToken = localStorage.getItem("refreshToken");

  if (firstLogin) {
    try {
      const obj = JSON.parse(refreshToken);
      console.log(obj, "THIS IS RF _TOKEN ACCESSABLE");
      const res = await postDataAPI("refresh_token", {
        rf_token: obj.rf_token,
      });
      console.log(res.data);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
      toast.warn(err.response.data.msg);
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("logout");
    window.location.href = "/";
    toast.success("Logout Berhasil");
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.respone.data.msg,
      },
    });
    toast.warn(err.response.data.msg);
  }
};
