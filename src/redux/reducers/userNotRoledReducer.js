import { DeleteData } from "../actions/globalTypes";
import { ROLE_TYPES } from "../actions/roleAction";

const initialState = {
  petugasNotRoled: [],
};

const userNotRoledReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLE_TYPES.GET_ALL_ISNT_ROLED:
      return {
        petugasNotRoled: action.payload.user,
      };
    case ROLE_TYPES.PATCH_USER_ROLED:
      console.log(state.petugasNotVerified);
      return {
        petugasNotRoled: DeleteData(state.petugasNotRoled, action.payload.id),
      };
    default:
      return state;
  }
};

export default userNotRoledReducer;
