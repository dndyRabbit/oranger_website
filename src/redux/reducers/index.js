import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import absen from "./absenReducer";
import user from "./userReducer";
import userNotVerified from "./userNotVerifiedReducer";
import wilayah from "./wilayahReducer";
import rute from "./ruteReducer";
import userNotAdd from "./userIsNotAddReducer";

export default combineReducers({
  auth,
  alert,
  absen,
  user,
  userNotVerified,
  wilayah,
  rute,
  userNotAdd,
});
