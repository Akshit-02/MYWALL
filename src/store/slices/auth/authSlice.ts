import {createSlice} from "@reduxjs/toolkit";
import {UserDetail} from "@/models";

interface InitialStateType {
  userDetail: UserDetail;
  error: any;
  loading: boolean;
}

export interface AuthType {
  auth: InitialStateType;
}

export const initialState: InitialStateType = {
  userDetail: {},
  error: null,
  loading: false
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getOrderInitiation: state => {
      state.loading = true;
    },
    getUserDetailSuccess: (state, action) => {
      state.userDetail = { ...state.userDetail, ...action.payload };
      state.loading = false;
    },
    getUserDetailFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateSections: (state, action) => {
      state.userDetail = {
        ...state.userDetail,
        ...action.payload
      };
    }
  }
});

export const {
  getUserDetailSuccess,
  getUserDetailFailed,
  updateSections
} = authSlice.actions;
export default authSlice.reducer;
