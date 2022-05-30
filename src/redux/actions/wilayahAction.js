import { toast } from "react-toastify";
import { GLOBALTYPES } from "./globalTypes";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";

export const WILAYAH_TYPES = {
  GET_WILAYAH: "GET_WILAYAH",
  POST_WILAYAH: "POST_WILAYAH",
  PATCH_WILAYAH: "PATCH_WILAYAH",
  GET_USERS_AND_ROLES: "GET_USERS_AND_ROLES",
  POST_RUTE_USER: "POST_RUTE_USER",
  PATCH_USER_ISNT_RUTED: "PATCH_USER_ISNT_RUTED",
  PATCH_USER_ADDED_TO_ISNT_RUTED: "PATCH_USER_ADDED_TO_ISNT_RUTED",
  GET_USERS_AND_ROLES_ABSENSI: "GET_USERS_AND_ROLES_ABSENSI",
};

export const getWilayah =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI("getWilayah", auth.token);
      dispatch({
        type: WILAYAH_TYPES.GET_WILAYAH,
        payload: { wilayah: res.data.wilayah },
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

export const postWilayah =
  ({ auth, state }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await postDataAPI("postWilayah", state, auth.token);

      dispatch({
        type: WILAYAH_TYPES.POST_WILAYAH,
        payload: { wilayah: res.data.wilayah },
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

export const updateWilayah =
  ({ id, auth, marker, newWilayah }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      console.log(id);

      const res = await patchDataAPI(
        `updateWilayah/${id}`,
        {
          marker,
          wilayah: newWilayah,
        },
        auth.token
      );
      dispatch({
        type: WILAYAH_TYPES.PATCH_WILAYAH,
        payload: { wilayah: res.data.wilayah, marker: res.data.marker },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
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

export const deleteAllWilayah =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await deleteDataAPI(
        `deleteAllWilayah`,

        auth.token
      );
      dispatch({ type: WILAYAH_TYPES.GET_WILAYAH, payload: {} });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
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

// ----------
export const getUsersAndRoles =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI("getUsersAndRoles", auth.token);

      dispatch({
        type: WILAYAH_TYPES.GET_USERS_AND_ROLES,
        payload: { user: res.data.users },
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

export const getUsersAndRolesAbsensi =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI("getUsersAndRolesAbsensi", auth.token);

      dispatch({
        type: WILAYAH_TYPES.GET_USERS_AND_ROLES_ABSENSI,
        payload: { user: res.data.users },
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
