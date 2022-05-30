import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";
import { toast } from "react-toastify";

export const ABSEN_TYPES = {
  LOADING: "LOADING_ABSEN",
  GET_ABSEN: "GET_ABSEN",
  POST_PETUGAS_ABSEN: "POST_PETUGAS_ABSEN",
  PATCH_PETUGAS_ABSEN: "PATCH_PETUGAS_ABSEN",
};

export const getAbsenByDate =
  ({ date, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      console.log(date);

      const res = await getDataAPI(`petugas/absen/${date}`, auth.token);

      console.log(res.data);
      dispatch({
        type: ABSEN_TYPES.GET_ABSEN,
        payload: { user: res.data.user[0] },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
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
  ({ auth, newData, date }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      console.log(newData);

      const res = await postDataAPI(
        "petugas/absen",
        {
          newData,
          date,
        },
        auth.token
      );

      dispatch({
        type: ABSEN_TYPES.POST_PETUGAS_ABSEN,
        payload: { absensiPetugas: res.data.absensiPetugas },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });

      toast.success("Membuat Absen Berhasil");
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

export const patchPetugasAbsen =
  ({ auth, userId, newStatusAbsen, date }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `petugas/updateAbsen/${date}/${userId}`,
        {
          statusAbsen: newStatusAbsen,
        },
        auth.token
      );

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
