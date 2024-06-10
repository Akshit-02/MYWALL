import { call, put } from "redux-saga/effects";
import { Influencer, UserDetail } from "@/models";
import {
  byInfluencerIdFacebookVideos,
  byInfluencerIdInstagramVideos,
  byInfluencerIdSections,
  byInfluencerIdYoutubeVideos,
  createCustomLinkItems,
  createFacebookItems,
  createInstagramItems,
  createSection,
  createYoutubeItems,
  createMediaItems,
  deleteSection,
  deleteSubSection,
  getInfluencerBySlug,
  getUrlMeta,
  sortSectionByPosition,
  sortSubSectionByPosition,
  syncFacebookRepository,
  syncInstagramRepository,
  syncYoutubeRepository,
  updateCustomLink,
  updateMedia,
  updateSection,
  updateSubSection,
  updateFacebookVideo,
  updateYoutubeVideo,
  updateInstagramVideo,
  createLogoItems,
  updateLogo,
  getSubSection,
  getMediaSubSection,
  getYoutubeSubSection,
  getPortfolioSubSection,
  getCustomLink,
  getLogo,
  getLogoSubSection,
  getMedia,
  getYoutubeVideo,
  getFacebookVideo,
  getInstagramVideo,
  getSection,
  listYoutubeVideos,
  getCustomLinkData,
  getMediaCTA,
  getYoutubeVideoCTA,
  getFacebookVideoCTA,
  getInstagramVideoCTA,
  byInfluencerIdInstagramVideosData,
  getInstagramVideoData,
  byInfluencerIdFacebookVideosData,
  getFacebookVideoData,
  byInfluencerIdYoutubeVideosData,
  getYoutubeVideoData,
  getMediaData,
  getLogoData,
  updateInfluencer,
  sendContactFormEmail,
} from "@/graphql/api";
import {
  syncInstagramAnalytics,
  syncYoutubeAnalytics,
} from "@/graphql/queries";

import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api/lib";
import { updateSections } from "@/store/slices/auth/authSlice";
import {
  getUserFbMedia,
  getUserFbMediaFailed,
  getUserIgMedia,
  getUserIgMediaFailed,
  getUserYtMedia,
  getUserYtMediaFailed,
  setFbData,
  setFbToken,
  setIGData,
  setIGError,
  setIGToken,
  setMediaDataError,
  setUserDataError,
  setUserFbData,
  setUserIGData,
  setUserYoutubeData,
  setYoutubeData,
  setYtToken,
} from "@/store/slices/configure/configureSlice";
import {
  fetchUserSections,
  getFbMedia,
  getUserFbData,
  getUserIGData,
  getUserYtData,
  getYtMedia,
} from "@/store/sagas/requests/configure.request";
import { editUser } from "@/store/sagas/handlers/onboarding.handle";
import { FacebookVideo } from "@/models/facebook";
import { YoutubeVideo } from "@/models/youtube";
import { InstagramVideo } from "@/models/instagram";
import { customizeSectionObject } from "@/utils/helperFunction";

export function* resetYtDataFunc(): Generator<any, void, any> {
  try {
    yield put(setYtToken({ token: "" }));
    yield put(setUserYoutubeData({ mediaData: [], userData: [] }));
  } catch (error) {
    console.log("error: ", error);
  }
}
export function* resetFbDataFunc(): Generator<any, void, any> {
  try {
    yield put(setFbToken({ token: "" }));
    yield put(setUserFbData([]));
    yield put(setFbData([]));
  } catch (error) {
    console.log("error: ", error);
  }
}
export function* resetIgDataFunc(): Generator<any, void, any> {
  try {
    yield put(setIGToken({ token: "" }));
    yield put(setUserIGData([]));
    yield put(setIGData([]));
  } catch (error) {
    console.log("error: ", error);
  }
}

export function* setImportedYtMedia(action: {
  type: string;
  payload: Array<YoutubeVideo>;
}): Generator<any, void, any> {
  try {
    if (!!action.payload) {
      yield put(getUserYtMedia(action.payload));
    } else {
      yield put(getUserYtMediaFailed("failed"));
    }
  } catch (error) {
    yield put(getUserYtMediaFailed(error));
  }
}

export function* setImportedFbMedia(action: {
  type: string;
  payload: Array<FacebookVideo>;
}): Generator<any, void, any> {
  try {
    if (!!action.payload) {
      yield put(getUserFbMedia(action.payload));
    } else {
      yield put(getUserFbMediaFailed("failed"));
    }
  } catch (error) {
    yield put(getUserFbMediaFailed(error));
  }
}

export function* setImportedIgMedia(action: {
  type: string;
  payload: Array<InstagramVideo>;
}): Generator<any, void, any> {
  try {
    if (action.payload && action.payload.length > 0) {
      yield put(getUserIgMedia(action.payload));
    } else {
      yield put(getUserIgMediaFailed("failed"));
    }
  } catch (error) {
    yield put(getUserIgMediaFailed(error));
  }
}

