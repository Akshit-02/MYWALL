import { CTAButton, CustomLinkType, SubSection } from "@/models";

export type ModelSubSectionCustomLinksConnection = {
  items: Array<SubSectionCustomLinks>;
  nextToken?: string | null;
};

export type SubSectionCustomLinks = {
  __typename: "SubSectionCustomLinks";
  id: string;
  customLinkId: string;
  subSectionId: string;
  customLink: CustomLink;
  subSection: SubSection;
  createdAt: string;
  updatedAt: string;
  influencerId?: string | null;
};

export type CustomLink = {
  __typename: "CustomLink";
  id: string;
  influencerId?: string | null;
  isArchived?: boolean | null;
  linkType: CustomLinkType;
  image?: string | null;
  title?: string | null;
  description?: string | null;
  link: string;
  position: number;
  secondaryLink?: string | null;
  isAffiliate?: boolean;
  playStoreLink?: string | null;
  appStoreLink?: string | null;
  createdAt: string;
  updatedAt: string;
  subSections?: ModelSubSectionCustomLinksConnection | null;
  ctaButton?: CTAButton
};
