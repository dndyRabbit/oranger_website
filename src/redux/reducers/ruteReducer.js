import { RUTE_TYPES } from "../actions/ruteAction";
import { DeleteData } from "../actions/globalTypes";

const initialState = {
  rute: [],
};

const ruteReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUTE_TYPES.GET_RUTE:
      return {
        rute: action.payload.rute,
      };
    case RUTE_TYPES.POST_RUTE:
      return {
        rute: action.payload.rute,
      };
    case RUTE_TYPES.DELETE_RUTE:
      console.log(state.rute);
      return {
        rute: DeleteData(state.rute, action.payload.id),
      };
    default:
      return state;
  }
};

export default ruteReducer;
