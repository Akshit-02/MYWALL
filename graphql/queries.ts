/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncInstagramAnalytics = /* GraphQL */ `
  query SyncInstagramAnalytics {
    syncInstagramAnalytics {
      code
      message
      payload {
        statistics {
          viewCount
          likeCount
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
      __typename
    }
  }
`;
export const syncYoutubeAnalytics = /* GraphQL */ `
  query SyncYoutubeAnalytics {
    syncYoutubeAnalytics {
      code
      message
      payload {
        statistics {
          viewCount
          likeCount
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
export const listInfluencers = /* GraphQL */ `
  query ListInfluencers(
    $filter: ModelInfluencerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInfluencers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          topAudienceCities
          __typename
        }
        youtubeMetrics {
          topAudienceCities
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
      nextToken
      __typename
    }
  }
`;
export const bySlugInfluencer = /* GraphQL */ `
  query BySlugInfluencer(
    $slug: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInfluencerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bySlugInfluencer(
      slug: $slug
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          topAudienceCities
          __typename
        }
        youtubeMetrics {
          topAudienceCities
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
      nextToken
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
export const listFacebookVideos = /* GraphQL */ `
  query ListFacebookVideos(
    $filter: ModelFacebookVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFacebookVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const listInstagramVideos = /* GraphQL */ `
  query ListInstagramVideos(
    $filter: ModelInstagramVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInstagramVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getCustomLink = /* GraphQL */ `
  query GetCustomLink($id: ID!) {
    getCustomLink(id: $id) {
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
export const listCustomLinks = /* GraphQL */ `
  query ListCustomLinks(
    $filter: ModelCustomLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const byInfluencerIdCustomLinks = /* GraphQL */ `
  query ByInfluencerIdCustomLinks(
    $influencerId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byInfluencerIdCustomLinks(
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
      nextToken
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
export const listMedia = /* GraphQL */ `
  query ListMedia(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedia(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        influencerId
        isArchived
        type
        mediaPath
        title
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
export const byInfluencerIdMedias = /* GraphQL */ `
  query ByInfluencerIdMedias(
    $influencerId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byInfluencerIdMedias(
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
        type
        mediaPath
        title
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
export const getSubSection = /* GraphQL */ `
  query GetSubSection($id: ID!) {
    getSubSection(id: $id) {
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
export const listSubSections = /* GraphQL */ `
  query ListSubSections(
    $filter: ModelSubSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const bySectionIdSubSections = /* GraphQL */ `
  query BySectionIdSubSections(
    $sectionId: ID!
    $position: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bySectionIdSubSections(
      sectionId: $sectionId
      position: $position
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
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
export const listSections = /* GraphQL */ `
  query ListSections(
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        influencerId
        isArchived
        title
        position
        subSections {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        influencerId
        isArchived
        title
        position
        subSections {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSubSectionYTItems = /* GraphQL */ `
  query GetSubSectionYTItems($id: ID!) {
    getSubSectionYTItems(id: $id) {
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
export const listSubSectionYTItems = /* GraphQL */ `
  query ListSubSectionYTItems(
    $filter: ModelSubSectionYTItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubSectionYTItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionYTItemsByYoutubeVideoId = /* GraphQL */ `
  query SubSectionYTItemsByYoutubeVideoId(
    $youtubeVideoId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionYTItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionYTItemsByYoutubeVideoId(
      youtubeVideoId: $youtubeVideoId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionYTItemsBySubSectionId = /* GraphQL */ `
  query SubSectionYTItemsBySubSectionId(
    $subSectionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionYTItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionYTItemsBySubSectionId(
      subSectionId: $subSectionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSubSectionFBItems = /* GraphQL */ `
  query GetSubSectionFBItems($id: ID!) {
    getSubSectionFBItems(id: $id) {
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
export const listSubSectionFBItems = /* GraphQL */ `
  query ListSubSectionFBItems(
    $filter: ModelSubSectionFBItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubSectionFBItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionFBItemsByFacebookVideoId = /* GraphQL */ `
  query SubSectionFBItemsByFacebookVideoId(
    $facebookVideoId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionFBItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionFBItemsByFacebookVideoId(
      facebookVideoId: $facebookVideoId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionFBItemsBySubSectionId = /* GraphQL */ `
  query SubSectionFBItemsBySubSectionId(
    $subSectionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionFBItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionFBItemsBySubSectionId(
      subSectionId: $subSectionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSubSectionIGItems = /* GraphQL */ `
  query GetSubSectionIGItems($id: ID!) {
    getSubSectionIGItems(id: $id) {
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
export const listSubSectionIGItems = /* GraphQL */ `
  query ListSubSectionIGItems(
    $filter: ModelSubSectionIGItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubSectionIGItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionIGItemsByInstagramVideoId = /* GraphQL */ `
  query SubSectionIGItemsByInstagramVideoId(
    $instagramVideoId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionIGItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionIGItemsByInstagramVideoId(
      instagramVideoId: $instagramVideoId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionIGItemsBySubSectionId = /* GraphQL */ `
  query SubSectionIGItemsBySubSectionId(
    $subSectionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionIGItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionIGItemsBySubSectionId(
      subSectionId: $subSectionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
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
export const listSubSectionCustomLinks = /* GraphQL */ `
  query ListSubSectionCustomLinks(
    $filter: ModelSubSectionCustomLinksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubSectionCustomLinks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionCustomLinksByCustomLinkId = /* GraphQL */ `
  query SubSectionCustomLinksByCustomLinkId(
    $customLinkId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionCustomLinksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionCustomLinksByCustomLinkId(
      customLinkId: $customLinkId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionCustomLinksBySubSectionId = /* GraphQL */ `
  query SubSectionCustomLinksBySubSectionId(
    $subSectionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionCustomLinksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionCustomLinksBySubSectionId(
      subSectionId: $subSectionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSubSectionMediaItems = /* GraphQL */ `
  query GetSubSectionMediaItems($id: ID!) {
    getSubSectionMediaItems(id: $id) {
      id
      mediaId
      subSectionId
      media {
        id
        influencerId
        isArchived
        type
        mediaPath
        title
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
export const listSubSectionMediaItems = /* GraphQL */ `
  query ListSubSectionMediaItems(
    $filter: ModelSubSectionMediaItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubSectionMediaItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mediaId
        subSectionId
        media {
          id
          influencerId
          isArchived
          type
          mediaPath
          title
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionMediaItemsByMediaId = /* GraphQL */ `
  query SubSectionMediaItemsByMediaId(
    $mediaId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionMediaItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionMediaItemsByMediaId(
      mediaId: $mediaId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mediaId
        subSectionId
        media {
          id
          influencerId
          isArchived
          type
          mediaPath
          title
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subSectionMediaItemsBySubSectionId = /* GraphQL */ `
  query SubSectionMediaItemsBySubSectionId(
    $subSectionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubSectionMediaItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subSectionMediaItemsBySubSectionId(
      subSectionId: $subSectionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mediaId
        subSectionId
        media {
          id
          influencerId
          isArchived
          type
          mediaPath
          title
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        influencerId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getInfluencerBySlug = /* GraphQL */ `
  query GetInfluencerBySlug($slug: ID!) {
    getInfluencerBySlug(slug: $slug) {
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
