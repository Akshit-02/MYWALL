import { Statistics } from "@/models/common";
import { CTAButton, SubSection } from "@/models";

enum YoutubeVideoType {
  VIDEO = "VIDEO",
  SHORT = "SHORT",
}

export interface YoutubeResponse {
  data: {
    items: YoutubeMediaResponse[];
    nextPageToken?: string;
  };
}
export interface YoutubeMediaResponse {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}
export type YoutubeVideo = {
  __typename: "YoutubeVideo";
  id: string;
  influencerId?: string | null;
  isArchived?: boolean | null;
  videoId: string;
  title?: string | null;
  description?: string | null;
  type?: YoutubeVideoType | null;
  timestamp?: string | null;
  position: number;
  ctaButton?: CTAButton;
  channelTitle?: string | null;
  thumbnailUrl?: string | null;
  statistics?: Statistics | null;
  createdAt: string;
  updatedAt: string;
  subSections?: ModelSubSectionYTItemsConnection | null;
};

export type ModelSubSectionYTItemsConnection = {
  __typename: "ModelSubSectionYTItemsConnection";
  items: Array<SubSectionYTItems | null>;
  nextToken?: string | null;
};

type Thumbnails = {
  __typename: "Thumbnails";
  default?: ThumbnailInfo | null;
  medium?: ThumbnailInfo | null;
  high?: ThumbnailInfo | null;
  standard?: ThumbnailInfo | null;
  maxres?: ThumbnailInfo | null;
};

type ThumbnailInfo = {
  __typename: "ThumbnailInfo";
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

export interface ReelsTypes {
  id: number;
  instagramVideo: object;
  facebookVideo: object;
  videoData: {
    isArchived: boolean;
    videoId: string;
    title: string;
    description: string;
    type: string;
    timestamp: string;
    sourceMediaUrl: string;
    permaLink: string;
    thumbnailUrl: string;
    statistics: {
      likeCount: number;
      viewCount: number;
      commentCount: number;
    };
  };
}

export type SubSectionYTItems = {
  __typename: "SubSectionYTItems";
  id: string;
  youtubeVideoId: string;
  subSectionId: string;
  youtubeVideo: YoutubeVideo;
  subSection: SubSection;
  createdAt: string;
  updatedAt: string;
  influencerId?: string | null;
};
