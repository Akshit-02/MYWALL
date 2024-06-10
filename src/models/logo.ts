import { SubSection } from "@/models";

enum LogoType {
  IMAGE = "IMAGE",
}

export type ModelSubSectionLogoItemsConnection = {
  __typename: "ModelSubSectionLogoItemsConnection";
  items: Array<SubSectionLogoItems | null>;
  nextToken?: string | null;
};

export type SubSectionLogoItems = {
  __typename: "SubSectionLogoItems";
  id: string;
  logoId: string;
  subSectionId: string;
  logo: Logo;
  subSection: SubSection;
  createdAt: string;
  updatedAt: string;
  influencerId?: string | null;
};

export type Logo = {
  __typename: "Logo";
  id: string;
  influencerId?: string | null;
  isArchived?: boolean | null;
  type?: LogoType | null;
  mediaPath: string;
  name: string;
  size: number;
  position: number;
  createdAt: string;
  updatedAt: string;
  subSections?: ModelSubSectionLogoItemsConnection | null;
};
