import { LOCATION_TYPES } from "../actions/locationAction";

const initialState = {
  location: [],
};

const location = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_TYPES.GET_LOCATION_USER:
      return {
        location: action.payload.location,
      };

    default:
      return state;
  }
};

export default location;
