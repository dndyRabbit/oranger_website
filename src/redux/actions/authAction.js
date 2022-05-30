import { toast } from "react-toastify";
import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI("loginAdmin", userData);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    toast.success(res.data.msg);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
    toast.warn(err.response.data.msg);
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    try {
      const res = await postDataAPI("refresh_token");
      console.log(res.data);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
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
