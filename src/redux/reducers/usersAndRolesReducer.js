import { DeleteData } from "../actions/globalTypes";
import { WILAYAH_TYPES } from "../actions/wilayahAction";

const initialState = {
  petugasAndRoles: [],
};

const usersAndRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case WILAYAH_TYPES.GET_USERS_AND_ROLES:
      return {
        petugasAndRoles: action.payload.user,
      };
    case WILAYAH_TYPES.PATCH_USER_ISNT_RUTED:
      return {
        petugasAndRoles: DeleteData(state.petugasAndRoles, action.payload.id),
      };
    default:
      return state;
  }
};

export default usersAndRolesReducer;
