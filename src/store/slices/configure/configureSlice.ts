import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  importedYt: {
    data: [],
    loading: false,
    error: null,
  },
  importedFb: {
    data: [],
    loading: false,
    error: null,
  },
  importedIg: {
    data: [],
    loading: false,
    error: null,
  },
  youTube: {
    token: "",
    userData: {
      data: [],
      loading: false,
      error: null,
    },
    mediaData: {
      data: [],
      loading: false,
      error: null,
    },
  },
  faceBook: {
    token: "",
    userData: {
      data: [],
      loading: false,
      error: null,
    },
    mediaData: {
      data: [],
      loading: false,
      error: null,
    },
  },
  instagram: {
    token: "",
    userData: {
      data: [],
      loading: false,
      error: null,
    },
    mediaData: {
      data: [],
      loading: false,
      error: null,
    },
    error: "",
  },
};

export const configureSlice = createSlice({
  name: "configure",
  initialState,
  reducers: {
    getUserYtMedia: (state, action) => {
      state.importedYt.data = action.payload;
      state.importedYt.loading = false;
    },
    getUserYtMediaFailed: (state, action) => {
      state.importedYt.error = action.payload;
      state.importedYt.loading = false;
    },
    getUserFbMedia: (state, action) => {
      state.importedFb.data = action.payload;
      state.importedFb.loading = false;
    },
    getUserFbMediaFailed: (state, action) => {
      state.importedFb.error = action.payload;
      state.importedFb.loading = false;
    },
    getUserIgMedia: (state, action) => {
      state.importedIg.data = action.payload;
      state.importedIg.loading = false;
    },
    getUserIgMediaFailed: (state, action) => {
      state.importedIg.error = action.payload;
      state.importedIg.loading = false;
    },

    setYtToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.youTube.token = token;
    },
    setUserYoutubeData: (state, action) => {
      const { userData, mediaData } = action.payload[0];
      (state.youTube.mediaData.data = mediaData),
        (state.youTube.userData.data = userData);
    },
    setYoutubeData: (state, action) => {
      //  const { mediaData } = action.payload[0];
      //state.youTube.mediaData.data = mediaData;
    },
    setUserDataError: (state, action) => {
      state.youTube.userData.error = action.payload;
    },
    setMediaDataError: (state, action) => {
      state.youTube.mediaData.error = action.payload;
    },
    setFbToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;

      state.faceBook.token = token;
    },
    setUserFbData: (state, action) => {
      state.faceBook.userData.data = action.payload;
    },
    setFbData: (state, action) => {
      state.faceBook.mediaData.data = action.payload;
    },
    setIGToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.instagram.token = token;
    },
    setUserIGData: (state, action) => {
      state.instagram.userData.data = action.payload;
    },
    setIGData: (state, action) => {
      state.instagram.mediaData.data = action.payload;
    },
    setIGError: (state, action) => {
      state.instagram.error = action.payload;
    },
  },
});

export const {
  getUserYtMedia,
  getUserYtMediaFailed,
  getUserFbMedia,
  getUserFbMediaFailed,
  getUserIgMedia,
  getUserIgMediaFailed,
  setYtToken,
  setFbToken,
  setUserYoutubeData,
  setYoutubeData,
  setUserDataError,
  setMediaDataError,
  setUserFbData,
  setFbData,
  setIGToken,
  setUserIGData,
  setIGData,
  setIGError,
} = configureSlice.actions;
export default configureSlice.reducer;
