import { GLOBALTYPES } from "./globalTypes";
import { patchDataAPI, getDataAPI, deleteDataAPI } from "../../utils/fetchData";
import { toast } from "react-toastify";

export const USER_TYPES = {
  GET_PETUGAS: "GET_PETUGAS",
  GET_PETUGAS_NOT_VERIFIED: "GET_PETUGAS_NOT_VERIFIED",
  PATCH_USER_ISVERIFIED: "PATCH_USER_ISVERIFIED",
  DELETE_PETUGAS: "DELETE_PETUGAS",
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

      const res = await getDataAPI("allPetugasIsNotVerified", auth.token);
      console.log(res.data.user);

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
      const res = await patchDataAPI(
        `updateVerifikasiPetugas/${id}`,
        {
          isVerified: true,
        },
        auth.token
      );

      const otherRes = await getDataAPI("allPetugas", auth.token);

      dispatch({
        type: USER_TYPES.PATCH_USER_ISVERIFIED,
        payload: { id, isVerified: true },
      });

      dispatch({
        type: USER_TYPES.GET_PETUGAS,
        payload: { petugas: otherRes.data.user },
      });

      toast.success("Pendaftaran Petugas disetujui.");
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
  ({ auth, id, key }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI(`deletePetugas/${id}`, auth.token);

      await getDataAPI("allPetugas", auth.token);

      dispatch({
        type: USER_TYPES.DELETE_PETUGAS,
        payload: { id },
      });

      toast.success("Delete Petugas berhasil.");
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
