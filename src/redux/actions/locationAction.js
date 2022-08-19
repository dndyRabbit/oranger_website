import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI } from "../../utils/fetchData";

export const LOCATION_TYPES = {
  LOADING: "LOADING_ABSEN",
  GET_LOCATION_USER: "GET_LOCATION_USER",
};

export const getLocationUser =
  ({ auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI("locationUser", auth.token);

      dispatch({
        type: LOCATION_TYPES.GET_LOCATION_USER,
        payload: { location: res.data.data },
      });
      console.log("DATA GET FROM BACKEND");
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