export const getUserDetail = async (
  slug: string
): Promise<UserDetail | null> => {
  try {
    const response: GraphQLResult<any> = await API.graphql({
      query: getInfluencerBySlug,
      variables: { slug },
      authMode: "API_KEY",
    });

    const influencer = response?.data?.getInfluencerBySlug as Influencer;

    if (!!influencer) {
      const sections: GraphQLResult<any> = await API.graphql({
        query: byInfluencerIdSections,
        variables: { influencerId: influencer.id },
        authMode: "API_KEY",
      });

      return {
        ...influencer,
        sections: customizeSectionObject(
          sections.data.byInfluencerIdSections.items
        ),
      };
    }
    return null;
  } catch (error) {
    return { error };
  }
};

export const getInstagramAnalytics = async () => {
  try {
    const response: GraphQLResult<any> = await API.graphql({
      query: syncInstagramAnalytics,
      variables: {},
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    return response;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getYoutubeAnalytics = async () => {
  try {
    const response: GraphQLResult<any> = await API.graphql({
      query: syncYoutubeAnalytics,
      variables: {},
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    return response;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const scrapLinkData = async (link: string) => {
  try {
    return await API.graphql({
      query: getUrlMeta,
      variables: {
        link: link,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const createLinks = async (data: any) => {
  try {
    return await API.graphql({
      query: createCustomLinkItems,
      variables: {
        input: data.links,
        sectionId: data.sectionId,
        subSectionId: data?.subSectionId || null,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};

export const createMediaItem = async (data: any) => {
  try {
    return await API.graphql({
      query: createMediaItems,
      variables: {
        input: { mediaItems: data.mediaItems },
        sectionId: data.sectionId,
        subSectionId: data?.subSectionId || null,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};

export const createLogoItem = async (data: any) => {
  try {
    return await API.graphql({
      query: createLogoItems,
      variables: {
        input: { logoItems: data.logoItems },
        sectionId: data.sectionId,
        subSectionId: data?.subSectionId || null,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};

export const updateCustomLinks = async (data: any) => {
  try {
    return await API.graphql({
      query: updateCustomLink,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};

export const updateMediaItems = async (data: any) => {
  try {
    return await API.graphql({
      query: updateMedia,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};

export const updateLogoItems = async (data: any) => {
  try {
    return await API.graphql({
      query: updateLogo,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};

export function* getSections(action: any): Generator<any, void, any> {
  try {
    const sections = yield call(() => fetchUserSections(action.payload));
    yield put(
      updateSections({
        sections: customizeSectionObject(
          sections.data.byInfluencerIdSections.items
        ),
      })
    );
  } catch (error) {
    console.log("error", error);
    yield put(setUserDataError(error));
  }
}

export const createSections = async (data: any) => {
  try {
    await API.graphql({
      query: createSection,
      variables: {
        input: data.section,
        id: data.id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return [];
  } catch (error) {
    throw error;
  }
};
export const editSection = async (data: any) => {
  try {
    await API.graphql({
      query: updateSection,
      variables: {
        input: data.section,
        id: data.id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    return [];
  } catch (error) {
    throw error;
  }
};
export const deleteSections = async (data: any) => {
  try {
    return await API.graphql({
      query: deleteSection,
      variables: {
        input: data.section,
        id: data.id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};
export const deleteSubSections = async (id: string) => {
  try {
    return await API.graphql({
      query: deleteSubSection,
      variables: {
        input: { id },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getImportedYtMedia = async (id: string) => {
  try {
    const importedYtMedia: GraphQLResult<any> = await API.graphql({
      query: byInfluencerIdYoutubeVideos,
      variables: {
        influencerId: id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return importedYtMedia.data.byInfluencerIdYoutubeVideos.items;
  } catch (error) {
    return null;
  }
};
export const getImportedFbMedia = async (id: string) => {
  try {
    const importedYtMedia: GraphQLResult<any> = await API.graphql({
      query: byInfluencerIdFacebookVideos,
      variables: {
        influencerId: id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return importedYtMedia.data.byInfluencerIdFacebookVideos.items;
  } catch (error) {
    return null;
  }
};
export const getImportedIgMedia = async (id: string) => {
  try {
    const importedYtMedia: GraphQLResult<any> = await API.graphql({
      query: byInfluencerIdInstagramVideos,
      variables: {
        influencerId: id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return importedYtMedia.data.byInfluencerIdInstagramVideos.items;
  } catch (error) {
    return null;
  }
};
export const updateSubSections = async (data: any) => {
  try {
    await API.graphql({
      query: updateSubSection,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return [];
  } catch (error) {
    throw error;
  }
};
export const createYtItems = async (data: any) => {
  try {
    return await API.graphql({
      query: createYoutubeItems,
      variables: {
        input: data.selectedMedia,
        sectionId: data.sectionId,
        subSectionId: data?.subSectionId || null,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};
export const createFbItems = async (data: any) => {
  try {
    return await API.graphql({
      query: createFacebookItems,
      variables: {
        input: data.selectedMedia,
        sectionId: data.sectionId,
        subSectionId: data?.subSectionId || null,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};
export const createIgItems = async (data: any) => {
  try {
    return await API.graphql({
      query: createInstagramItems,
      variables: {
        input: data.selectedMedia,
        sectionId: data.sectionId,
        subSectionId: data?.subSectionId || null,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    throw error;
  }
};
export const syncYtItems = async (data: any) => {
  try {
    const res = await API.graphql({
      query: syncYoutubeRepository,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    getUserYtMedia(res);
    return res;
  } catch (error) {
    console.error("Error creating fb items", error);
    throw error;
  }
};
export const syncFbItems = async (data: any) => {
  try {
    const res = await API.graphql({
      query: syncFacebookRepository,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    getUserFbMedia(res);
    return res;
  } catch (error) {
    console.error("Error creating fb items", error);
    throw error;
  }
};
export const syncIgItems = async (data: any) => {
  try {
    const res = await API.graphql({
      query: syncInstagramRepository,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    getUserIgMedia(res);
    return res;
  } catch (error) {
    console.error("Error creating fb items", error);
    throw error;
  }
};
export const sortSection = async (data: any) => {
  try {
    const res = await API.graphql({
      query: sortSectionByPosition,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return res;
  } catch (error) {
    console.error("section's re-arrangement has failed", error);
    throw error;
  }
};

export const sortSubSection = async (data: any) => {
  try {
    return await API.graphql({
      query: sortSubSectionByPosition,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.error("sub-section's re-arrangement has failed", error);
    throw error;
  }
};

export const updateAnalyticsToggle = async (data: any) => {
  try {
    return await API.graphql({
      query: updateInfluencer,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateFBVideo = async (data: any) => {
  try {
    return await API.graphql({
      query: updateFacebookVideo,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.error("Facebook Video Updation has Failed", error);
    throw error;
  }
};

export const updateYTVideo = async (data: any) => {
  try {
    return await API.graphql({
      query: updateYoutubeVideo,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.error("Youtube Video Updation has Failed", error);
    throw error;
  }
};

export const updateIGVideo = async (data: any) => {
  try {
    return await API.graphql({
      query: updateInstagramVideo,
      variables: {
        input: data,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.error("Instagram Video Updation has Failed", error);
    throw error;
  }
};

export function* getUserYoutubeData(action: any): Generator<any, void, any> {
  try {
    const { token, userId } = action.payload;

    editUser({
      googleToken: token,
      id: userId,
    });
    yield put(setYtToken({ token }));
    const userData = yield call(() => getUserYtData(token));
    if (!!userData?.response?.data?.error) {
      yield put(setYtToken({ token: "" }));
    } else {
      yield put(setUserYoutubeData(userData));
    }
  } catch (error) {
    yield put(setUserDataError(error));
  }
}

export function* getYoutubeMedia(action: any): Generator<any, void, any> {
  try {
    const { token } = action.payload;
    const ytMedia = yield call(() => getYtMedia(token));

    yield put(setYoutubeData(ytMedia));
  } catch (error) {
    console.log("error", error);
    yield put(setMediaDataError(error));
  }
}

export function* getUserFacebookData(action: any): Generator<any, void, any> {
  try {
    const { token, userId } = action.payload;
    const payload = {
      facebookToken: token,
      id: userId,
    };
    editUser(payload);
    yield put(setFbToken({ token }));
    const [userDetails] = yield call(() => getUserFbData(token));
    const { userData, mediaData } = userDetails;
    const finalYtmedia = mediaData.map((video: any) => {
      return {
        thumbnailUrl: video?.thumbnails?.data?.[0].uri,
        videoId: video?.id,
        title: video?.description,
        description: video?.description,
        type: "REEL",
        timestamp: video?.created_time,
        sourceMediaUrl: video?.source,
        permaLink: `https://www.facebook.com${video?.permalink_url}`,
      };
    });

    yield put(setUserFbData(userData));
    yield put(setFbData(finalYtmedia));
  } catch (error) {
    yield put(setFbToken({ token: "" }));
    console.log("error", error);
  }
}

export function* getFacebookMedia(action: any): Generator<any, void, any> {
  try {
    const { data } = action.payload;
    yield call(() => getFbMedia(data));
  } catch (error) {
    console.log("error", error);
  }
}

export function* getUserInstagramData(action: any): Generator<any, void, any> {
  try {
    const { token, userId } = action.payload;
    const payload = {
      facebookToken: token,
      id: userId,
    };
    editUser(payload);
    yield put(setIGToken({ token }));
    const { userDetails, error } = yield call(() => getUserIGData(token));

    if (error) {
      yield put(setIGError(error?.message));
    } else {
      const { mediaData } = userDetails;

      const finalIGMedia = mediaData?.map((video: any) => {
        return {
          thumbnailUrl: video?.thumbnail_url,
          videoId: video?.id,
          title: video?.caption,
          description: video?.caption,
          type: "REEL",
          timestamp: video?.timestamp,
          sourceMediaUrl: video?.media_url,
          permaLink: video?.permalink,
        };
      });
      yield put(setIGData(finalIGMedia));
    }
  } catch (error) {
    console.log("error", error);
  }
}

export const getSubSectionById = async (id: string) => {
  try {
    return await API.graphql({
      query: getSubSection,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getMediaSubSectionById = async (id: string) => {
  try {
    return await API.graphql({
      query: getMediaSubSection,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getPortfolioSubSectionById = async (id: string) => {
  try {
    return await API.graphql({
      query: getPortfolioSubSection,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getYoutubeSubSectionById = async (id: string) => {
  try {
    return await API.graphql({
      query: getYoutubeSubSection,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getCustomLinkById = async (id: string) => {
  try {
    return await API.graphql({
      query: getCustomLink,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getLogoSubSectionById = async (id: string) => {
  try {
    return await API.graphql({
      query: getLogoSubSection,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getLogoById = async (id: string) => {
  try {
    return await API.graphql({
      query: getLogo,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getMediaById = async (id: string) => {
  try {
    return await API.graphql({
      query: getMedia,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getYoutubeVideoById = async (id: string) => {
  try {
    return await API.graphql({
      query: getYoutubeVideo,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getAllYoutubeVideo = async () => {
  try {
    return await API.graphql({
      query: listYoutubeVideos,
      // variables: {
      //   id,
      // },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getFacebookVideoById = async (id: string) => {
  try {
    return await API.graphql({
      query: getFacebookVideo,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getInstagramVideoById = async (id: string) => {
  try {
    return await API.graphql({
      query: getInstagramVideo,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getSectionById = async (id: string) => {
  try {
    return await API.graphql({
      query: getSection,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getCustomLinkDataById = async (id: string) => {
  try {
    return await API.graphql({
      query: getCustomLinkData,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getMediaCTAData = async (id: string) => {
  try {
    return await API.graphql({
      query: getMediaCTA,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getYoutubeVideoCTAData = async (id: string) => {
  try {
    return await API.graphql({
      query: getYoutubeVideoCTA,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getFacebookVideoCTAData = async (id: string) => {
  try {
    return await API.graphql({
      query: getFacebookVideoCTA,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getInstagramVideoCTAData = async (id: string) => {
  try {
    return await API.graphql({
      query: getInstagramVideoCTA,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getImportedIgMediaData = async (id: string) => {
  try {
    const importedYtMedia: GraphQLResult<any> = await API.graphql({
      query: byInfluencerIdInstagramVideosData,
      variables: {
        influencerId: id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return importedYtMedia.data.byInfluencerIdInstagramVideos.items;
  } catch (error) {
    return null;
  }
};
export const getInstagramVideoDataById = async (id: string) => {
  try {
    return await API.graphql({
      query: getInstagramVideoData,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getImportedFbMediaData = async (id: string) => {
  try {
    const importedYtMedia: GraphQLResult<any> = await API.graphql({
      query: byInfluencerIdFacebookVideosData,
      variables: {
        influencerId: id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return importedYtMedia.data.byInfluencerIdFacebookVideos.items;
  } catch (error) {
    return null;
  }
};
export const getFacebookVideoDataById = async (id: string) => {
  try {
    return await API.graphql({
      query: getFacebookVideoData,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getImportedYtMediaData = async (id: string) => {
  try {
    const importedYtMedia: GraphQLResult<any> = await API.graphql({
      query: byInfluencerIdYoutubeVideosData,
      variables: {
        influencerId: id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return importedYtMedia.data.byInfluencerIdYoutubeVideos.items;
  } catch (error) {
    return null;
  }
};
export const getYoutubeVideoDataById = async (id: string) => {
  try {
    return await API.graphql({
      query: getYoutubeVideoData,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getMediaDataById = async (id: string) => {
  try {
    return await API.graphql({
      query: getMediaData,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const getLogoDataById = async (id: string) => {
  try {
    return await API.graphql({
      query: getLogoData,
      variables: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const sendContactFormData = async (data: any) => {
  try {
    return await API.graphql({
      query: sendContactFormEmail,
      variables: {
        input: data,
      },
      authMode: "API_KEY",
    });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
