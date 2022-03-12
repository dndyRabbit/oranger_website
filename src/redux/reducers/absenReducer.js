import { ABSEN_TYPES } from "../actions/absenAction";

const initialState = {
  absensi: [],
};

const absenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ABSEN_TYPES.GET_ABSEN:
      return {
        absensi: action.payload.listOfPetugas[0],
      };
    case ABSEN_TYPES.POST_PETUGAS_ABSEN:
      console.log(action.payload);
      return {
        absensi: action.payload.listOfPetugas,
      };
    case ABSEN_TYPES.PATCH_PETUGAS_ABSEN:
      console.log(state.absensi);
      return {
        absensi: {
          ...state.absensi,
          petugasAbsensi: state.absensi.petugasAbsensi.map((item) =>
            item._id === action.payload.userId
              ? {
                  ...item,
                  statusAbsen: action.payload.statusAbsen,
                }
              : item
          ),
        },
      };

    default:
      return state;
  }
};

export default absenReducer;
