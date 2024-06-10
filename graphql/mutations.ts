/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncYoutubeRepository = /* GraphQL */ `
  mutation SyncYoutubeRepository($input: SyncYoutubeRepositoryInput!) {
    syncYoutubeRepository(input: $input) {
      code
      message
      __typename
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
export const syncFacebookRepository = /* GraphQL */ `
  mutation SyncFacebookRepository($input: SyncFacebookRepositoryInput!) {
    syncFacebookRepository(input: $input) {
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
export const syncInstagramRepository = /* GraphQL */ `
  mutation SyncInstagramRepository($input: SyncInstagramRepositoryInput!) {
    syncInstagramRepository(input: $input) {
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
export const syncMediaRepository = /* GraphQL */ `
  mutation SyncMediaRepository($input: SyncMediaRepositoryInput!) {
    syncMediaRepository(input: $input) {
      code
      message
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
export const sortSubSectionByPosition = /* GraphQL */ `
  mutation SortSubSectionByPosition($input: SortSubSectionsByPosition) {
    sortSubSectionByPosition(input: $input) {
      code
      message
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
export const createInfluencer = /* GraphQL */ `
  mutation CreateInfluencer(
    $input: CreateInfluencerInput!
    $condition: ModelInfluencerConditionInput
  ) {
    createInfluencer(input: $input, condition: $condition) {
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
        __typename
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
        __typename
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
export const deleteInfluencer = /* GraphQL */ `
  mutation DeleteInfluencer(
    $input: DeleteInfluencerInput!
    $condition: ModelInfluencerConditionInput
  ) {
    deleteInfluencer(input: $input, condition: $condition) {
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
        __typename
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
export const createYoutubeVideo = /* GraphQL */ `
  mutation CreateYoutubeVideo(
    $input: CreateYoutubeVideoInput!
    $condition: ModelYoutubeVideoConditionInput
  ) {
    createYoutubeVideo(input: $input, condition: $condition) {
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
export const deleteYoutubeVideo = /* GraphQL */ `
  mutation DeleteYoutubeVideo(
    $input: DeleteYoutubeVideoInput!
    $condition: ModelYoutubeVideoConditionInput
  ) {
    deleteYoutubeVideo(input: $input, condition: $condition) {
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
export const createFacebookVideo = /* GraphQL */ `
  mutation CreateFacebookVideo(
    $input: CreateFacebookVideoInput!
    $condition: ModelFacebookVideoConditionInput
  ) {
    createFacebookVideo(input: $input, condition: $condition) {
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
      ctaButton {
        text
        link
        isActive
        type
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
        }
        nextToken
      }
    }
  }
`;
export const deleteFacebookVideo = /* GraphQL */ `
  mutation DeleteFacebookVideo(
    $input: DeleteFacebookVideoInput!
    $condition: ModelFacebookVideoConditionInput
  ) {
    deleteFacebookVideo(input: $input, condition: $condition) {
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
export const createInstagramVideo = /* GraphQL */ `
  mutation CreateInstagramVideo(
    $input: CreateInstagramVideoInput!
    $condition: ModelInstagramVideoConditionInput
  ) {
    createInstagramVideo(input: $input, condition: $condition) {
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
export const deleteInstagramVideo = /* GraphQL */ `
  mutation DeleteInstagramVideo(
    $input: DeleteInstagramVideoInput!
    $condition: ModelInstagramVideoConditionInput
  ) {
    deleteInstagramVideo(input: $input, condition: $condition) {
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
export const deleteCustomLink = /* GraphQL */ `
  mutation DeleteCustomLink(
    $input: DeleteCustomLinkInput!
    $condition: ModelCustomLinkConditionInput
  ) {
    deleteCustomLink(input: $input, condition: $condition) {
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
export const createMedia = /* GraphQL */ `
  mutation CreateMedia(
    $input: CreateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    createMedia(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      type
      mediaPath
      name
      size
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
      name
      size
      title
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
export const deleteMedia = /* GraphQL */ `
  mutation DeleteMedia(
    $input: DeleteMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    deleteMedia(input: $input, condition: $condition) {
      id
      influencerId
      isArchived
      type
      mediaPath
      name
      size
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
      createdAt
      updatedAt
      __typename
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
      createdAt
      updatedAt
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
export const createSubSectionYTItems = /* GraphQL */ `
  mutation CreateSubSectionYTItems(
    $input: CreateSubSectionYTItemsInput!
    $condition: ModelSubSectionYTItemsConditionInput
  ) {
    createSubSectionYTItems(input: $input, condition: $condition) {
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
        mediaItems {
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
export const updateSubSectionYTItems = /* GraphQL */ `
  mutation UpdateSubSectionYTItems(
    $input: UpdateSubSectionYTItemsInput!
    $condition: ModelSubSectionYTItemsConditionInput
  ) {
    updateSubSectionYTItems(input: $input, condition: $condition) {
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
        mediaItems {
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
export const deleteSubSectionYTItems = /* GraphQL */ `
  mutation DeleteSubSectionYTItems(
    $input: DeleteSubSectionYTItemsInput!
    $condition: ModelSubSectionYTItemsConditionInput
  ) {
    deleteSubSectionYTItems(input: $input, condition: $condition) {
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
        mediaItems {
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
export const createSubSectionFBItems = /* GraphQL */ `
  mutation CreateSubSectionFBItems(
    $input: CreateSubSectionFBItemsInput!
    $condition: ModelSubSectionFBItemsConditionInput
  ) {
    createSubSectionFBItems(input: $input, condition: $condition) {
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
        mediaItems {
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
export const updateSubSectionFBItems = /* GraphQL */ `
  mutation UpdateSubSectionFBItems(
    $input: UpdateSubSectionFBItemsInput!
    $condition: ModelSubSectionFBItemsConditionInput
  ) {
    updateSubSectionFBItems(input: $input, condition: $condition) {
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
        mediaItems {
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
export const deleteSubSectionFBItems = /* GraphQL */ `
  mutation DeleteSubSectionFBItems(
    $input: DeleteSubSectionFBItemsInput!
    $condition: ModelSubSectionFBItemsConditionInput
  ) {
    deleteSubSectionFBItems(input: $input, condition: $condition) {
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
        mediaItems {
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
export const createSubSectionIGItems = /* GraphQL */ `
  mutation CreateSubSectionIGItems(
    $input: CreateSubSectionIGItemsInput!
    $condition: ModelSubSectionIGItemsConditionInput
  ) {
    createSubSectionIGItems(input: $input, condition: $condition) {
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
        mediaItems {
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
export const updateSubSectionIGItems = /* GraphQL */ `
  mutation UpdateSubSectionIGItems(
    $input: UpdateSubSectionIGItemsInput!
    $condition: ModelSubSectionIGItemsConditionInput
  ) {
    updateSubSectionIGItems(input: $input, condition: $condition) {
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
        mediaItems {
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
export const deleteSubSectionIGItems = /* GraphQL */ `
  mutation DeleteSubSectionIGItems(
    $input: DeleteSubSectionIGItemsInput!
    $condition: ModelSubSectionIGItemsConditionInput
  ) {
    deleteSubSectionIGItems(input: $input, condition: $condition) {
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
        mediaItems {
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
export const updateSubSectionCustomLinks = /* GraphQL */ `
  mutation UpdateSubSectionCustomLinks(
    $input: UpdateSubSectionCustomLinksInput!
    $condition: ModelSubSectionCustomLinksConditionInput
  ) {
    updateSubSectionCustomLinks(input: $input, condition: $condition) {
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
export const deleteSubSectionCustomLinks = /* GraphQL */ `
  mutation DeleteSubSectionCustomLinks(
    $input: DeleteSubSectionCustomLinksInput!
    $condition: ModelSubSectionCustomLinksConditionInput
  ) {
    deleteSubSectionCustomLinks(input: $input, condition: $condition) {
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
export const createSubSectionMediaItems = /* GraphQL */ `
  mutation CreateSubSectionMediaItems(
    $input: CreateSubSectionMediaItemsInput!
    $condition: ModelSubSectionMediaItemsConditionInput
  ) {
    createSubSectionMediaItems(input: $input, condition: $condition) {
      id
      mediaId
      subSectionId
      media {
        id
        influencerId
        isArchived
        type
        mediaPath
        name
        size
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
export const updateSubSectionMediaItems = /* GraphQL */ `
  mutation UpdateSubSectionMediaItems(
    $input: UpdateSubSectionMediaItemsInput!
    $condition: ModelSubSectionMediaItemsConditionInput
  ) {
    updateSubSectionMediaItems(input: $input, condition: $condition) {
      id
      mediaId
      subSectionId
      media {
        id
        influencerId
        isArchived
        type
        mediaPath
        name
        size
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
export const deleteSubSectionMediaItems = /* GraphQL */ `
  mutation DeleteSubSectionMediaItems(
    $input: DeleteSubSectionMediaItemsInput!
    $condition: ModelSubSectionMediaItemsConditionInput
  ) {
    deleteSubSectionMediaItems(input: $input, condition: $condition) {
      id
      mediaId
      subSectionId
      media {
        id
        influencerId
        isArchived
        type
        mediaPath
        name
        size
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
