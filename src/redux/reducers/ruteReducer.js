import { DeleteData } from "../actions/globalTypes";
import { RUTE_TYPES } from "../actions/ruteAction";

const initialState = {
  userRute: [],
};

const ruteReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUTE_TYPES.GET_USER_RUTE_ACCORDING_TO_WILAYAH:
      return {
        userRute: action.payload.user,
      };
    case RUTE_TYPES.DELETE_RUTE_USER:
      return {
        userRute: DeleteData(state.userRute, action.payload.id),
      };
    default:
      return state;
  }
};

export default ruteReducer;
