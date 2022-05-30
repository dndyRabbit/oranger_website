import { GLOBALTYPES } from "./globalTypes";
import { patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const PROFILE_TYPES = {
  LOADING: "LOADING_PROFILE",
};

export const updateProfileUser =
  ({ userData, auth, avatar }) =>
  async (dispatch) => {
    try {
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      console.log(avatar);
      if (avatar) media = await imageUpload([avatar]);

      const res = await patchDataAPI(
        "admin",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.respone.data.msg },
      });
    }
  };
