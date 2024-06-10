import { CTAButton, Statistics, SubSection } from "@/models";

enum MetaVideoType {
  VIDEO = "VIDEO",
  REEL = "REEL",
}

export type ModelSubSectionFBItemsConnection = {
  __typename: "ModelSubSectionFBItemsConnection";
  items: Array<SubSectionFBItems | null>;
  nextToken?: string | null;
};

export type SubSectionFBItems = {
  id: string;
  facebookVideoId: string;
  subSectionId: string;
  facebookVideo: FacebookVideo;
  subSection: SubSection;
  createdAt: string;
  updatedAt: string;
  influencerId?: string | null;
};

export type FacebookVideo = {
  __typename: "FacebookVideo";
  id: string;
  influencerId?: string | null;
  isArchived?: boolean | null;
  videoId: string;
  title?: string | null;
  description?: string | null;
  type: MetaVideoType;
  position: number;
  timestamp?: string | null;
  sourceMediaUrl?: string | null;
  permaLink: string;
  thumbnailUrl?: string | null;
  statistics?: Statistics | null;
  ctaButton?: CTAButton;
  createdAt: string;
  updatedAt: string;
  subSections?: ModelSubSectionFBItemsConnection | null;
};
