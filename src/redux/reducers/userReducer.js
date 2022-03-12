import { USER_TYPES } from "../actions/userAction";

const initialState = {
  statusAbsen: "Belum Absen",
  tanggal: new Date(),
  uploaded: false,
  petugas: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES.GET_PETUGAS:
      return {
        ...state,
        petugas: action.payload.petugas,
      };

    default:
      return state;
  }
};

export default userReducer;
