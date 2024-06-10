/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubSectionYTItems = /* GraphQL */ `
  subscription OnCreateSubSectionYTItems(
    $filter: ModelSubscriptionSubSectionYTItemsFilterInput
    $influencerId: String
  ) {
    onCreateSubSectionYTItems(filter: $filter, influencerId: $influencerId) {
      id
      youtubeVideoId
      subSectionId
      youtubeVideo {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        channelTitle
        thumbnails {
          __typename
        }
        statistics {
          likeCount
          viewCount
          commentCount
          favoriteCount
          __typename
        }
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onUpdateSubSectionYTItems = /* GraphQL */ `
  subscription OnUpdateSubSectionYTItems(
    $filter: ModelSubscriptionSubSectionYTItemsFilterInput
    $influencerId: String
  ) {
    onUpdateSubSectionYTItems(filter: $filter, influencerId: $influencerId) {
      id
      youtubeVideoId
      subSectionId
      youtubeVideo {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        channelTitle
        thumbnails {
          __typename
        }
        statistics {
          likeCount
          viewCount
          commentCount
          favoriteCount
          __typename
        }
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onDeleteSubSectionYTItems = /* GraphQL */ `
  subscription OnDeleteSubSectionYTItems(
    $filter: ModelSubscriptionSubSectionYTItemsFilterInput
    $influencerId: String
  ) {
    onDeleteSubSectionYTItems(filter: $filter, influencerId: $influencerId) {
      id
      youtubeVideoId
      subSectionId
      youtubeVideo {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        channelTitle
        thumbnails {
          __typename
        }
        statistics {
          likeCount
          viewCount
          commentCount
          favoriteCount
          __typename
        }
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onCreateSubSectionFBItems = /* GraphQL */ `
  subscription OnCreateSubSectionFBItems(
    $filter: ModelSubscriptionSubSectionFBItemsFilterInput
    $influencerId: String
  ) {
    onCreateSubSectionFBItems(filter: $filter, influencerId: $influencerId) {
      id
      facebookVideoId
      subSectionId
      facebookVideo {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        sourceMediaUrl
        permaLink
        thumbnailUrl
        statistics {
          likeCount
          viewCount
          commentCount
          favoriteCount
          __typename
        }
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onUpdateSubSectionFBItems = /* GraphQL */ `
  subscription OnUpdateSubSectionFBItems(
    $filter: ModelSubscriptionSubSectionFBItemsFilterInput
    $influencerId: String
  ) {
    onUpdateSubSectionFBItems(filter: $filter, influencerId: $influencerId) {
      id
      facebookVideoId
      subSectionId
      facebookVideo {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        sourceMediaUrl
        permaLink
        thumbnailUrl
        statistics {
          likeCount
          viewCount
          commentCount
          favoriteCount
          __typename
        }
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onDeleteSubSectionFBItems = /* GraphQL */ `
  subscription OnDeleteSubSectionFBItems(
    $filter: ModelSubscriptionSubSectionFBItemsFilterInput
    $influencerId: String
  ) {
    onDeleteSubSectionFBItems(filter: $filter, influencerId: $influencerId) {
      id
      facebookVideoId
      subSectionId
      facebookVideo {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        sourceMediaUrl
        permaLink
        thumbnailUrl
        statistics {
          likeCount
          viewCount
          commentCount
          favoriteCount
          __typename
        }
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onCreateSubSectionIGItems = /* GraphQL */ `
  subscription OnCreateSubSectionIGItems(
    $filter: ModelSubscriptionSubSectionIGItemsFilterInput
    $influencerId: String
  ) {
    onCreateSubSectionIGItems(filter: $filter, influencerId: $influencerId) {
      id
      instagramVideoId
      subSectionId
      instagramVideo {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        sourceMediaUrl
        permaLink
        thumbnailUrl
        statistics {
          likeCount
          viewCount
          commentCount
          favoriteCount
          __typename
        }
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onUpdateSubSectionIGItems = /* GraphQL */ `
  subscription OnUpdateSubSectionIGItems(
    $filter: ModelSubscriptionSubSectionIGItemsFilterInput
    $influencerId: String
  ) {
    onUpdateSubSectionIGItems(filter: $filter, influencerId: $influencerId) {
      id
      instagramVideoId
      subSectionId
      instagramVideo {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        sourceMediaUrl
        permaLink
        thumbnailUrl
        statistics {
          likeCount
          viewCount
          commentCount
          favoriteCount
          __typename
        }
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onDeleteSubSectionIGItems = /* GraphQL */ `
  subscription OnDeleteSubSectionIGItems(
    $filter: ModelSubscriptionSubSectionIGItemsFilterInput
    $influencerId: String
  ) {
    onDeleteSubSectionIGItems(filter: $filter, influencerId: $influencerId) {
      id
      instagramVideoId
      subSectionId
      instagramVideo {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        sourceMediaUrl
        permaLink
        thumbnailUrl
        statistics {
          likeCount
          viewCount
          commentCount
          favoriteCount
          __typename
        }
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onCreateSubSectionCustomLinks = /* GraphQL */ `
  subscription OnCreateSubSectionCustomLinks(
    $filter: ModelSubscriptionSubSectionCustomLinksFilterInput
    $influencerId: String
  ) {
    onCreateSubSectionCustomLinks(
      filter: $filter
      influencerId: $influencerId
    ) {
      id
      customLinkId
      subSectionId
      customLink {
        id
        influencerId
        isArchived
        linkType
        image
        title
        description
        link
        secondaryLink
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onUpdateSubSectionCustomLinks = /* GraphQL */ `
  subscription OnUpdateSubSectionCustomLinks(
    $filter: ModelSubscriptionSubSectionCustomLinksFilterInput
    $influencerId: String
  ) {
    onUpdateSubSectionCustomLinks(
      filter: $filter
      influencerId: $influencerId
    ) {
      id
      customLinkId
      subSectionId
      customLink {
        id
        influencerId
        isArchived
        linkType
        image
        title
        description
        link
        secondaryLink
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
export const onDeleteSubSectionCustomLinks = /* GraphQL */ `
  subscription OnDeleteSubSectionCustomLinks(
    $filter: ModelSubscriptionSubSectionCustomLinksFilterInput
    $influencerId: String
  ) {
    onDeleteSubSectionCustomLinks(
      filter: $filter
      influencerId: $influencerId
    ) {
      id
      customLinkId
      subSectionId
      customLink {
        id
        influencerId
        isArchived
        linkType
        image
        title
        description
        link
        secondaryLink
        createdAt
        updatedAt
        subSections {
          nextToken
          __typename
        }
        __typename
      }
      subSection {
        id
        influencerId
        position
        type
        title
        enabled
        sectionId
        youtubeItems {
          nextToken
          __typename
        }
        facebookItems {
          nextToken
          __typename
        }
        instagramItems {
          nextToken
          __typename
        }
        customLinkItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      influencerId
      __typename
    }
  }
`;
