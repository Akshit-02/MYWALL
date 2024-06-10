import { CTAButton, Statistics, SubSection } from "@/models";

enum MetaVideoType {
  VIDEO = "VIDEO",
  REEL = "REEL",
}

export type ModelSubSectionIGItemsConnection = {
  __typename: "ModelSubSectionIGItemsConnection";
  items: Array<SubSectionIGItems | null>;
  nextToken?: string | null;
};

export type SubSectionIGItems = {
  id: string;
  instagramVideoId: string;
  subSectionId: string;
  instagramVideo: InstagramVideo;
  subSection: SubSection;
  createdAt: string;
  updatedAt: string;
  influencerId?: string | null;
};

export type InstagramVideo = {
  __typename: "InstagramVideo";
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
  subSections?: ModelSubSectionIGItemsConnection | null;
};
