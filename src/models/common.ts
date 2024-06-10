export type Statistics = {
  __typename: "Statistics";
  likeCount?: number | null;
  viewCount?: number | null;
  commentCount?: number | null;
  favoriteCount?: number | null;
};

export enum DateGroupType {
  LAST30 = "LAST30",
  LAST60 = "LAST60",
  LAST90 = "LAST90",
}

export enum CustomLinkType {
  APP = "APP",
  AMAZON = "AMAZON",
  FLIPKART = "FLIPKART",
  PRODUCT = "PRODUCT",
  EXTERNAL = "EXTERNAL",
  CUSTOM = "CUSTOM",
  YTLINK = "YTLINK",
  IGLINK = "IGLINK",
}

export interface mediaDataProps {
  title?: string;
  description?: string;
  sectionId: string;
  subSectionId?: string;
  image?: string;
  link?: string;
  appTitle?: string;
  enabled?: boolean;
  ctaText?: string;
  ctaLink?: string;
  ctype?: string;
  type?:
  | "SHORT"
  | "FACEBOOK"
  | "INSTAGRAM"
  | "APPS"
  | "PRODUCT"
  | "MEDIA"
  | "CUSTOM"
  | "YTLINK"
  | "IGLINK"
  | "LOGO";
  videosData?: any[];
}

export interface customMediaDataProps {
  title: string;
  description?: string;
  sectionId: string;
  subSectionId?: string;
  image?: string;
  appTitle?: string;
  enabled: boolean;
  type:
    | "SHORT"
    | "FACEBOOK"
    | "INSTAGRAM"
    | "APPS"
    | "PRODUCT"
    | "MEDIA"
    | "LOGO";
  media?: any[];
}
