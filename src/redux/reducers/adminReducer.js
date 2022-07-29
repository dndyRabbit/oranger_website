import { ADMIN_TYPES } from "../actions/adminAction";

const initialState = {
  admin: [],
};

const absenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_TYPES.GET_ADMIN:
      return {
        admin: action.payload.respone,
      };
    case ADMIN_TYPES.PATCH_STATUS_ADMIN:
      return {
        admin: {
          data: {
            ...state.admin.data,
            body: state.admin.data.body.map((item) => {
              return item._id === action.payload.id
                ? { ...item, isAdmin: action.payload.isAdmin }
                : item;
            }),
          },
        },
      };
    case ADMIN_TYPES.PATCH_ROOT_ADMIN:
      return {
        admin: {
          data: {
            ...state.admin.data,
            body: state.admin.data.body.map((item) => {
              return item._id === action.payload.id
                ? { ...item, root: action.payload.root }
                : item;
            }),
          },
        },
      };
    default:
      return state;
  }
};

export default absenReducer;
