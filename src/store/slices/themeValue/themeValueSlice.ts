import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isThemeDark: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isThemeDark = !state.isThemeDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
