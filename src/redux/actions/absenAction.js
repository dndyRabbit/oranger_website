import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";

export const ABSEN_TYPES = {
  LOADING: "LOADING_ABSEN",
  GET_ABSEN: "GET_ABSEN",
  POST_PETUGAS_ABSEN: "POST_PETUGAS_ABSEN",
  PATCH_PETUGAS_ABSEN: "PATCH_PETUGAS_ABSEN",
};

export const getAbsenByDate =
  ({ tanggal, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI(`petugas/absen/${tanggal}`, auth.token);

      dispatch({
        type: ABSEN_TYPES.GET_ABSEN,
        payload: { listOfPetugas: res.data.listOfPetugas },
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

export const postPetugasAbsen =
  ({ auth, newData, uploaded, tanggal }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await postDataAPI(
        "petugas/absen",
        {
          newData,
          uploaded,
          tanggal,
          isAllAbsen: false,
        },
        auth.token
      );
      console.log(res.data);

      if (res.data) {
        dispatch({
          type: ABSEN_TYPES.POST_PETUGAS_ABSEN,
          payload: { listOfPetugas: res.data.absensiPetugas },
        });
      }

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { msg: "Absen Sukses" },
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

export const patchPetugasAbsen =
  ({ userId, id, statusAbsen, tanggal, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `petugas/updateAbsen/${id}`,
        {
          userId,
          statusAbsen,
          tanggal,
        },
        auth.token
      );

      dispatch({
        type: ABSEN_TYPES.PATCH_PETUGAS_ABSEN,
        payload: { userId: userId, statusAbsen: statusAbsen },
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
