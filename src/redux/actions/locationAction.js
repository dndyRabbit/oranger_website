import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { toast } from "react-toastify";

export const LOCATION_TYPES = {
  LOADING: "LOADING_ABSEN",
  GET_LOCATION_USER: "GET_LOCATION_USER",
};

export const getLocationUser =
  ({ auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`locationUser`, auth.token);

      dispatch({
        type: LOCATION_TYPES.GET_LOCATION_USER,
        payload: { location: res?.data?.locationData },
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
