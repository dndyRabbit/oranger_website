import { DeleteData } from "../actions/globalTypes";
import { PERMISSION_TYPES } from "../actions/permissionAction";

const initialState = {
  permission: [],
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERMISSION_TYPES.GET_ALL_PERMISSION:
      return {
        permission: action.payload.permission,
      };

    case PERMISSION_TYPES.PATCH_USER_STATUS_PERMISSION:
      return {
        permission: DeleteData(state.permission, action.payload.id),
      };

    default:
      return state;
  }
};

export default permissionReducer;
