import { toast } from "react-toastify";
import { GLOBALTYPES } from "./globalTypes";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";

export const PERMISSION_TYPES = {
  GET_ALL_PERMISSION: "GET_ALL_PERMISSION",
  PATCH_USER_STATUS_PERMISSION: "PATCH_USER_STATUS_PERMISSION",
  GET_ALL_PERMISSION_APPROVED: "GET_ALL_PERMISSION_APPROVED",
};

export const getAllPermission =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI(`getAllPermissions`, auth.token);

      dispatch({
        type: PERMISSION_TYPES.GET_ALL_PERMISSION,
        payload: { permission: res.data.permission },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
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

export const getAllPermissionApproved =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await getDataAPI(`getAllPermissionsIsApproved`, auth.token);

      dispatch({
        type: PERMISSION_TYPES.GET_ALL_PERMISSION_APPROVED,
        payload: { permission: res.data.permission },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
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

export const patchUserStatusPermission =
  ({ auth, id, isApproved, status }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `patchIsApprovedPermission/${id}`,
        { isApproved, status },
        auth.token
      );

      dispatch({
        type: PERMISSION_TYPES.PATCH_USER_STATUS_PERMISSION,
        payload: { id },
      });

      if (status === "Disetujui") {
        toast.success("Perizinan berhasil disetujui.");
      } else {
        toast.success("Perizinan berhasil ditolak.");
      }
    } catch (err) {
      toast.warn(err.response.data.msg);
    }
  };
