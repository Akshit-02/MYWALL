import { all, fork } from "redux-saga/effects";
import { authWatcher } from "./watchers/auth.watcher";
import { configureWatcher } from "./watchers/configure.watcher";
import { onboardingWatcher } from "./watchers/onboarding.watcher";

export default function* rootSaga() {
	yield all([fork(authWatcher), fork(configureWatcher),fork(onboardingWatcher)]);
}
