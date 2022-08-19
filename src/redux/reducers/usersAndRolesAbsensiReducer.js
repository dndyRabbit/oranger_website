import { WILAYAH_TYPES } from "../actions/wilayahAction";

const initialState = {
  petugasAndRolesAbsensi: [],
};

const usersAndRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case WILAYAH_TYPES.GET_USERS_AND_ROLES_ABSENSI:
      return {
        petugasAndRolesAbsensi: action.payload.user,
      };
    default:
      return state;
  }
};

export default usersAndRolesReducer;
