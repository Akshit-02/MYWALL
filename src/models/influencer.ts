import { Section } from "@/models/section";
import { YoutubeVideo } from "./youtube";
import { FacebookVideo } from "./facebook";
import { InstagramVideo } from "./instagram";
import { DateGroupType } from "@/models/common";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export type Influencer = {
  id?: string;
  name?: string | null;
  slug?: string | null;
  username?: string | null;
  bio?: string | null;
  email?: string | null;
  phone?: string | null;
  gender?: Gender | null;
  dob?: string | null;
  isActive?: boolean | null;
  address?: Address | null;
  tags?: Array<string> | null;
  themeColor?: string | null;
  ctaButton?: Array<CTAButton> | null;
  profilePictureWithBg?: string | null;
  profilePictureWithoutBg?: string | null;
  profileStatusCode?: string | null;
  socialLinks?: SocialLinks | null;
  isDarkThemeEnabled?: boolean | null;
  isAnalyticsEnabled?: boolean | null;
  instagramMetrics?: Analytics | null;
  youtubeMetrics?: Analytics | null;
  facebookToken?: AuthToken | null;
  googleToken?: AuthToken | null;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export enum CTAButtonType {
  LINK = "LINK",
  EMAIL = "EMAIL",
  CONTACT = "CONTACT",
}

export type CTAButton = {
  text?: string | null;
  link?: string | null;
  isActive?: boolean | null;
  type?: CTAButtonType | null;
};

export type SocialLinks = {
  instagram?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  pinterest?: string | null;
  linkedIn?: string | null;
  snapchat?: string | null;
  tiktok?: string | null;
  other?: string | null;
};

export interface UserDetail extends Influencer {
  sections?: Array<Section>;
  error?: any;
}

export interface ImportedMedia extends Influencer {
  ytMedia?: Array<YoutubeVideo>;
  fbMedia?: Array<FacebookVideo>;
  igMedia?: Array<InstagramVideo>;
  error?: string;
}

export type Analytics = {
  __typename: "Analytics";
  statistics?: Array<AnalyticsStatistics | null> | null;
  topAudienceCities?: Array<string> | null;
  sexRatio?: SexRatioType | null;
  ageGroupRatio?: Array<AgeGroupRatioType> | null;
};

export type AnalyticsStatistics = {
  __typename: "AnalyticsStatistics";
  likeCount?: number | null;
  viewCount?: number | null;
  commentCount?: number | null;
  dateLabel: DateGroupType;
};

export type SexRatioType = {
  __typename: "SexRatioType";
  female: number;
  male: number;
};

export type AgeGroupRatioType = {
  __typename: "AgeGroupRatioType";
  ageGroup: string;
  percentage: number;
};

export type AuthToken = {
  __typename?: "AuthToken";
  accessToken?: string | null;
  refreshToken?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  isExpired?: boolean | null;
};
