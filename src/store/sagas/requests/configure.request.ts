import axios from "axios";
import { YoutubeResponse, YoutubeMediaResponse } from "@/models";
import { setFbData } from "@/store/slices/configure/configureSlice";
import { GraphQLResult } from "@aws-amplify/api/lib";
import { byInfluencerIdSections } from "@/graphql/api";
import { API } from "aws-amplify";
import { amplifyConfigure } from "@/config/amplify-configure";
import { YOUTUBE_APIKEY } from "@/config";

amplifyConfigure();

export const getUserYtData = async (token: string) => {
  let allData = [];
  try {
    const firstUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true&maxResults=50`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const firstResponse = await axios.get(firstUrl, {
      headers,
    });
    const firstData = firstResponse.data;
    const { items } = firstData;
    const userData = items[0];
    const res = await getYtMedia(token);
    const processedVideos = await Promise.all(
      (res as YoutubeMediaResponse[]).map((video) => {
        return {
          videoId: video.id.videoId,
          title: video.snippet.title,
          description: video.snippet.description,
          type: "SHORT",
          timestamp: video.snippet.publishedAt,
          channelTitle: video.snippet.channelTitle,
          thumbnailUrl: video.snippet.thumbnails.standard?.url,
          channelId: video.snippet.channelId,
        };
      })
    );
    allData.push({ mediaData: processedVideos, userData: items[0] });
    return allData;
  } catch (error) {
    return error;
  }
};
export const getYtMedia = async (token: string, nextPageToken?: string): Promise<YoutubeMediaResponse[]> => {
  let allData = [];
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const firstUrl = `https://youtube.googleapis.com/youtube/v3/search?maxResults=50&forMine=true&type=video&part=snippet&pageToken=${nextPageToken}`;
    const media: YoutubeResponse = await axios.get(firstUrl, { headers });
    const { items, nextPageToken: newNextPageToken } = media.data;
    allData.push(...items);
    if (newNextPageToken) {
      allData = allData.concat(await getYtMedia(token, newNextPageToken));
    }
    return allData;
  } catch (error) {
    throw error;
  }
};
export const getUserFbData = async (token: string) => {
  let allData = [];
  try {
    const firstUrl = `https://graph.facebook.com/v17.0/me?fields=first_name,last_name,short_name,picture,link,name,birthday,about,gender,location,email&access_token=${token}`;
    const firstResponse = await axios.get(firstUrl);

    const mediaData = await getFbMedia({
      access_token: token,
    });

    allData.push({ userData: firstResponse.data, mediaData: mediaData });
    return allData;
  } catch (error) {
    return error;
  }
};
export const getFbMedia = async ({ access_token }: any) => {
  let allData = [];
  try {
    const firstUrl = `https://graph.facebook.com/v17.0/me/videos?fields=id,source,description,title,permalink_url,likes,views,post_views,created_time,thumbnails&type=UPLOADED&access_token=${access_token}`;

    const mediaDataFromPage = await getFbPageMedia(access_token);

    const response = await axios.get(firstUrl);
    const mediaData = response.data.data;
    const filteredResponseData = await Promise.all(
      mediaData.filter((item: any) => item.permalink_url.includes("reel"))
    );
    setFbData(filteredResponseData);

    if (mediaDataFromPage.flat().length) {
      allData.push(...mediaDataFromPage.flat());
    }

    allData.push(...filteredResponseData);

    return allData;
  } catch (error) {
    return error;
  }
};

export const getFbPageMedia = async (access_token: string) => {
  try {
    const config = {
      method: "get",
      url: `https://graph.facebook.com/v17.0/me/accounts?access_token=${access_token}`,
      headers: {},
    };

    const pageResponse = await axios.request(config);

    const data = pageResponse.data.data;

    const mediaDataFromPage = await Promise.all(
      data.map(async (item: any) => {
        const config = {
          method: "get",
          url: `https://graph.facebook.com/v17.0/${item.id}/video_reels?fields=thumbnails,permalink_url,title,captions,description,created_time,source&access_token=${item.access_token}`,
          headers: {},
        };
        const pageMediaResponse = await axios.request(config);

        if (pageMediaResponse.data) {
          const media = pageMediaResponse?.data?.data;
          return media;
        } else {
          return [];
        }
      })
    );

    return mediaDataFromPage;
  } catch (error) {
    return [];
  }
};

export const fetchUserSections = async (userId: string) => {
  const sections: GraphQLResult<any> = await API.graphql({
    query: byInfluencerIdSections,
    variables: { influencerId: userId },
    authMode: "API_KEY",
  });
  return sections;
};

export const getUserIGData = async (token: string) => {
  try {
    const config = {
      method: "get",
      url: `https://graph.facebook.com/v17.0/me/accounts?fields=access_token,instagram_business_account&access_token=${token}`,
      headers: {},
    };

    const response = await axios.request(config);
    const data = response.data.data;

    const filteredData = data.filter(
      (item: any) => item.instagram_business_account
    );

    if (!filteredData.length) {
      const error = { message: "IG NOT CONNECTED" };
      return { error };
    }

    const [{ access_token, instagram_business_account }] = filteredData;

    const urlToGetIGData = `https://graph.facebook.com/v17.0/${instagram_business_account.id}?fields=profile_picture_url,username,followers_count,media{thumbnail_url,comments_count,timestamp,media_url,permalink,caption,title,media_product_type}&access_token=${access_token}`;

    const igMedia = await getUserIGMedia(urlToGetIGData, null);

    const userDetails = {
      mediaData: igMedia?.filter(
        (item: any) => item.media_product_type === "REELS"
      ),
    };

    return { userDetails };
  } catch (error: any) {
    return { error };
  }
};

const getUserIGMedia = async (
  urlToHit: string,
  initialIgData: any,
  next = false
): Promise<any> => {
  const igMediaResponse = await axios.get(urlToHit);

  let igMedia = next
    ? igMediaResponse?.data?.data
    : igMediaResponse?.data?.media?.data;

  if (initialIgData) {
    igMedia = [...initialIgData, ...igMedia];
  }

  if (
    next
      ? !igMediaResponse?.data?.paging?.next
      : !igMediaResponse.data?.media?.paging?.next
  ) {
    return Promise.resolve(igMedia);
  }

  return await getUserIGMedia(
    next
      ? igMediaResponse?.data?.paging?.next
      : igMediaResponse.data?.media?.paging?.next,
    igMedia,
    true
  );
};
