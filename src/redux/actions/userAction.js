import { GLOBALTYPES } from "./globalTypes";
import { patchDataAPI, getDataAPI, deleteDataAPI } from "../../utils/fetchData";

export const USER_TYPES = {
  GET_PETUGAS: "GET_PETUGAS",
  GET_PETUGAS_NOT_VERIFIED: "GET_PETUGAS_NOT_VERIFIED",
  PATCH_USER_ISVERIFIED: "PATCH_USER_ISVERIFIED",
};

export const getAllUser =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI("allPetugas", auth.token);

      dispatch({
        type: USER_TYPES.GET_PETUGAS,
        payload: { petugas: res.data.user },
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

export const getAllUserNotVerified =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI("getAllPetugasIsNotVerified", auth.token);

      dispatch({
        type: USER_TYPES.GET_PETUGAS_NOT_VERIFIED,
        payload: { petugas: res.data.user },
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

export const updateVerifikasiUser =
  ({ auth, id }) =>
  async (dispatch) => {
    try {
      console.log(id);
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `updateVerifikasiPetugas/${id}`,
        {
          isVerified: true,
        },
        auth.token
      );

      dispatch({
        type: USER_TYPES.PATCH_USER_ISVERIFIED,
        payload: { id, isVerified: true },
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

export const deleteUser =
  ({ auth, id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await deleteDataAPI(`deletePetugas/${id}`, auth.token);

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
