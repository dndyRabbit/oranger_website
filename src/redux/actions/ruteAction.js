import { GLOBALTYPES } from "./globalTypes";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";

export const RUTE_TYPES = {
  GET_RUTE: "GET_RUTE",
  POST_RUTE: "POST_RUTE",
  PATCH_RUTE: "PATCH_RUTE",
  GET_USER_ISNT_ADD: "GET_USER_ISNT_ADD",
  PATCH_USER_ISADD: "PATCH_USER_ISADD",
  DELETE_RUTE: "DELETE_RUTE",
};

export const getRute =
  ({ auth, _wilayahId }) =>
  async (dispatch) => {
    try {
      const id = _wilayahId;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI(`getRute/${id}`, auth.token);
      dispatch({
        type: RUTE_TYPES.GET_RUTE,
        payload: { rute: res.data.rute },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const getUserIsNotAdded =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI(`getUserIsNotAdded`, auth.token);
      console.log(res.data);

      dispatch({
        type: RUTE_TYPES.GET_USER_ISNT_ADD,
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
    }
  };

export const postRute =
  ({
    isAdd,
    wilayahId,
    latlng,
    namaWilayah,
    alamatRute,
    namaLengkap,
    avatar,
    auth,
    id,
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await postDataAPI(
        "addRute",
        {
          avatar,
          isAdd,
          wilayahId,
          latlng,
          namaWilayah,
          alamatRute,
          namaLengkap,
          userId: id,
        },
        auth.token
      );
      console.log(res);

      dispatch({ type: RUTE_TYPES.PATCH_USER_ISADD, payload: { id } });

      dispatch({
        type: RUTE_TYPES.POST_RUTE,
        payload: { rute: res.data.rute },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const patchUserIsAdd =
  ({ auth, id, isAdd }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `updateAddRutePetugas/${id}`,
        {
          isAdd,
        },
        auth.token
      );
      console.log(res);

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const deleteRute =
  ({ auth, id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await deleteDataAPI(`deleteRute/${id}`, auth.token);

      console.log(res.data);

      dispatch({ type: RUTE_TYPES.DELETE_RUTE, payload: { id } });
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
    }
  };
