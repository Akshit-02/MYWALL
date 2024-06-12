"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IResolveParams,
  LoginSocialFacebook,
  LoginSocialGoogle,
} from "reactjs-social-login";
import Image from "next/image";
import axios from "axios";
import styles from "./CollectionImport.module.scss";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import Loader from "@/components/Loader/Loader";
import SelectMedia from "@/container/Collection/SelectMedia/SelectMedia";
import { convertToTitleCase } from "@/utils/helperFunction";
import {
  YOUTUBE_CLIENT_ID,
  YOUTUBE_VIDEO_SCOPES,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SCOPES,
  INSTAGRAM_SCOPES,
} from "@/config";
import Header from "@/components/Header/Header";
import { Button } from "antd";
import transition from "@/components/Transition/Transition";

interface ImportProp {
  platform: string;
}

function CollectionImportPlatform({ platform }: ImportProp) {
  const dispatch = useDispatch();
  const configData = useSelector((state: any) => state.configure);
  const onboardData = useSelector((state: any) => state.onboarding);

  const [showAllVideo, setShowAllVideo] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [igError, setIGError] = useState<string>("");

  useEffect(() => {
    if (platform === "youtube" && !configData?.youTube?.token) {
      setShowAllVideo(false);
    } else if (platform === "facebook" && !configData?.faceBook?.token) {
      setShowAllVideo(false);
    } else if (platform === "instagram" && !configData?.instagram?.token) {
      setShowAllVideo(false);
    }
  }, [configData]);
  useMemo(async () => {
    if (platform === "youtube" && configData?.youTube?.token) {
      setShowAllVideo(true);
      dispatch({
        type: configureSagaActions.GET_USER_DATA_YOUTUBE,
        payload: {
          token: configData?.youTube?.token,
          userId: onboardData?.onBoarding.id,
        },
      });
    } else if (platform === "facebook" && configData?.faceBook?.token) {
      try {
        const firstUrl = `https://graph.facebook.com/debug_token?input_token=${configData?.faceBook?.token}&access_token=${configData?.faceBook?.token}`;
        await axios.get(firstUrl);

        setShowAllVideo(true);
        dispatch({
          type: configureSagaActions.GET_USER_DATA_FACEBOOK,
          payload: {
            token: configData?.faceBook?.token,
            userId: onboardData?.onBoarding.id,
          },
        });
      } catch (error) {}
    } else if (platform === "instagram" && configData?.instagram?.token) {
      if (configData?.instagram.error) {
        setIGError(configData?.instagram.error);
      } else {
        setShowAllVideo(true);
        dispatch({
          type: configureSagaActions.GET_USER_DATA_IG,
          payload: {
            token: configData?.instagram?.token,
            userId: onboardData?.onBoarding.id,
          },
        });
      }
    }
  }, [platform]);

  const handleLogin = async (data: any) => {
    try {
      setLoader(false);
      setShowAllVideo(true);

      let userDataActionType: string | null = null;
      let youtubeMediaActionType: string | null = null;

      switch (platform) {
        case "facebook":
          userDataActionType = configureSagaActions.GET_USER_DATA_FACEBOOK;
          break;
        case "youtube":
          userDataActionType = configureSagaActions.GET_USER_DATA_YOUTUBE;
          break;
        case "instagram":
          userDataActionType = configureSagaActions.GET_USER_DATA_IG;
          break;
        default:
          break;
      }

      if (userDataActionType) {
        dispatch({
          type: userDataActionType,
          payload: {
            token: data.accessToken || data.access_token,
          },
        });
      }

      if (youtubeMediaActionType) {
        dispatch({
          type: youtubeMediaActionType,
          payload: {
            token: data.access_token,
          },
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const closeLoder = () => {
    setTimeout(() => {
      setLoader(false);
    }, 10000);
  };

  return (
    <>
      {!loader && !showAllVideo && (
        <>
          <div className={`${styles.tellUsAbout} pageWidth`}>
            <Header
              title={`Import Media From ${convertToTitleCase(platform)}`}
            />
            <div className={styles.container}>
              <div className={styles.rectDiv}>
                <div className={styles.innerDiv}>
                  <Image
                    src="/assets/svg/mywallLogo.svg"
                    alt="Yt Icon"
                    height={68}
                    width={68}
                  />
                </div>
              </div>
              <Image
                src="/assets/svg/ArrowLeft.svg"
                alt="left arrow"
                height={18}
                width={18}
              />
              <div className={styles.circle}>
                <div className={styles.innerCircle}>
                  <Image
                    src={
                      platform === "youtube"
                        ? "/assets/svg/yt.svg"
                        : platform === "facebook"
                        ? "/assets/svg/fb.svg"
                        : "/assets/svg/ig.svg"
                    }
                    alt="Platform Icon"
                    width={53}
                    height={53}
                  />
                </div>
              </div>
            </div>
            {platform === "youtube" && (
              <LoginSocialGoogle
                client_id={YOUTUBE_CLIENT_ID as string}
                scope={YOUTUBE_VIDEO_SCOPES}
                onResolve={({ provider, data }: IResolveParams) => {
                  handleLogin(data);
                }}
                onLoginStart={() => {
                  closeLoder();
                }}
                onReject={(reject) => {
                  setLoader(false);
                  setError(
                    typeof reject === "string" ? reject : JSON.stringify(reject)
                  );
                }}
                className={styles.googleLogin}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setLoader(true);
                    setShowAllVideo(false);
                  }}
                >
                  Continue
                </Button>
              </LoginSocialGoogle>
            )}
            {platform === "instagram" && (
              <>
                <LoginSocialFacebook
                  appId={FACEBOOK_CLIENT_ID as string}
                  onResolve={({ provider, data }: IResolveParams) => {
                    handleLogin(data);
                  }}
                  scope={INSTAGRAM_SCOPES}
                  onReject={(reject) => {
                    setLoader(false);
                    setError(
                      typeof reject === "string"
                        ? reject
                        : JSON.stringify(reject)
                    );
                  }}
                  onLoginStart={() => {}}
                  className={styles.googleLogin}
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      setLoader(true);
                      setShowAllVideo(false);
                    }}
                  >
                    Continue
                  </Button>
                </LoginSocialFacebook>
              </>
            )}
            {platform === "facebook" && (
              <LoginSocialFacebook
                appId={FACEBOOK_CLIENT_ID as string}
                onResolve={({ provider, data }: IResolveParams) => {
                  handleLogin(data);
                }}
                scope={FACEBOOK_SCOPES}
                onReject={(reject) => {
                  setLoader(false);
                  setError(
                    typeof reject === "string" ? reject : JSON.stringify(reject)
                  );
                }}
                onLoginStart={() => {}}
                className={styles.googleLogin}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setLoader(true);
                    setShowAllVideo(false);
                  }}
                >
                  Continue
                </Button>
              </LoginSocialFacebook>
            )}

            {error && <span className={styles.error}>Failed</span>}
          </div>
        </>
      )}

      {showAllVideo && <SelectMedia platform={platform} />}
      {loader && (
        <Loader text={`Getting Media From ${convertToTitleCase(platform)}`} />
      )}
    </>
  );
}

export default transition(CollectionImportPlatform);
