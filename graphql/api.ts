export const getInfluencerBySlug = /* GraphQL */ `
  query GetInfluencerBySlug($slug: ID!) {
    getInfluencerBySlug(slug: $slug) {
      id
      name
      slug
      bio
      email
      phone
      gender
      dob
      isActive
      address {
        street
        city
        state
        country
        postalCode
      }
      tags
      themeColor
      ctaButton {
        text
        link
        isActive
        type
      }
      profilePictureWithBg
      profilePictureWithoutBg
      socialLinks {
        instagram
        facebook
        twitter
        youtube
        pinterest
        linkedIn
        snapchat
        tiktok
        other
        __typename
      }
      createdAt
      updatedAt
      instagramMetrics {
        statistics {
          likeCount
          viewCount
          commentCount
          dateLabel
          __typename
        }
        topAudienceCities
        sexRatio {
          female
          male
          __typename
        }
        ageGroupRatio {
          ageGroup
          percentage
          __typename
        }
        __typename
      }
      youtubeMetrics {
        statistics {
          likeCount
          viewCount
          commentCount
          dateLabel
          __typename
        }
        topAudienceCities
        sexRatio {
          female
          male
          __typename
        }
        ageGroupRatio {
          ageGroup
          percentage
          __typename
        }
        __typename
      }
      isAnalyticsEnabled
      isDarkThemeEnabled
      facebookToken {
        accessToken
        refreshToken
        createdAt
        updatedAt
        isExpired
        __typename
      }
      googleToken {
        accessToken
        refreshToken
        createdAt
        updatedAt
        isExpired
        __typename
      }
      profileStatusCode
      __typename
    }
  }
`;

export const getInfluencer = /* GraphQL */ `
  query GetInfluencer($id: ID!) {
    getInfluencer(id: $id) {
      id
      name
      slug
      username
      bio
      email
      phone
      gender
      dob
      isActive
      address {
        street
        city
        state
        country
        postalCode
        __typename
      }
      tags
      themeColor
      ctaButton {
        text
        link
        isActive
        type
      }
      profilePictureWithBg
      profilePictureWithoutBg
      socialLinks {
        instagram
        facebook
        twitter
        youtube
        pinterest
        linkedIn
        snapchat
        tiktok
        other
        __typename
      }
      createdAt
      updatedAt
      instagramMetrics {
        statistics {
          likeCount
          viewCount
          commentCount
          dateLabel
          __typename
        }
        topAudienceCities
        sexRatio {
          female
          male
          __typename
        }
        ageGroupRatio {
          ageGroup
          percentage
          __typename
        }
        __typename
      }
      youtubeMetrics {
        statistics {
          likeCount
          viewCount
          commentCount
          dateLabel
          __typename
        }
        topAudienceCities
        sexRatio {
          female
          male
          __typename
        }
        ageGroupRatio {
          ageGroup
          percentage
          __typename
        }
        __typename
      }
      isAnalyticsEnabled
      isDarkThemeEnabled
      facebookToken {
        accessToken
        refreshToken
        createdAt
        updatedAt
        isExpired
        __typename
      }
      googleToken {
        accessToken
        refreshToken
        createdAt
        updatedAt
        isExpired
        __typename
      }
      profileStatusCode
      __typename
    }
  }
`;

export const listInfluencers = /* GraphQL */ `
  query ListInfluencers(
    $filter: ModelInfluencerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInfluencers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        slug
      }
    }
  }
`;

