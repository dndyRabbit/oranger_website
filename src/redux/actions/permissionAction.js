import { toast } from "react-toastify";

import { getDataAPI, patchDataAPI } from "../../utils/fetchData";

export const PERMISSION_TYPES = {
  GET_ALL_PERMISSION: "GET_ALL_PERMISSION",
  PATCH_USER_STATUS_PERMISSION: "PATCH_USER_STATUS_PERMISSION",
  GET_ALL_PERMISSION_APPROVED: "GET_ALL_PERMISSION_APPROVED",
};

export const getAllPermission =
  ({ auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`getAllPermissions`, auth.token);

      dispatch({
        type: PERMISSION_TYPES.GET_ALL_PERMISSION,
        payload: { permission: res?.data?.permission },
      });
    } catch (err) {
      toast.warn(err.response.data.msg);
    }
  };

export const getAllPermissionApproved =
  ({ auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`getAllPermissionsIsApproved`, auth.token);

      dispatch({
        type: PERMISSION_TYPES.GET_ALL_PERMISSION_APPROVED,
        payload: { permission: res?.data?.permission },
      });
    } catch (err) {
      toast.warn(err.response.data.msg);
    }
  };

export const patchUserStatusPermission =
  ({ auth, id, isApproved, status }) =>
  async (dispatch) => {
    try {
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
