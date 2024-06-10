import {
  CustomLinkType,
  ModelSubSectionCustomLinksConnection,
  ModelSubSectionFBItemsConnection,
  ModelSubSectionIGItemsConnection,
  ModelSubSectionMediaItemsConnection,
  ModelSubSectionLogoItemsConnection,
  ModelSubSectionYTItemsConnection,
} from "@/models";

export enum SubSectionType {
  YOUTUBE = "YOUTUBE",
  FACEBOOK = "FACEBOOK",
  INSTAGRAM = "INSTAGRAM",
  CUSTOMLINK = "CUSTOMLINK",
  MEDIA = "MEDIA",
  LOGO = "LOGO",
}

export type SubSection = {
  __typename: "SubSection";
  id: string;
  influencerId?: string | null;
  position: number;
  type: SubSectionType;
  customLinkType?: CustomLinkType;
  title?: string;
  enabled?: boolean | null;
  sectionId: string;
  youtubeItems?: ModelSubSectionYTItemsConnection | null;
  facebookItems?: ModelSubSectionFBItemsConnection | null;
  instagramItems?: ModelSubSectionIGItemsConnection | null;
  customLinkItems?: ModelSubSectionCustomLinksConnection | null;
  mediaItems?: ModelSubSectionMediaItemsConnection | null;
  logoItems?: ModelSubSectionLogoItemsConnection | null;
  createdAt: string;
  updatedAt: string;
};

type ModelSubSectionConnection = {
  items: Array<SubSection | null>;
  nextToken?: string | null;
};

export interface Section {
  id: string;
  influencerId?: string | null;
  isArchived?: boolean | null;
  title: string;
  position: number;
  subSections?: ModelSubSectionConnection | null;
  createdAt: string;
  updatedAt: string;
}