export const getInfluencerData = /* GraphQL */ `
  query GetInfluencerBySlug($slug: ID!) {
    getInfluencerBySlug(slug: $slug) {
      id
      name
      slug
      bio
      tags
      profilePictureWithoutBg
      profilePictureWithBg
      isAnalyticsEnabled
      isDarkThemeEnabled
      instagramMetrics {
        statistics {
          likeCount
          viewCount
          commentCount
          dateLabel
          __typename
        }
        topAudienceCities
        sexRatio {
          female
          male
          __typename
        }
        ageGroupRatio {
          ageGroup
          percentage
          __typename
        }
        __typename
      }
      youtubeMetrics {
        statistics {
          likeCount
          viewCount
          commentCount
          dateLabel
          __typename
        }
        topAudienceCities
        sexRatio {
          female
          male
          __typename
        }
        ageGroupRatio {
          ageGroup
          percentage
          __typename
        }
        __typename
      }
    }
  }
`;

export const byInfluencerIdSections = /* GraphQL */ `
  query ByInfluencerIdSections(
    $influencerId: String!
    $position: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byInfluencerIdSections(
      influencerId: $influencerId
      position: $position
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isArchived
        position
        createdAt
        title
        updatedAt
        subSections {
          nextToken
          items {
            enabled
            id
            position
            sectionId
            title
            type
            youtubeItems {
              items {
                id
                youtubeVideoId
                subSectionId
                youtubeVideo {
                  channelTitle
                  createdAt
                  description
                  id
                  isArchived
                  position
                  thumbnailUrl
                  videoId
                  title
                  timestamp
                  type
                  updatedAt
                  ctaButton {
                    text
                    link
                    isActive
                  }
                }
              }
            }
            instagramItems {
              items {
                id
                createdAt
                updatedAt
                subSectionId
                instagramVideo {
                  id
                  isArchived
                  videoId
                  title
                  description
                  position
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
                  }
                  ctaButton {
                    text
                    link
                    isActive
                  }
                  createdAt
                  updatedAt
                }
              }
            }
            facebookItems {
              items {
                id
                subSectionId
                facebookVideo {
                  id
                  isArchived
                  videoId
                  title
                  description
                  type
                  position
                  thumbnailUrl
                  timestamp
                  sourceMediaUrl
                  permaLink
                  createdAt
                  updatedAt
                  ctaButton {
                    text
                    link
                    isActive
                  }
                }
              }
            }
            customLinkItems {
              items {
                createdAt
                customLinkId
                id
                subSectionId
                updatedAt
                customLink {
                  createdAt
                  description
                  id
                  isArchived
                  link
                  linkType
                  position
                  secondaryLink
                  title
                  updatedAt
                  image
                  isAffiliate
                  playStoreLink
                  appStoreLink
                  ctaButton {
                    text
                    link
                    isActive
                    type
                  }
                }
              }
            }
            mediaItems {
              items {
                id
                subSectionId
                media {
                  id
                  isArchived
                  mediaPath
                  thumbnailUrl
                  title
                  name
                  size
                  position
                  type
                  ctaButton {
                    text
                    link
                    isActive
                  }
                }
              }
            }
            logoItems {
              items {
                id
                subSectionId
                logo {
                  id
                  isArchived
                  mediaPath
                  title
                  name
                  size
                  position
                  type
                }
              }
            }
          }
        }
      }
      nextToken
      __typename
    }
  }
`;

export const updateInfluencer = /* GraphQL */ `
  mutation UpdateInfluencer(
    $input: UpdateInfluencerInput!
    $condition: ModelInfluencerConditionInput
  ) {
    updateInfluencer(input: $input, condition: $condition) {
      id
      name
      slug
      username
      bio
      email
      phone
      gender
      dob
      isActive
      address {
        street
        city
        state
        country
        postalCode
        __typename
      }
      tags
      themeColor
      ctaButton {
        text
        link
        isActive
        type
      }
      profilePictureWithBg
      profilePictureWithoutBg
      socialLinks {
        instagram
        facebook
        twitter
        youtube
        pinterest
        linkedIn
        snapchat
        tiktok
        other
        __typename
      }
      createdAt
      updatedAt
      instagramMetrics {
        statistics {
          likeCount
          viewCount
          commentCount
          dateLabel
          __typename
        }
        topAudienceCities
        sexRatio {
          female
          male
          __typename
        }
        ageGroupRatio {
          ageGroup
          percentage
          __typename
        }
        __typename
      }
      youtubeMetrics {
        statistics {
          likeCount
          viewCount
          commentCount
          dateLabel
          __typename
        }
        topAudienceCities
        sexRatio {
          female
          male
          __typename
        }
        ageGroupRatio {
          ageGroup
          percentage
          __typename
        }
        __typename
      }
      isAnalyticsEnabled
      isDarkThemeEnabled
      facebookToken {
        accessToken
        refreshToken
        createdAt
        updatedAt
        isExpired
        __typename
      }
      googleToken {
        accessToken
        refreshToken
        createdAt
        updatedAt
        isExpired
        __typename
      }
      profileStatusCode
      __typename
    }
  }
`;

