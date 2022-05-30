import { GLOBALTYPES } from "./globalTypes";
import { toast } from "react-toastify";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";

export const ROLE_TYPES = {
  GET_ALL_ISNT_ROLED: "GET_ALL_ISNT_ROLED",
  POST_ROLE: "POST_ROLE",
  PATCH_USER_ROLED: "PATCH_USER_ROLED",
  GET_SPESIFIC_ROLE: "GET_SPESIFIC_ROLE",
  DELETE_ROLE: "DELETE_ROLE",
};

export const getAllIsNotRoled =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI("getAllIsNotRoled", auth.token);

      dispatch({
        type: ROLE_TYPES.GET_ALL_ISNT_ROLED,
        payload: { user: res.data.user },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
      toast.warn(err.response.data.msg);
    }
  };

export const getSpesificRole =
  ({ auth, role }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI(`getSpesificRole/${role}`, auth.token);

      dispatch({
        type: ROLE_TYPES.GET_SPESIFIC_ROLE,
        payload: { role: res.data.role },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
      toast.warn(err.response.data.msg);
    }
  };

export const postRole =
  ({ auth, userId, role }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await postDataAPI(
        "postRole",
        {
          userId,
          role,
        },
        auth.token
      );

      dispatch({
        type: ROLE_TYPES.POST_ROLE,
        payload: { user: res.data.user },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
      toast.success(res.data.msg);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
      toast.warn(err.response.data.msg);
    }
  };

export const updateIsRoled =
  ({ userId, auth, isRoled }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `updateIsRoled/${userId}`,
        {
          isRoled: isRoled,
        },
        auth.token
      );
      dispatch({
        type: ROLE_TYPES.PATCH_USER_ROLED,
        payload: { id: userId },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
      toast.success(res.data.msg);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
      toast.warn(err.response.data.msg);
    }
  };

export const updateAllIsRoled =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `updateAllIsRoled`,
        {
          isRoled: false,
        },
        auth.token
      );
      dispatch({
        type: ROLE_TYPES.GET_ALL_ISNT_ROLED,
        payload: {},
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
      toast.success(res.data.msg);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
      toast.warn(err.response.data.msg);
    }
  };

export const deleteRole =
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      await deleteDataAPI(
        `deleteRole/${id}`,

        auth.token
      );

      const res = await getDataAPI("getAllIsNotRoled", auth.token);

      dispatch({ type: ROLE_TYPES.DELETE_ROLE, payload: { id } });
      dispatch({
        type: ROLE_TYPES.GET_ALL_ISNT_ROLED,
        payload: { user: res.data.user },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
      toast.success(res.data.msg);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
      toast.warn(err.response.data.msg);
    }
  };

export const deleteAllRole =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      await deleteDataAPI(
        `deleteAllRole`,

        auth.token
      );

      const res = await getDataAPI("getAllIsNotRoled", auth.token);
      dispatch({
        type: ROLE_TYPES.GET_ALL_ISNT_ROLED,
        payload: { user: res.data.user },
      });

      dispatch({
        type: ROLE_TYPES.ALERT,
        payload: { success: res.data.msg },
      });
      toast.success(res.data.msg);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
      toast.warn(err.response.data.msg);
    }
  };
