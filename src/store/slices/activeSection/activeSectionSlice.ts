import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  activeIndex: 0,
};

export const activeSectionSlice = createSlice({
  name: "activeSection",
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeIndex = action.payload.payload;
    },
  },
});

export const { setActiveSection } = activeSectionSlice.actions;
export default activeSectionSlice.reducer;
