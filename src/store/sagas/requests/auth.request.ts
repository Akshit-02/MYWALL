import { withSSRContext } from "aws-amplify";
import {
  byInfluencerIdSections,
  getInfluencerBySlug,
  getInfluencerData,
  listInfluencers,
} from "@/graphql/api";
import { customizeSectionObject } from "@/utils/helperFunction";
import { Influencer, UserDetail } from "@/models";

export const getUserDetail = async (
  slug: string
): Promise<UserDetail | null> => {
  try {
    const SSR = withSSRContext();
    const influencer = await SSR.API.graphql({
      query: getInfluencerBySlug,
      variables: { slug },
      authMode: "API_KEY",
    }).then((response: any) => response.data.getInfluencerBySlug);

    if (!!influencer) {
      const sections = await SSR.API.graphql({
        query: byInfluencerIdSections,
        variables: { influencerId: influencer.id },
        authMode: "API_KEY",
      }).then((response: any) => response.data.byInfluencerIdSections.items);

      return {
        ...influencer,
        sections: customizeSectionObject(sections),
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const listUsers = async (): Promise<Array<Influencer> | null> => {
  try {
    const SSR = withSSRContext();

    const influencers = await SSR.API.graphql({
      query: listInfluencers,
      authMode: "API_KEY",
    }).then((response: any) => response.data.listInfluencers.items);

    return influencers;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const fetchUserBySlug = async (slug: string): Promise<Influencer> => {
  try {
    const SSR = withSSRContext();

    const influencer = await SSR.API.graphql({
      query: getInfluencerData,
      variables: { slug },
      authMode: "API_KEY",
    }).then((response: any) => response.data.getInfluencerBySlug);

    return influencer;
  } catch {
    return { id: "", name: "", bio: "" };
  }
};
export const getUserBySlug = async (slug: string): Promise<Influencer> => {
  try {
    const SSR = withSSRContext();
    const influencer = await SSR.API.graphql({
      query: getInfluencerData,
      variables: { slug },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((response: any) => response.data.getInfluencerBySlug);

    return influencer;
  } catch {
    return { id: "", name: "", bio: "" };
  }
};
