import { DeleteData } from "../actions/globalTypes";
import { USER_TYPES } from "../actions/userAction";

const initialState = {
  petugasNotVerified: [],
};

const userNotVerifiedReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES.GET_PETUGAS_NOT_VERIFIED:
      return {
        petugasNotVerified: action.payload.petugas,
      };
    case USER_TYPES.PATCH_USER_ISVERIFIED:
      console.log(state.petugasNotVerified);
      return {
        petugasNotVerified: DeleteData(
          state.petugasNotVerified,
          action.payload.id
        ),
      };
    case USER_TYPES.DELETE_PETUGAS:
      return {
        petugasNotVerified: DeleteData(
          state.petugasNotVerified,
          action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default userNotVerifiedReducer;
