import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";
import { toast } from "react-toastify";

export const ADMIN_TYPES = {
  LOADING: "LOADING_ABSEN",
  GET_ADMIN: "GET_ADMIN",
  PATCH_STATUS_ADMIN: "PATCH_STATUS_ADMIN",
  PATCH_ROOT_ADMIN: "PATCH_ROOT_ADMIN",
};

export const getAdmin =
  ({ auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI("get_admin", auth.token);

      dispatch({
        type: ADMIN_TYPES.GET_ADMIN,
        payload: { respone: res.data },
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

export const patchStatusAdmin =
  ({ auth, isAdmin, id, fullName }) =>
  async (dispatch) => {
    try {
      await patchDataAPI(
        "update_status_admin",
        { isAdmin: !isAdmin, id },
        auth.token
      );
      console.log("PASS THE TEST");

      dispatch({
        type: ADMIN_TYPES.PATCH_STATUS_ADMIN,
        payload: { isAdmin: !isAdmin, id },
      });

      toast.success(`Change Status Admin ${fullName} success.`);
    } catch (err) {
      toast.warn(err.response.data.msg);
    }
  };
export const patchRootAdmin =
  ({ id, fullName, auth, root }) =>
  async (dispatch) => {
    try {
      await patchDataAPI(
        "update_status_admin",
        { root: !root, id },
        auth.token
      );
      console.log("PASS THE TEST");

      dispatch({
        type: ADMIN_TYPES.PATCH_ROOT_ADMIN,
        payload: { root: !root, id },
      });

      toast.success(`Change Root Admin ${fullName} success.`);
    } catch (err) {
      toast.warn(err.response.data.msg);
    }
  };
