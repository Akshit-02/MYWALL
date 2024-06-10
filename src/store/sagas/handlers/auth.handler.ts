import {
  getUserDetailFailed,
  getUserDetailSuccess,
} from "@/store/slices/auth/authSlice";
import { put } from "redux-saga/effects";
import { UserDetail } from "@/models";

export function* setUserDetails(action: {
  type: string;
  payload: UserDetail;
}): Generator<any, void, any> {
  try {
    if (!!action.payload) {
      yield put(getUserDetailSuccess(action.payload));
    } else {
      yield put(getUserDetailFailed("failed"));
    }
  } catch (error) {
    yield put(getUserDetailFailed(error));
  }
}