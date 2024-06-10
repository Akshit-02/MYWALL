import { all, fork, takeLatest } from "redux-saga/effects";
import {
  createAwsAccount,
  editUser,
  setActiveSectionId,
  setId,
  toggleThemeValue,
} from "../handlers/onboarding.handle";
import { onboardingSagaActions } from "../sagaActions/onboarding.actions";

function* createAccount() {
  yield takeLatest(onboardingSagaActions.CREATE_AWS_ACCOUNT, createAwsAccount);
}

function* editSlug() {
  yield takeLatest(onboardingSagaActions.EDIT_USER, editUser);
}

function* setUserId() {
  yield takeLatest(onboardingSagaActions.SET_ID, setId);
}

function* setTheme() {
  yield takeLatest(onboardingSagaActions.TOGGLE_THEME, toggleThemeValue);
}

function* setActiveSection() {
  yield takeLatest(
    onboardingSagaActions.SET_ACTIVE_SECTION,
    setActiveSectionId
  );
}

export function* onboardingWatcher() {
  yield all([
    fork(createAccount),
    fork(editSlug),
    fork(setUserId),
    fork(setTheme),
    fork(setActiveSection),
  ]);
}
