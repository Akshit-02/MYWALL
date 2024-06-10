import { all, fork, takeLatest } from "redux-saga/effects";
import { setUserDetails } from "../handlers/auth.handler";
import { authSagaActions } from "../sagaActions/auth.actions";

function* getUserDetailsWatcher() {
  yield takeLatest(authSagaActions.SET_USER_DETAILS, setUserDetails);
}

export function* authWatcher() {
  yield all([fork(getUserDetailsWatcher)]);
}
