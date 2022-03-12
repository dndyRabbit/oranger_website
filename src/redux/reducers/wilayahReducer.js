import { WILAYAH_TYPES } from "../actions/wilayahAction";

const initialState = {
  wilayah: [],
};

const wilayahReducer = (state = initialState, action) => {
  switch (action.type) {
    case WILAYAH_TYPES.GET_WILAYAH:
      console.log("GET: ", action.payload);
      return {
        wilayah: action.payload.wilayah,
      };
    case WILAYAH_TYPES.POST_WILAYAH:
      return {
        wilayah: action.payload.wilayah,
      };
    case WILAYAH_TYPES.PATCH_WILAYAH:
      console.log("Patch: ", action.payload);
      return {
        wilayah: {
          ...state.wilayah,
          wilayah: state.wilayah.wilayah.concat(action.payload.wilayah),
          marker: state.wilayah.marker.concat(action.payload.marker),
        },
      };
    default:
      return state;
  }
};

export default wilayahReducer;
