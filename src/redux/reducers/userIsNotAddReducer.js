import { DeleteData } from "../actions/globalTypes";
import { RUTE_TYPES } from "../actions/ruteAction";

const initialState = {
  petugasIsNotAdd: [],
};

const userIsNotAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUTE_TYPES.GET_USER_ISNT_ADD:
      return {
        petugasIsNotAdd: action.payload.user,
      };
    case RUTE_TYPES.PATCH_USER_ISADD:
      console.log(state.petugasIsNotAdd);
      return {
        petugasIsNotAdd: DeleteData(state.petugasIsNotAdd, action.payload.id),
      };
    default:
      return state;
  }
};

export default userIsNotAddReducer;
