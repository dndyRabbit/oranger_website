import { GLOBALTYPES } from "./globalTypes";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";

export const WILAYAH_TYPES = {
  LOADING: "LOADING_WILAYAH",
  GET_WILAYAH: "GET_WILAYAH",
  POST_WILAYAH: "POST_WILAYAH",
  PATCH_WILAYAH: "PATCH_WILAYAH",
};

export const getWilayah =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI("getWilayah", auth.token);
      dispatch({
        type: WILAYAH_TYPES.GET_WILAYAH,
        payload: { wilayah: res.data.wilayah[0] },
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

export const postWilayah =
  ({ auth, marker, newWilayah }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await postDataAPI(
        "addWilayah",
        {
          marker,
          wilayah: newWilayah,
        },
        auth.token
      );

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

      dispatch({
        type: WILAYAH_TYPES.POST_WILAYAH,
        payload: { wilayah: res.data.wilayah },
      });
      console.log("wilayah:", res.data.wilayah);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
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
    }
  };

export const deleteWilayah =
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await deleteDataAPI(
        `deleteWilayah/${id}`,

        auth.token
      );

      console.log(res);
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
    }
  };
