import { DeleteData } from "../actions/globalTypes";
import { REPORT_TYPES } from "../actions/reportAction";

const initialState = {
  report: [],
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_TYPES.GET_ALL_REPORT:
      return {
        report: action.payload.report,
      };

    default:
      return state;
  }
};

export default reportReducer;
