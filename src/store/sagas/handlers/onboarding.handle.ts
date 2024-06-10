import { call, put } from "redux-saga/effects";
import { setUser } from "@/store/slices/onboarding/onboardingSlice";
import { toggleTheme } from "@/store/slices/themeValue/themeValueSlice";
import { signupWithAws } from "@/store/sagas/requests/onboarding.request";
import { Influencer } from "@/models";
import { API } from "aws-amplify";
import { getInfluencer, updateInfluencer } from "@/graphql/api";
import { setActiveSection } from "@/store/slices/activeSection/activeSectionSlice";

const updateinfluencer = async (data: Influencer) => {
  try {
    const res = await API.graphql({
      query: updateInfluencer,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    return res;
  } catch (error) {
    console.error("Error updating influencer:", error);
    throw error;
  }
};
const getInfluencerById = async (id: string) => {
  try {
    const res = await API.graphql({
      query: getInfluencer,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return res;
  } catch (error) {
    console.error("Error updating influencer:", error);
    throw error;
  }
};

export function* createAwsAccount(action: any): Generator<any, void, any> {
  try {
    const { provider } = action.payload;
    yield call(() => signupWithAws(provider));
  } catch (error) {
    console.log("error", error);
  }
}

export function* editUser(action: any): Generator<any, void, any> {
  try {
    const { data } = yield call(() => updateinfluencer(action.payload));
    yield put(setUser(data.updateInfluencer));
  } catch (error) {
    console.log("error", error);
  }
}

export function* setId(action: any): Generator<any, void, any> {
  try {
    if (!action.payload) {
      yield put(setUser({}));
      return;
    }
    const { data } = yield call(() => getInfluencerById(action.payload));
    const influencer = data.getInfluencer;
    if (!!action.payload) {
      yield put(setUser(influencer));
    }
    if (influencer.profileStatusCode === "done") {
      window.location.href = `/configure/wall`;
    } else if (influencer.profileStatusCode === "step1") {
      window.location.href = `/configure/profile/claim-slug`;
    } else if (influencer.profileStatusCode === "step2") {
      window.location.href = `/configure/profile/user-details`;
    }
  } catch (error) {
    console.log("--- error --", error);
  }
}

export function* toggleThemeValue() {
  yield put(toggleTheme());
}

export function* setActiveSectionId(action: any) {
  yield put(setActiveSection(action));
}
