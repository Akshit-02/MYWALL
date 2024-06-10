import { SubSection } from "@/models";

enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  UNKNOWN = "UNKNOWN",
}

export type ModelSubSectionMediaItemsConnection = {
  __typename: "ModelSubSectionMediaItemsConnection";
  items: Array<SubSectionMediaItems | null>;
  nextToken?: string | null;
};

export type SubSectionMediaItems = {
  __typename: "SubSectionMediaItems";
  id: string;
  mediaId: string;
  subSectionId: string;
  media: Media;
  subSection: SubSection;
  createdAt: string;
  updatedAt: string;
  influencerId?: string | null;
};

export type Media = {
  __typename: "Media";
  id: string;
  influencerId?: string | null;
  isArchived?: boolean | null;
  type?: MediaType | null;
  mediaPath: string;
  name: string;
  size: number;
  position: number;
  createdAt: string;
  updatedAt: string;
  subSections?: ModelSubSectionMediaItemsConnection | null;
};
