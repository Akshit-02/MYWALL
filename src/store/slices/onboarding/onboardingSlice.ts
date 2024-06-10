import { createSlice } from "@reduxjs/toolkit";
import { Influencer } from "@/models";

export const initialState: { onBoarding: Influencer } = {
  onBoarding: {
    id: "",
  },
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.onBoarding = { ...action.payload };
    },
  },
});

export const { setUser } = onboardingSlice.actions;
export default onboardingSlice.reducer;
