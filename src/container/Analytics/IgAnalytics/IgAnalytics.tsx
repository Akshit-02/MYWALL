"use client";
declare global {
  interface Window {
    totalIgMetricsChart: Chart | undefined;
    igSexRatio: Chart | undefined | any;
    igAgeRatio: Chart | undefined;
  }
}
import React, { useEffect, useState, useRef, useMemo, Suspense } from "react";
import styles from "./IgAnalytics.module.scss";
import { Influencer } from "@/models";
import { useSelector } from "react-redux";
import { getInstagramAnalytics } from "@/store/sagas/handlers/configure.handle";
import Image from "next/image";
import { getUserDetail } from "@/store/sagas/requests/auth.request";
import { IResolveParams, LoginSocialFacebook } from "reactjs-social-login";
import { updateInfluencer } from "@/graphql/api";
import { API } from "aws-amplify";
import Loader from "@/components/Loader/Loader";
import { FACEBOOK_CLIENT_ID, INSTAGRAM_ANALYTICS_SCOPES } from "@/config";
import Chart from "chart.js/auto";
import { Skeleton } from "antd";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";

interface ProfileProps {
  dateSelected: string;
}

const IgAnalytics = (props: ProfileProps): React.ReactElement => {
  const { onBoarding } = useSelector((state: any) => state.onboarding);
  const [onBoardingData, setOnBoardingData] = useState<Influencer | null>();
  const [isIGExpired, setIsIGExpired] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const totalIgMetricsRef = useRef<HTMLCanvasElement | null>(null);
  const igSexRatioRef = useRef<HTMLCanvasElement | null>(null);
  const igAgeRatioRef = useRef<HTMLCanvasElement | null>(null);

  const { isIgMetricsVisible, isIgSexRatioVisible, isIgAgeGroupVisible } =
    useMemo(() => {
      return {
        isIgMetricsVisible:
          !!onBoardingData?.instagramMetrics?.statistics?.length,
        isIgSexRatioVisible:
          !!onBoardingData?.instagramMetrics?.sexRatio?.female &&
          !!onBoardingData?.instagramMetrics?.sexRatio?.male,
        isIgAgeGroupVisible:
          !!onBoardingData?.instagramMetrics?.ageGroupRatio?.length,
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
    const igMetrics = onBoardingData as any[`instagramMetrics`];

    const igStatistics = igMetrics?.instagramMetrics?.statistics.find(
      (item: any) => item?.dateLabel === dateLabel
    );

    if (window.totalIgMetricsChart instanceof Chart) {
      window.totalIgMetricsChart.destroy();
    }
    if (window.igSexRatio instanceof Chart) {
      window.igSexRatio.destroy();
    }
    if (window.igAgeRatio instanceof Chart) {
      window.igAgeRatio.destroy();
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
    //Preparing IG Metrics Chart
    if (igMetrics?.instagramMetrics?.statistics?.length) {
      window.totalIgMetricsChart = new Chart(totalIgMetricsRef.current as any, {
        type: "bar",
        data: {
          labels: ["Views", "Likes", "Comments"],
          datasets: [
            {
              label: "Count",
              data: [
                igStatistics?.viewCount,
                igStatistics?.likeCount,
                igStatistics?.commentCount,
              ],
              backgroundColor: ["#0fa1de", "#0fa1de", "#0fa1de"],
              barThickness: 15,
              borderRadius: 5,
              minBarLength: 10,
            },
          ],
        },
        options: chartOptions,
      });
    }

    //Preparing IG Sex Ratio Chart
    if (igMetrics?.instagramMetrics?.sexRatio) {
      window.igSexRatio = new Chart(igSexRatioRef.current as any, {
        type: "doughnut",
        data: {
          labels: ["Male", "Female"],
          datasets: [
            {
              data: [
                igMetrics?.instagramMetrics?.sexRatio?.male,
                igMetrics?.instagramMetrics?.sexRatio?.female,
              ],
              backgroundColor: ["rgb(114 173 207)", "rgb(191 232 255)"],
            },
          ],
        },
      });
    }

    //Preparing IG Age Ratio Chart
    const igAgeLabels = igMetrics?.instagramMetrics?.ageGroupRatio.map(
      (item: any) => item.ageGroup
    );
    const igAgeData = igMetrics?.instagramMetrics?.ageGroupRatio.map(
      (item: any) => item.percentage
    );
    const igAgeRatioData = {
      labels: igAgeLabels,
      datasets: [
        {
          label: "Percentage",
          data: igAgeData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          barThickness: 15,
          borderRadius: 5,
          minBarLength: 6,
        },
      ],
    };
    if (igMetrics?.instagramMetrics?.ageGroupRatio?.length) {
      window.igAgeRatio = new Chart(igAgeRatioRef.current as any, {
        type: "bar",
        data: igAgeRatioData,
        options: chartOptions,
      });
    }
  };

  const setInitialDetails = async () => {
    const onboardingData: Influencer | null = await getUserDetail(
      onBoarding.slug
    );

    const facebookToken = onboardingData?.facebookToken;

    setIsIGExpired(!facebookToken || !!facebookToken.isExpired);
    setOnBoardingData(onboardingData);
    setIsLoading(false);
  };

  const setUserIGData = async () => {
    const data: any = await getUserDetail(onBoardingData?.slug as string);
    (onBoardingData as any).instagramMetrics = data?.instagramMetrics;
    setIsLoading(false);
  };

  const handleIGLogin = async (data: any) => {
    const facebookPayload = {
      id: onBoardingData?.id,
      facebookToken: {
        accessToken: data.accessToken || data.access_token,
        createdAt: onBoardingData?.facebookToken?.createdAt,
        updatedAt: new Date().toISOString(),
        isExpired: false,
      },
    };
    await updateinfluencer(facebookPayload);

    const res = await getInstagramAnalytics();

    if ((res as any)?.data?.syncInstagramAnalytics?.code === "FAILED") {
      showToast("Failed To Fetch Instagram Insights", "error");
      const failedPayload = {
        id: onBoardingData?.id,
        facebookToken: {
          accessToken: data.accessToken || data.access_token,
          createdAt: onBoardingData?.facebookToken?.createdAt,
          updatedAt: new Date().toISOString(),
          isExpired: true,
        },
      };
      await updateinfluencer(failedPayload);
      setLoader(false);
    } else if ((res as any)?.data?.syncInstagramAnalytics?.code === "SUCCESS") {
      setUserIGData();
      setIsIGExpired(false);
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
          {isIGExpired ? (
            <div className={styles.connectionWrapper}>
              <div className={styles.connectionSubContentWrapper}>
                <div>
                  <Image
                    src="/assets/svg/igAnalytics.svg"
                    width={38}
                    height={38}
                    alt="media"
                    className={styles.backButton}
                  />
                </div>
                <div className={styles.connectionMessageWrapper}>
                  <span className={styles.title}>Instagram Insights</span>
                  <span className={styles.message}>
                    Connect your Instagram and see the insights here directly.
                  </span>
                </div>
              </div>
              <div className={styles.submitWrapper}>
                <LoginSocialFacebook
                  appId={FACEBOOK_CLIENT_ID as string}
                  onResolve={({ provider, data }: IResolveParams) => {
                    setLoader(true);
                    handleIGLogin(data);
                  }}
                  scope={INSTAGRAM_ANALYTICS_SCOPES}
                  onReject={(reject) => {
                    setLoader(false);
                  }}
                  onLoginStart={() => {}}
                >
                  <button className={styles.submitButton}>
                    Connect Instagram
                  </button>
                </LoginSocialFacebook>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
      {onBoardingData?.instagramMetrics && (
        <div>
          <div className={styles.insightsTitleWrapper}>
            <span className={styles.header}>Instagram Insights</span>
            {isIGExpired ? (
              <span className={styles.expired}>Insights out of date</span>
            ) : (
              <span className={styles.updated}>Updated</span>
            )}
          </div>
        </div>
      )}

      {isIgMetricsVisible && (
        <div>
          <div className={styles.subTitleWrapper}>
            <span>Metrics</span>
          </div>
          <canvas ref={totalIgMetricsRef} width="400" height="400"></canvas>
        </div>
      )}
      {isIgSexRatioVisible && (
        <div>
          <div className={styles.subTitleWrapper}>
            <span>Sex Ratio</span>
          </div>
          <canvas ref={igSexRatioRef} width="400" height="400"></canvas>
        </div>
      )}
      {isIgAgeGroupVisible && (
        <div>
          <div className={styles.subTitleWrapper}>
            <span>Age Ratio</span>
          </div>
          <canvas ref={igAgeRatioRef} width="400" height="400"></canvas>
        </div>
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

export default transition(IgAnalytics);
