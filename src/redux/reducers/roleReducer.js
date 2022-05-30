import { DeleteData } from "../actions/globalTypes";
import { ROLE_TYPES } from "../actions/roleAction";

const initialState = {
  userRole: [],
};

const userNotRoledReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLE_TYPES.GET_SPESIFIC_ROLE:
      return {
        userRole: action.payload.role,
      };
    case ROLE_TYPES.DELETE_ROLE:
      return {
        userRole: DeleteData(state.userRole, action.payload.id),
      };
    default:
      return state;
  }
};

export default userNotRoledReducer;
