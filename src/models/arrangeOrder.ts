export interface CtaButton {
    text: string;
    link: string;
    isActive: boolean;
    type: string;
    __typename: string;
}

export interface SubSectionCustomLinks {
    id: string;
    customLinkId: string;
    subSectionId: string;
    createdAt: string;
    updatedAt: string;
    influencerId: string;
    __typename: string;
}

export interface CustomLink {
    id: string;
    influencerId: string;
    isArchived: boolean;
    linkType: string;
    image: string;
    title: string;
    ctaButton: CtaButton;
    description: string;
    link: string;
    position: number;
    secondaryLink: string;
    isAffiliate: string;
    playStoreLink: string;
    appStoreLink: string;
    createdAt: string;
    updatedAt: string;
    subSections: {
        items: SubSectionCustomLinks[];
        nextToken: string;
        __typename: string;
    };
    __typename: string;
}

export interface EditCustomLinksProps {
    data: CustomLink[];
    subSectionId: string;
}

export interface Video {
    id: string;
    isArchived: boolean;
    videoId: string;
    thumbnailUrl: string;
    title: string;
    position: number | null;
}

export interface EditReelsOrderProp {
    data: Video[];
    type: string;
    subSectionId: string;
}