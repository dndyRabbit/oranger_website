import { toast } from "react-toastify";
import { GLOBALTYPES } from "./globalTypes";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";

export const REPORT_TYPES = {
  GET_ALL_REPORT: "GET_ALL_REPORT",
};

export const getAllReport =
  ({ auth, date }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`getAllReport/${date}`, auth.token);

      dispatch({
        type: REPORT_TYPES.GET_ALL_REPORT,
        payload: { report: res.data.report },
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
