"use client";
declare global {
  interface Window {
    totalYtMetricsChart: Chart | undefined;
    ytSexRatio: Chart | undefined | any;
    ytAgeRatio: Chart | undefined;
  }
}
import React, { useEffect, useState, useRef, useMemo, Suspense } from "react";
import styles from "./YtAnalytics.module.scss";
import { Influencer } from "@/models";
import { useSelector } from "react-redux";
import { getYoutubeAnalytics } from "@/store/sagas/handlers/configure.handle";
import Image from "next/image";
import { getUserDetail } from "@/store/sagas/requests/auth.request";
import { IResolveParams, LoginSocialGoogle } from "reactjs-social-login";
import { updateInfluencer } from "@/graphql/api";
import { API } from "aws-amplify";
import Loader from "@/components/Loader/Loader";
import { YOUTUBE_CLIENT_ID, YOUTUBE_ANALYTICS_SCOPES } from "@/config";
import Chart from "chart.js/auto";
import { Skeleton } from "antd";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";

interface ProfileProps {
  dateSelected: string;
}

const YtAnalytics = (props: ProfileProps): React.ReactElement => {
  const { onBoarding } = useSelector((state: any) => state.onboarding);
  const [onBoardingData, setOnBoardingData] = useState<Influencer | null>();
  const [isYTExpired, setIsYTExpired] = useState<boolean | null | undefined>(
    false
  );
  const [loader, setLoader] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const totalYtMetricsRef = useRef<HTMLCanvasElement | null>(null);
  const ytSexRatioRef = useRef<HTMLCanvasElement | null>(null);
  const ytAgeRatioRef = useRef<HTMLCanvasElement | null>(null);

  const { isYtMetricsVisible, isYtSexRatioVisible, isYtAgeGroupVisible } =
    useMemo(() => {
      return {
        isYtMetricsVisible:
          !!onBoardingData?.youtubeMetrics?.statistics?.length,
        isYtSexRatioVisible:
          !!onBoardingData?.youtubeMetrics?.sexRatio?.female &&
          !!onBoardingData?.youtubeMetrics?.sexRatio?.male,
        isYtAgeGroupVisible:
          !!onBoardingData?.youtubeMetrics?.ageGroupRatio?.length,
      };
    }, [onBoardingData]);

  useEffect(() => {
    setInitialDetails();
  }, []);

  useEffect(() => {
    updateMetrics(props?.dateSelected);
  }, [onBoardingData, props?.dateSelected]);

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };

  const updateMetrics = (dateLabel: string) => {
    const ytMetrics = onBoardingData as any[`youtubeMetrics`];

    const ytStatistics = ytMetrics?.youtubeMetrics?.statistics.find(
      (item: any) => item?.dateLabel === dateLabel
    );

    if (window.totalYtMetricsChart instanceof Chart) {
      window.totalYtMetricsChart.destroy();
    }
    if (window.ytSexRatio instanceof Chart) {
      window.ytSexRatio.destroy();
    }
    if (window.ytAgeRatio instanceof Chart) {
      window.ytAgeRatio.destroy();
    }
    const chartOptions = {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    //Preparing YT Metrics Chart
    if (ytMetrics?.youtubeMetrics?.statistics?.length) {
      window.totalYtMetricsChart = new Chart(totalYtMetricsRef.current as any, {
        type: "bar",
        data: {
          labels: ["Views", "Likes", "Comments"],
          datasets: [
            {
              label: "Count",
              data: [
                ytStatistics?.viewCount,
                ytStatistics?.likeCount,
                ytStatistics?.commentCount,
              ],
              backgroundColor: ["#0fa1de", "#0fa1de", "#0fa1de"],
              barThickness: 15,
              borderRadius: 5,
              minBarLength: 6,
            },
          ],
        },
        options: chartOptions,
      });
    }

    //Preparing YT Sex Ratio Chart
    if (ytMetrics?.youtubeMetrics?.sexRatio) {
      window.ytSexRatio = new Chart(ytSexRatioRef.current as any, {
        type: "doughnut",
        data: {
          labels: ["Male", "Female"],
          datasets: [
            {
              data: [
                ytMetrics?.youtubeMetrics?.sexRatio?.male,
                ytMetrics?.youtubeMetrics?.sexRatio?.female,
              ],
              backgroundColor: ["rgb(114 173 207)", "rgb(191 232 255)"],
            },
          ],
        },
      });
    }

    //Preparing YT Age Ratio Chart
    const ytAgeLabels = ytMetrics?.youtubeMetrics?.ageGroupRatio.map(
      (item: any) => item.ageGroup
    );
    const ytAgeData = ytMetrics?.youtubeMetrics?.ageGroupRatio.map(
      (item: any) => item.percentage
    );
    const ytAgeRatioData = {
      labels: ytAgeLabels,
      datasets: [
        {
          label: "Percentage",
          data: ytAgeData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          barThickness: 15,
          borderRadius: 5,
          minBarLength: 6,
        },
      ],
    };
    if (ytMetrics?.youtubeMetrics?.ageGroupRatio.length) {
      window.ytAgeRatio = new Chart(ytAgeRatioRef.current as any, {
        type: "bar",
        data: ytAgeRatioData,
        options: chartOptions,
      });
    }
  };

  const setInitialDetails = async () => {
    const onboardingData: Influencer | null = await getUserDetail(
      onBoarding.slug
    );
    const googleToken = onboardingData?.googleToken;

    setIsYTExpired(!googleToken || !!googleToken.isExpired);
    setOnBoardingData(onboardingData);
    setIsLoading(false);
  };
  const setUserYTData = async () => {
    const data: any = await getUserDetail(onBoardingData?.slug as string);
    (onBoardingData as any).youtubeMetrics = data?.youtubeMetrics;
    setIsLoading(false);
  };

  const handleYTLogin = async (data: any) => {
    const googlePayload = {
      id: onBoardingData?.id,
      googleToken: {
        accessToken: data.accessToken || data.access_token,
        createdAt: onBoardingData?.googleToken?.createdAt,
        updatedAt: new Date().toISOString(),
        isExpired: false,
      },
    };
    await updateinfluencer(googlePayload);

    const res = await getYoutubeAnalytics();

    if ((res as any)?.data?.syncYoutubeAnalytics?.code === "FAILED") {
      showToast("Failed To Fetch YouTube Insights", "error");
      const failedPayload = {
        id: onBoardingData?.id,
        googleToken: {
          accessToken: data.accessToken || data.access_token,
          createdAt: onBoardingData?.googleToken?.createdAt,
          updatedAt: new Date().toISOString(),
          isExpired: true,
        },
      };
      await updateinfluencer(failedPayload);
      setLoader(false);
    } else if ((res as any)?.data?.syncYoutubeAnalytics?.code === "SUCCESS") {
      setUserYTData();
      setIsYTExpired(false);
      setLoader(false);
    }
  };

  const updateinfluencer = async (data: Influencer) => {
    try {
      const res = await API.graphql({
        query: updateInfluencer,
        variables: {
          input: data,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      return res;
    } catch (error) {
      console.error("Error updating influencer:", error);
      throw error;
    }
  };

  return (
    <div
      className={
        (loader ? styles.fadeScreen : styles.resetScreen, styles.container)
      }
      style={{
        opacity: loader ? "0.4" : "1",
        pointerEvents: loader ? "none" : "auto",
      }}
    >
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 3 }} />
      ) : (
        <>
          {isYTExpired ? (
            <div className={styles.connectionWrapper}>
              <div className={styles.connectionSubContentWrapper}>
                <div>
                  <Image
                    src="/assets/svg/yt.svg"
                    width={38}
                    height={38}
                    alt="media"
                    className={styles.backButton}
                  />
                </div>
                <div className={styles.connectionMessageWrapper}>
                  <span className={styles.title}>Youtube Insights</span>
                  <span className={styles.message}>
                    Connect your Youtube and see the insights here directly.
                  </span>
                </div>
              </div>

              <div className={styles.submitWrapper}>
                <LoginSocialGoogle
                  client_id={YOUTUBE_CLIENT_ID as string}
                  scope={YOUTUBE_ANALYTICS_SCOPES}
                  onResolve={({ provider, data }: IResolveParams) => {
                    setLoader(true);
                    handleYTLogin(data);
                  }}
                  onLoginStart={() => {}}
                  onReject={(reject) => {
                    setLoader(false);
                  }}
                >
                  <button className={styles.submitButton}>
                    Connect Youtube
                  </button>
                </LoginSocialGoogle>
              </div>
            </div>
          ) : (
            <></>
          )}

          {onBoardingData?.youtubeMetrics && (
            <div>
              <div className={styles.insightsTitleWrapper}>
                <span className={styles.header}>Youtube Insights</span>
                {isYTExpired ? (
                  <span className={styles.expired}>Insights out of date</span>
                ) : (
                  <span className={styles.updated}>Updated</span>
                )}
              </div>
            </div>
          )}

          {isYtMetricsVisible && (
            <div>
              <div className={styles.subTitleWrapper}>
                <span>Metrics</span>
              </div>
              <canvas ref={totalYtMetricsRef} width="400" height="400"></canvas>
            </div>
          )}

          {isYtSexRatioVisible && (
            <div>
              <div className={styles.subTitleWrapper}>
                <span>Sex Ratio</span>
              </div>
              <canvas ref={ytSexRatioRef} width="400" height="400"></canvas>
            </div>
          )}

          {isYtAgeGroupVisible && (
            <div>
              <div className={styles.subTitleWrapper}>
                <span>Age Ratio</span>
              </div>
              <canvas ref={ytAgeRatioRef} width="400" height="400"></canvas>
            </div>
          )}
        </>
      )}
      {toast.toastDisplay && (
        <Toast
          toastDisplay={toast.toastDisplay}
          toastMessage={toast.toastMessage}
          toastType={toast.toastType}
        />
      )}
      {loader && <Loader text={``} />}
    </div>
  );
};
export default transition(YtAnalytics);
