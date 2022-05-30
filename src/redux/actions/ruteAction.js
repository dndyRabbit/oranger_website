import { toast } from "react-toastify";
import { GLOBALTYPES } from "./globalTypes";

import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";

import { WILAYAH_TYPES } from "./wilayahAction";

export const RUTE_TYPES = {
  GET_USER_RUTE_ACCORDING_TO_WILAYAH: "GET_USER_RUTE_ACCORDING_TO_WILAYAH",
  DELETE_RUTE_USER: "DELETE_RUTE_USER",
};

export const postRute =
  ({ auth, wilayahId, userId, role, roleId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await postDataAPI(
        "postRute",
        {
          wilayahId,
          userId,
          role,
          roleId,
        },
        auth.token
      );

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

export const getUserRuteAccordingWilayah =
  ({ auth, wilayahId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI(
        `getUserRuteAccordingWilayah/${wilayahId}`,
        auth.token
      );

      dispatch({
        type: RUTE_TYPES.GET_USER_RUTE_ACCORDING_TO_WILAYAH,
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

export const patchIsRuted =
  ({ auth, isRuted, userId, roleId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      const res = await patchDataAPI(
        `updateIsRuted/${userId}`,
        {
          isRuted,
        },
        auth.token
      );

      dispatch({
        type: WILAYAH_TYPES.PATCH_USER_ISNT_RUTED,
        payload: { id: roleId },
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

export const patchAllIsRuted =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `updateAllIsRuted`,
        {
          isRuted: false,
        },
        auth.token
      );

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

export const deleteUserRute =
  ({ auth, ruteId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await deleteDataAPI(
        `deleteUserRute/${ruteId}`,

        auth.token
      );

      dispatch({
        type: RUTE_TYPES.DELETE_RUTE_USER,
        payload: { id: ruteId },
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

export const deleteAllUserRute =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await deleteDataAPI(`deleteAllUserRute`, auth.token);

      dispatch({
        type: RUTE_TYPES.GET_USER_RUTE_ACCORDING_TO_WILAYAH,
        payload: {},
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
