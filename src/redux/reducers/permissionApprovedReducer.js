import { DeleteData } from "../actions/globalTypes";
import { PERMISSION_TYPES } from "../actions/permissionAction";

const initialState = {
  permissionApproved: [],
};

const permissionApprovedReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERMISSION_TYPES.GET_ALL_PERMISSION_APPROVED:
      return {
        permissionApproved: action.payload.permission,
      };

    default:
      return state;
  }
};

export default permissionApprovedReducer;
