import { all, fork, takeLatest } from "redux-saga/effects";
import {
  getFacebookMedia,
  getSections,
  getUserFacebookData,
  getUserInstagramData,
  getUserYoutubeData,
  getYoutubeMedia,
  resetFbDataFunc,
  setImportedFbMedia,
  setImportedIgMedia,
  setImportedYtMedia,
  resetYtDataFunc,
  resetIgDataFunc,
} from "../handlers/configure.handle";
import { configureSagaActions } from "../sagaActions/configure.action";

function* resetYtData() {
  yield takeLatest(
    configureSagaActions.RESET_YT_DATA,
    resetYtDataFunc
  );
}
function* resetFbData() {
  yield takeLatest(
    configureSagaActions.RESET_FB_DATA,
    resetFbDataFunc
  );
}
function* resetIgData() {
  yield takeLatest(
    configureSagaActions.RESET_IG_DATA,
    resetIgDataFunc
  );
}
function* setYtMedia() {
  yield takeLatest(
    configureSagaActions.SET_IMPORTED_YT_MEDIA,
    setImportedYtMedia
  );
}

function* setSections() {
  yield takeLatest(configureSagaActions.SET_SECTIONS, getSections);
}

function* setFbMedia() {
  yield takeLatest(
    configureSagaActions.SET_IMPORTED_FB_MEDIA,
    setImportedFbMedia
  );
}

function* setIgMedia() {
  yield takeLatest(
    configureSagaActions.SET_IMPORTED_IG_MEDIA,
    setImportedIgMedia
  );
}

function* getUserYtData() {
  yield takeLatest(
    configureSagaActions.GET_USER_DATA_YOUTUBE,
    getUserYoutubeData
  );
}

function* getYtMedia() {
  yield takeLatest(configureSagaActions.GET_YOUTUBE_MEDIA, getYoutubeMedia);
}

function* getUserFbData() {
  yield takeLatest(
    configureSagaActions.GET_USER_DATA_FACEBOOK,
    getUserFacebookData
  );
}

function* getFbMedia() {
  yield takeLatest(configureSagaActions.GET_FACEBOOK_MEDIA, getFacebookMedia);
}

function* getUserIGData() {
  yield takeLatest(configureSagaActions.GET_USER_DATA_IG, getUserInstagramData);
}

/*function* getIGMedia() {
  yield takeLatest(configureSagaActions.GET_IG_MEDIA, getInstagramMedia);
}*/
export function* configureWatcher() {
  yield all([
    fork(setYtMedia),
    fork(setFbMedia),
    fork(setIgMedia),
    fork(getUserYtData),
    fork(getYtMedia),
    fork(getUserFbData),
    fork(getFbMedia),
    fork(getUserIGData),
    fork(setSections),
    fork(resetYtData),
    fork(resetFbData),
    fork(resetIgData)

  ]);
}
