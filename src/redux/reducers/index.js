import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import absen from "./absenReducer";
import user from "./userReducer";
import petugasNotVerified from "./userNotVerifiedReducer";
import wilayah from "./wilayahReducer";
import petugasNotRoled from "./userNotRoledReducer";
import userRole from "./roleReducer";
import petugasAndRoles from "./usersAndRolesReducer";
import petugasAndRolesAbsensi from "./usersAndRolesAbsensiReducer";
import userRute from "./ruteReducer";
import report from "./reportReducer";
import permission from "./permissionReducer";
import permissionApproved from "./permissionApprovedReducer";

export default combineReducers({
  auth,
  alert,
  absen,
  user,
  petugasNotVerified,
  wilayah,
  petugasNotRoled,
  userRole,
  petugasAndRoles,
  userRute,
  report,
  permission,
  permissionApproved,
  petugasAndRolesAbsensi,
});
