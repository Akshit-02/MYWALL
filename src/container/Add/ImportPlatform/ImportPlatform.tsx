"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { IResolveParams } from "reactjs-social-login";
import Image from "next/image";
import transition from "@/components/Transition/Transition";
import styles from "./ImportPlatform.module.scss";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import Loader from "@/components/Loader/Loader";
import FetchedMedia from "../FetchedMedia/FetchedMedia";
import {
  YOUTUBE_CLIENT_ID,
  YOUTUBE_VIDEO_SCOPES,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SCOPES,
} from "@/config";
import Header from "@/components/Header/Header";
import { convertToTitleCase } from "@/utils/helperFunction";
import { Button } from "antd";

const LoginSocialGoogle = dynamic(() =>
  import("reactjs-social-login").then((mod) => mod.LoginSocialGoogle)
);

const LoginSocialFacebook = dynamic(() =>
  import("reactjs-social-login").then((mod) => mod.LoginSocialFacebook)
);

type ProgressProp = {
  platformType: string;
  sectionId: string;
};

function ImportPlatform({ platformType, sectionId }: ProgressProp) {
  const dispatch = useDispatch();
  const configData = useSelector((state: any) => state.configure);
  const [showAllVideo, setShowAllVideo] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [igError, setIGError] = useState<string>("");
  const [platform, setPlatform] = useState<string>(platformType);

  useEffect(() => {
    setPlatform(platformType);
  }, [platformType]);

  useEffect(() => {
    if (
      platform === "YOUTUBE" &&
      configData?.youTube?.token &&
      !configData?.importedYt?.data?.length
    ) {
      setShowAllVideo(true);
      dispatch({
        type: configureSagaActions.GET_USER_DATA_YOUTUBE,
        payload: {
          token: configData?.youTube?.token,
        },
      });
    } else if (
      platform === "FACEBOOK" &&
      configData?.faceBook?.token &&
      !configData?.importedFb?.data?.length
    ) {
      setShowAllVideo(true);
      dispatch({
        type: configureSagaActions.GET_USER_DATA_FACEBOOK,
        payload: {
          token: configData?.faceBook?.token,
        },
      });
    } else if (
      platform === "INSTAGRAM" &&
      configData?.instagram?.token &&
      !configData?.importedIg?.data?.length
    ) {
      setShowAllVideo(true);
      dispatch({
        type: configureSagaActions.GET_USER_DATA_IG,
        payload: {
          token: configData?.instagram?.token,
        },
      });
    }
  }, [platform]);

  const handleLogin = async (data: any) => {
    try {
      setLoader(false);
      setShowAllVideo(true);

      let userDataActionType: string | null = null;
      let youtubeMediaActionType: string | null = null;

      switch (platform) {
        case "FACEBOOK":
          userDataActionType = configureSagaActions.GET_USER_DATA_FACEBOOK;
          break;
        case "YOUTUBE":
          userDataActionType = configureSagaActions.GET_USER_DATA_YOUTUBE;
          break;
        case "INSTAGRAM":
          userDataActionType = configureSagaActions.GET_USER_DATA_IG;
          break;
        default:
          break;
      }

      if (userDataActionType) {
        if (configData?.instagram.error) {
          setIGError(configData?.instagram.error);
        } else {
          dispatch({
            type: userDataActionType,
            payload: {
              token: data.accessToken || data.access_token,
            },
          });
        }
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
    <div>
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
                      platform === "YOUTUBE"
                        ? "/assets/svg/yt.svg"
                        : platform === "FACEBOOK"
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
            {platform === "YOUTUBE" && (
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
                  size="large"
                  type="primary"
                  onClick={() => {
                    setLoader(true);
                    setShowAllVideo(false);
                  }}
                >
                  Continue
                </Button>
              </LoginSocialGoogle>
            )}
            {platform === "INSTAGRAM" && (
              <>
                <LoginSocialFacebook
                  appId={FACEBOOK_CLIENT_ID as string}
                  onResolve={({ provider, data }: IResolveParams) => {
                    handleLogin(data);
                  }}
                  scope={FACEBOOK_SCOPES}
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
                    size="large"
                    type="primary"
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
            {platform === "FACEBOOK" && (
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
                  size="large"
                  type="primary"
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

      {showAllVideo && (
        <FetchedMedia platform={platform} sectionId={sectionId} />
      )}
      {loader && <Loader text={`Getting Media From ${platform}`} />}

      {igError && (
        <>
          <Header title={`Import Media From ${convertToTitleCase(platform)}`} />
          <div className={styles.failedMessage}>
            <span>
              Your Instagram Account Is Not Connected To a Facebook Page
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default transition(ImportPlatform);
