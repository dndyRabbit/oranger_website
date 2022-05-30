import { WILAYAH_TYPES } from "../actions/wilayahAction";

const initialState = {
  wilayah: [],
};

const wilayahReducer = (state = initialState, action) => {
  switch (action.type) {
    case WILAYAH_TYPES.GET_WILAYAH:
      return {
        wilayah: action.payload.wilayah,
      };
    case WILAYAH_TYPES.POST_WILAYAH:
      return {
        wilayah: action.payload.wilayah,
      };
    default:
      return state;
  }
};

export default wilayahReducer;