export const createCustomLink = /* GraphQL */ `
  mutation CreateCustomLink(
    $input: CreateCustomLinkInput!
    $condition: ModelCustomLinkConditionInput
  ) {
    createCustomLink(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      linkType
      image
      title
      description
      link
      secondaryLink
      isAffiliate
      playStoreLink
      appStoreLink
      createdAt
      updatedAt
      subSections {
        items {
          id
          customLinkId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const createSubSectionCustomLinks = /* GraphQL */ `
  mutation CreateSubSectionCustomLinks(
    $input: CreateSubSectionCustomLinksInput!
    $condition: ModelSubSectionCustomLinksConditionInput
  ) {
    createSubSectionCustomLinks(input: $input, condition: $condition) {
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
        ctaButton {
          text
          link
          isActive
          type
        }
        description
        link
        secondaryLink
        isAffiliate
        playStoreLink
        appStoreLink
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
export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      title
      position
      subSections {
        items {
          id
          influencerId
          position
          type
          title
          enabled
          sectionId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      title
      position
      subSections {
        items {
          id
          influencerId
          position
          type
          title
          enabled
          sectionId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const createSubSection = /* GraphQL */ `
  mutation CreateSubSection(
    $input: CreateSubSectionInput!
    $condition: ModelSubSectionConditionInput
  ) {
    createSubSection(input: $input, condition: $condition) {
      id
      influencerId
      position
      type
      title
      enabled
      sectionId
      youtubeItems {
        items {
          id
          youtubeVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      facebookItems {
        items {
          id
          facebookVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      instagramItems {
        items {
          id
          instagramVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      customLinkItems {
        items {
          id
          customLinkId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      mediaItems {
        items {
          id
          mediaId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      logoItems {
        items {
          id
          logoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSubSection = /* GraphQL */ `
  mutation UpdateSubSection(
    $input: UpdateSubSectionInput!
    $condition: ModelSubSectionConditionInput
  ) {
    updateSubSection(input: $input, condition: $condition) {
      id
      influencerId
      position
      type
      title
      enabled
      sectionId
      youtubeItems {
        items {
          id
          youtubeVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      facebookItems {
        items {
          id
          facebookVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      instagramItems {
        items {
          id
          instagramVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      customLinkItems {
        items {
          id
          customLinkId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      mediaItems {
        items {
          id
          mediaId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      logoItems {
        items {
          id
          logoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
    }
  }
`;
export const createYoutubeItems = /* GraphQL */ `
  mutation CreateYoutubeItems(
    $sectionId: ID!
    $subSectionId: ID
    $input: SyncYoutubeRepositoryInput!
  ) {
    createYoutubeItems(
      sectionId: $sectionId
      subSectionId: $subSectionId
      input: $input
    ) {
      code
      message
      __typename
    }
  }
`;
export const createFacebookItems = /* GraphQL */ `
  mutation CreateFacebookItems(
    $sectionId: ID!
    $subSectionId: ID
    $input: SyncFacebookRepositoryInput!
  ) {
    createFacebookItems(
      sectionId: $sectionId
      subSectionId: $subSectionId
      input: $input
    ) {
      code
      message
      __typename
    }
  }
`;
export const createInstagramItems = /* GraphQL */ `
  mutation CreateInstagramItems(
    $sectionId: ID!
    $subSectionId: ID
    $input: SyncInstagramRepositoryInput!
  ) {
    createInstagramItems(
      sectionId: $sectionId
      subSectionId: $subSectionId
      input: $input
    ) {
      code
      message
      __typename
    }
  }
`;
export const syncYoutubeRepository = /* GraphQL */ `
  mutation SyncYoutubeRepository($input: SyncYoutubeRepositoryInput!) {
    syncYoutubeRepository(input: $input) {
      code
      message
      __typename
    }
  }
`;
export const syncFacebookRepository = /* GraphQL */ `
  mutation SyncFacebookRepository($input: SyncFacebookRepositoryInput!) {
    syncFacebookRepository(input: $input) {
      code
      message
      __typename
    }
  }
`;
export const syncInstagramRepository = /* GraphQL */ `
  mutation SyncInstagramRepository($input: SyncInstagramRepositoryInput!) {
    syncInstagramRepository(input: $input) {
      code
      message
      __typename
    }
  }
`;
export const byInfluencerIdYoutubeVideos = /* GraphQL */ `
  query ByInfluencerIdYoutubeVideos(
    $influencerId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelYoutubeVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byInfluencerIdYoutubeVideos(
      influencerId: $influencerId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        timestamp
        channelTitle
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
      nextToken
      __typename
    }
  }
`;
export const byInfluencerIdFacebookVideos = /* GraphQL */ `
  query ByInfluencerIdFacebookVideos(
    $influencerId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFacebookVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byInfluencerIdFacebookVideos(
      influencerId: $influencerId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const byInfluencerIdInstagramVideos = /* GraphQL */ `
  query ByInfluencerIdInstagramVideos(
    $influencerId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInstagramVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byInfluencerIdInstagramVideos(
      influencerId: $influencerId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;

export const sortSectionByPosition = /* GraphQL */ `
  mutation SortSectionByPosition($input: SortSectionsByPosition) {
    sortSectionByPosition(input: $input) {
      code
      message
      __typename
    }
  }
`;

export const sortSubSectionByPosition = /* GraphQL */ `
  mutation SortSubSectionByPosition($input: SortSubSectionsByPosition) {
    sortSubSectionByPosition(input: $input) {
      code
      message
      __typename
    }
  }
`;
export const deleteSection = /* GraphQL */ `
  mutation DeleteSection(
    $input: DeleteSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    deleteSection(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      title
      position
      subSections {
        items {
          id
          influencerId
          position
          type
          title
          enabled
          sectionId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const getUrlMeta = /* GraphQL */ `
  mutation GetUrlMeta($link: AWSURL!) {
    getUrlMeta(link: $link) {
      title
      description
      image
      __typename
    }
  }
`;
export const createCustomLinkItems = /* GraphQL */ `
  mutation CreateCustomLinkItems(
    $sectionId: ID!
    $subSectionId: ID
    $input: SyncCustomLinkRepositoryInput!
  ) {
    createCustomLinkItems(
      sectionId: $sectionId
      subSectionId: $subSectionId
      input: $input
    ) {
      code
      message
      __typename
    }
  }
`;

export const updateCustomLink = /* GraphQL */ `
  mutation UpdateCustomLink(
    $input: UpdateCustomLinkInput!
    $condition: ModelCustomLinkConditionInput
  ) {
    updateCustomLink(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      linkType
      image
      title
      ctaButton {
        text
        link
        isActive
        type
      }
      description
      link
      secondaryLink
      position
      isAffiliate
      playStoreLink
      appStoreLink
      createdAt
      updatedAt
      subSections {
        items {
          id
          customLinkId
          subSectionId
          createdAt
          updatedAt
          influencerId
        }
      }
    }
  }
`;

export const deleteSubSection = /* GraphQL */ `
  mutation DeleteSubSection(
    $input: DeleteSubSectionInput!
    $condition: ModelSubSectionConditionInput
  ) {
    deleteSubSection(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updateFacebookVideo = /* GraphQL */ `
  mutation UpdateFacebookVideo(
    $input: UpdateFacebookVideoInput!
    $condition: ModelFacebookVideoConditionInput
  ) {
    updateFacebookVideo(input: $input, condition: $condition) {
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
        items {
          id
          facebookVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;

export const updateYoutubeVideo = /* GraphQL */ `
  mutation UpdateYoutubeVideo(
    $input: UpdateYoutubeVideoInput!
    $condition: ModelYoutubeVideoConditionInput
  ) {
    updateYoutubeVideo(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      videoId
      title
      description
      position
      type
      ctaButton {
        text
        link
        isActive
        type
      }
      timestamp
      channelTitle
      thumbnailUrl
      statistics {
        likeCount
        viewCount
        commentCount
        favoriteCount
      }
      createdAt
      updatedAt
      subSections {
        items {
          id
          youtubeVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
        }
        nextToken
      }
    }
  }
`;

export const updateInstagramVideo = /* GraphQL */ `
  mutation UpdateInstagramVideo(
    $input: UpdateInstagramVideoInput!
    $condition: ModelInstagramVideoConditionInput
  ) {
    updateInstagramVideo(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      videoId
      title
      description
      type
      timestamp
      position
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
        items {
          id
          instagramVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;

export const createMediaItems = /* GraphQL */ `
  mutation CreateMediaItems(
    $sectionId: ID!
    $subSectionId: ID
    $input: SyncMediaRepositoryInput!
  ) {
    createMediaItems(
      sectionId: $sectionId
      subSectionId: $subSectionId
      input: $input
    ) {
      code
      message
      __typename
    }
  }
`;

export const createLogoItems = /* GraphQL */ `
  mutation CreateLogoItems(
    $sectionId: ID!
    $subSectionId: ID
    $input: SyncLogoRepositoryInput!
  ) {
    createLogoItems(
      sectionId: $sectionId
      subSectionId: $subSectionId
      input: $input
    ) {
      code
      message
      __typename
    }
  }
`;

export const updateMedia = /* GraphQL */ `
  mutation UpdateMedia(
    $input: UpdateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    updateMedia(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      type
      mediaPath
      thumbnailUrl
      name
      size
      title
      position
      ctaButton {
        text
        link
        isActive
        type
      }
      createdAt
      updatedAt
      subSections {
        items {
          id
          mediaId
          subSectionId
          createdAt
          updatedAt
          influencerId
        }
        nextToken
      }
    }
  }
`;

export const updateLogo = /* GraphQL */ `
  mutation UpdateLogo(
    $input: UpdateLogoInput!
    $condition: ModelLogoConditionInput
  ) {
    updateLogo(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      type
      mediaPath
      name
      size
      title
      position
      createdAt
      updatedAt
      subSections {
        items {
          id
          logoId
          subSectionId
          createdAt
          updatedAt
          influencerId
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;

export const getSubSection = /* GraphQL */ `
  query GetSubSection($id: ID!) {
    getSubSection(id: $id) {
      id
      sectionId
      position
      type
      title
      enabled
      customLinkItems {
        items {
          id
          customLinkId
          customLink {
            linkType
          }
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      youtubeItems {
        items {
          id
          youtubeVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      facebookItems {
        items {
          id
          facebookVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      instagramItems {
        items {
          id
          instagramVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
    }
  }
`;

export const getMediaSubSection = /* GraphQL */ `
  query GetSubSection($id: ID!) {
    getSubSection(id: $id) {
      id
      position
      type
      title
      enabled
      sectionId
      mediaItems {
        items {
          id
          mediaId
          subSectionId
          createdAt
          updatedAt
          influencerId
        }
      }
    }
  }
`;
export const getPortfolioSubSection = /* GraphQL */ `
  query GetSubSection($id: ID!) {
    getSubSection(id: $id) {
      id
      position
      type
      title
      enabled
      sectionId
      customLinkItems {
        items {
          id
          customLinkId
          customLink {
            linkType
          }
          subSectionId
          createdAt
          updatedAt
          influencerId
        }
      }
    }
  }
`;

export const getYoutubeSubSection = /* GraphQL */ `
  query GetSubSection($id: ID!) {
    getSubSection(id: $id) {
      id
      position
      type
      title
      enabled
      sectionId
      youtubeItems {
        items {
          id
          youtubeVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
        }
      }
    }
  }
`;

export const getCustomLink = /* GraphQL */ `
  query GetCustomLink($id: ID!) {
    getCustomLink(id: $id) {
      id
      influencerId
      isArchived
      linkType
      image
      title
      ctaButton {
        text
        link
        isActive
        type
        __typename
      }
      description
      link
      position
      secondaryLink
      isAffiliate
      playStoreLink
      appStoreLink
      createdAt
      updatedAt
      subSections {
        items {
          id
          customLinkId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;

export const getLogoSubSection = /* GraphQL */ `
  query GetSubSection($id: ID!) {
    getSubSection(id: $id) {
      id
      position
      type
      title
      enabled
      sectionId
      logoItems {
        items {
          logoId
          subSectionId
          createdAt
          updatedAt
          influencerId
        }
      }
    }
  }
`;

export const getLogo = /* GraphQL */ `
  query GetLogo($id: ID!) {
    getLogo(id: $id) {
      id
      influencerId
      isArchived
      type
      mediaPath
      name
      size
      title
      position
      createdAt
      updatedAt
      subSections {
        items {
          id
          logoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      influencerId
      isArchived
      type
      mediaPath
      thumbnailUrl
      name
      size
      title
      position
      ctaButton {
        text
        link
        isActive
        type
        __typename
      }
      createdAt
      updatedAt
      subSections {
        items {
          id
          mediaId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const getYoutubeVideo = /* GraphQL */ `
  query GetYoutubeVideo($id: ID!) {
    getYoutubeVideo(id: $id) {
      id
      influencerId
      isArchived
      videoId
      title
      description
      type
      ctaButton {
        text
        link
        isActive
        type
        __typename
      }
      timestamp
      channelTitle
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
        items {
          id
          youtubeVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const getFacebookVideo = /* GraphQL */ `
  query GetFacebookVideo($id: ID!) {
    getFacebookVideo(id: $id) {
      id
      influencerId
      isArchived
      videoId
      title
      description
      type
      ctaButton {
        text
        link
        isActive
        type
        __typename
      }
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
        items {
          id
          facebookVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const getInstagramVideo = /* GraphQL */ `
  query GetInstagramVideo($id: ID!) {
    getInstagramVideo(id: $id) {
      id
      influencerId
      isArchived
      videoId
      title
      description
      type
      ctaButton {
        text
        link
        isActive
        type
        __typename
      }
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
        items {
          id
          instagramVideoId
          subSectionId
          createdAt
          updatedAt
          influencerId
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;

export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      isArchived
      title
      position
    }
  }
`;
export const listYoutubeVideos = /* GraphQL */ `
  query ListYoutubeVideos(
    $filter: ModelYoutubeVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listYoutubeVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        influencerId
        isArchived
        videoId
        title
        description
        type
        ctaButton {
          text
          link
          isActive
          type
          __typename
        }
        timestamp
        channelTitle
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
      nextToken
      __typename
    }
  }
`;
export const getSubSectionCustomLinks = /* GraphQL */ `
  query GetSubSectionCustomLinks($id: ID!) {
    getSubSectionCustomLinks(id: $id) {
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
        ctaButton {
          text
          link
          isActive
          type
          __typename
        }
        description
        link
        secondaryLink
        isAffiliate
        playStoreLink
        appStoreLink
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
        mediaItems {
          nextToken
          __typename
        }
        logoItems {
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

export const getCustomLinkData = /* GraphQL */ `
  query GetCustomLink($id: ID!) {
    getCustomLink(id: $id) {
      id
      title
      description
      position
      image
      link
      linkType
      ctaButton {
        text
        link
      }
    }
  }
`;
export const getMediaCTA = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      title
      ctaButton {
        text
        link
        isActive
      }
    }
  }
`;
export const getYoutubeVideoCTA = /* GraphQL */ `
  query GetYoutubeVideo($id: ID!) {
    getYoutubeVideo(id: $id) {
      id
      title
      ctaButton {
        text
        link
        isActive
      }
    }
  }
`;
export const getFacebookVideoCTA = /* GraphQL */ `
  query GetFacebookVideo($id: ID!) {
    getFacebookVideo(id: $id) {
      id
      title
      ctaButton {
        text
        link
        isActive
      }
    }
  }
`;
export const getInstagramVideoCTA = /* GraphQL */ `
  query GetInstagramVideo($id: ID!) {
    getInstagramVideo(id: $id) {
      id
      title
      ctaButton {
        text
        link
        isActive
      }
    }
  }
`;
export const byInfluencerIdInstagramVideosData = /* GraphQL */ `
  query ByInfluencerIdInstagramVideos(
    $influencerId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInstagramVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byInfluencerIdInstagramVideos(
      influencerId: $influencerId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        thumbnailUrl
        videoId
        isArchived
        permaLink
      }
      nextToken
      __typename
    }
  }
`;
export const getInstagramVideoData = /* GraphQL */ `
  query GetInstagramVideo($id: ID!) {
    getInstagramVideo(id: $id) {
      id
      thumbnailUrl
      isArchived
      permaLink
      videoId
      title
      position
    }
  }
`;
export const byInfluencerIdFacebookVideosData = /* GraphQL */ `
  query ByInfluencerIdFacebookVideos(
    $influencerId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFacebookVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byInfluencerIdFacebookVideos(
      influencerId: $influencerId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        thumbnailUrl
        isArchived
        permaLink
        videoId
      }
      nextToken
      __typename
    }
  }
`;
export const getFacebookVideoData = /* GraphQL */ `
  query GetFacebookVideo($id: ID!) {
    getFacebookVideo(id: $id) {
      id
      isArchived
      videoId
      permaLink
      thumbnailUrl
      position
      title
    }
  }
`;
export const byInfluencerIdYoutubeVideosData = /* GraphQL */ `
  query ByInfluencerIdYoutubeVideos(
    $influencerId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelYoutubeVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byInfluencerIdYoutubeVideos(
      influencerId: $influencerId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isArchived
        thumbnailUrl
        videoId
      }
      nextToken
      __typename
    }
  }
`;

export const getYoutubeVideoData = /* GraphQL */ `
  query GetYoutubeVideo($id: ID!) {
    getYoutubeVideo(id: $id) {
      id
      isArchived
      videoId
      thumbnailUrl
      title
      position
    }
  }
`;
export const getMediaData = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      mediaPath
      name
      size
      position
      isArchived
      title
      thumbnailUrl
      type
    }
  }
`;
export const getLogoData = /* GraphQL */ `
  query GetLogo($id: ID!) {
    getLogo(id: $id) {
      id
      mediaPath
      name
      size
      position
      isArchived
    }
  }
`;

export const sendContactFormEmail = /* GraphQL */ `
  mutation SendContactFormEmail($input: ContactFormInput) {
    sendContactFormEmail(input: $input) {
      code
      message
      __typename
    }
  }
`;
