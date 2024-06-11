"use client";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";
import styles from "./Step2.module.scss";
import transition from "@/components/Transition/Transition";
import { Button, Flex, Input } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { Auth } from "aws-amplify";

type ProgressProp = {
  setDisplayStep: React.Dispatch<React.SetStateAction<boolean>>;
};
type Links = {
  youtube: string;
  instagram: string;
  facebook: string;
  linkedIn: string;
  snapchat: string;
  tiktok: string;
  twitter: string;
  other: string;
};

function Step2({ setDisplayStep }: ProgressProp) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { onBoarding } = useSelector((state: any) => state.onboarding);
  const [links, setLinks] = useState<Links>({
    youtube: onBoarding.socialLinks?.youtube || "",
    instagram: onBoarding.socialLinks?.instagram || "",
    facebook: onBoarding.socialLinks?.facebook || "",
    linkedIn: onBoarding.socialLinks?.linkedIn || "",
    other: onBoarding.socialLinks?.other || "",
    twitter: onBoarding.socialLinks?.twitter || "",
    snapchat: onBoarding.socialLinks?.snapchat || "",
    tiktok: onBoarding.socialLinks?.tiktok || "",
  });

  const [isYoutubeValid, setYoutubeValid] = useState<boolean>(true);
  const [isInstagramValid, setInstagramValid] = useState<boolean>(true);
  const [isFacebookValid, setFacebookValid] = useState<boolean>(true);
  const [isLinkedInValid, setLinkedInValid] = useState<boolean>(true);
  const [isSnapchatValid, setSnapchatValid] = useState<boolean>(true);
  const [isTiktokValid, setTiktokValid] = useState<boolean>(true);
  const [isTwitterValid, setTwitterValid] = useState<boolean>(true);
  const [isOtherValid, setOtherValid] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const filterEmptyLinks = (links: Links): Links => {
    const nonEmptyLinks: Links = {} as Links;

    for (const key in links) {
      if (links.hasOwnProperty(key)) {
        if (links[key as keyof Links].trim() !== "") {
          nonEmptyLinks[key as keyof Links] = links[key as keyof Links];
        }
      }
    }
    return nonEmptyLinks;
  };

  const handlePaste = async (platform: string) => {
    const inputElement = document.getElementById(platform) as HTMLInputElement;

    if (inputElement && navigator.clipboard) {
      const clipboardData = await navigator.clipboard.readText();
      inputElement.focus();
      inputElement.value = clipboardData;

      // Manually trigger the 'change' event
      const event = new Event("change", { bubbles: true, cancelable: true });
      inputElement.dispatchEvent(event);

      // Update the state as well if needed
      setLinks({ ...links, [platform]: clipboardData });
      switch (platform) {
        case "youtube":
          setYoutubeValid(validURL(clipboardData));
          break;
        case "instagram":
          setInstagramValid(validURL(clipboardData));
          break;
        case "facebook":
          setFacebookValid(validURL(clipboardData));
          break;
        case "twitter":
          setTwitterValid(validURL(clipboardData));
          break;
        case "linkedIn":
          setLinkedInValid(validURL(clipboardData));
          break;
        case "snapchat":
          setSnapchatValid(validURL(clipboardData));
          break;
        case "tiktok":
          setTiktokValid(validURL(clipboardData));
          break;
        case "other":
          setOtherValid(validURL(clipboardData));
          break;
        default:
          break;
      }
    }
  };

  const handleContinue = () => {
    setBtnLoading(true);
    try {
      dispatch({
        type: onboardingSagaActions.EDIT_USER,
        payload: {
          socialLinks: filterEmptyLinks(links),
          id: onBoarding.id,
          profileStatusCode: "done",
        },
      });
      router.push(`/configure/wall`);
    } catch (error) {
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSkip = () => {
    router.push(`/configure/wall`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLinks((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validURL = (str: string) => {
    if (!str.length) {
      return true;
    }
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*" + // port and path (added @ to the character class)
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    return !!pattern.test(str);
  };

  const handleCross = async (platform: string) => {
    setLinks({ ...links, [platform]: "" });
  };
  const handleBackButtonClick = () => {
    setDisplayStep(false);
  };

  const handleLogout = async () => {
    dispatch({
      type: onboardingSagaActions.SET_ID,
      payload: "",
    });
    await Auth.signOut();
    window.location.href = "/login";
    localStorage.clear();
  };

  return (
    <>
      <div className={`${styles.step2Container} pageWidth`}>
        <div className={styles.options}>
          <div className={styles.back} onClick={handleBackButtonClick}>
            <Image
              alt="back"
              src="/assets/svg/left.svg"
              height={15}
              width={15}
            />
            <span>Back</span>
          </div>
          <div className={styles.logoutBtn}>
            <Button
              onClick={() => {
                handleLogout();
              }}
              className={styles.iconWrapper}
            >
              <LogoutOutlined />
            </Button>
          </div>
        </div>

        <div className={styles.headerContainer}>
          <div className={styles.header}>Add Social Media Links</div>
          <div className={styles.selectSocial}>
            Select social links you would like to add
          </div>
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.social}>
            <div className={styles.platformContainer}>
              <Image
                height={30}
                width={30}
                src="/assets/svg/yt.svg"
                alt="Yt Icon"
              />

              <Input
                size="large"
                id="youtube"
                name="youtube"
                placeholder="Paste the link here"
                value={links.youtube}
                allowClear={{
                  clearIcon: (
                    <CloseCircleOutlined
                      style={{ color: "black", fontSize: "14px" }}
                      onClick={() => handleCross("youtube")}
                    />
                  ),
                }}
                suffix={
                  <Image
                    height={18}
                    width={18}
                    src="/assets/svg/paste.svg"
                    alt="paste"
                    className={styles.optionIcon}
                    onClick={() => {
                      handlePaste("youtube");
                    }}
                  />
                }
                onChange={(event) => {
                  setYoutubeValid(validURL(event.target.value));
                  handleChange(event);
                }}
                status={isYoutubeValid ? "" : "error"}
              />
            </div>
            <div>
              {!isYoutubeValid && (
                <span className={styles.errorMessage}>
                  Please enter a valid url
                </span>
              )}
            </div>
          </div>
          <div className={styles.social}>
            <div className={styles.platformContainer}>
              <Image
                height={30}
                width={30}
                src="/assets/svg/ig.svg"
                alt="Ig Icon"
              />
              <Input
                size="large"
                name="instagram"
                id="instagram"
                value={links.instagram}
                placeholder="Paste the link here"
                allowClear={{
                  clearIcon: (
                    <CloseCircleOutlined
                      style={{ color: "black", fontSize: "14px" }}
                      onClick={() => handleCross("instagram")}
                    />
                  ),
                }}
                suffix={
                  <Image
                    height={18}
                    width={18}
                    src="/assets/svg/paste.svg"
                    alt="paste"
                    className={styles.optionIcon}
                    onClick={() => {
                      handlePaste("instagram");
                    }}
                  />
                }
                onChange={(event) => {
                  setInstagramValid(validURL(event.target.value));
                  handleChange(event);
                }}
                status={isInstagramValid ? "" : "error"}
              />
            </div>
            <div>
              {!isInstagramValid && (
                <span className={styles.errorMessage}>
                  Please enter a valid url
                </span>
              )}
            </div>
          </div>
          <div className={styles.social}>
            <div className={styles.platformContainer}>
              <Image
                height={30}
                width={30}
                src="/assets/png/facebook.png"
                alt="Fb Icon"
              />
              <Input
                size="large"
                id="facebook"
                name="facebook"
                value={links.facebook}
                placeholder="Paste the link here"
                allowClear={{
                  clearIcon: (
                    <CloseCircleOutlined
                      style={{ color: "black", fontSize: "14px" }}
                      onClick={() => handleCross("facebook")}
                    />
                  ),
                }}
                suffix={
                  <Image
                    height={18}
                    width={18}
                    src="/assets/svg/paste.svg"
                    alt="paste"
                    className={styles.optionIcon}
                    onClick={() => {
                      handlePaste("facebook");
                    }}
                  />
                }
                onChange={(event) => {
                  setFacebookValid(validURL(event.target.value));
                  handleChange(event);
                }}
                status={isFacebookValid ? "" : "error"}
              />
            </div>
            <div>
              {!isFacebookValid && (
                <span className={styles.errorMessage}>
                  Please enter a valid url
                </span>
              )}
            </div>
          </div>
          <div className={styles.social}>
            <div className={styles.platformContainer}>
              <Image
                height={35}
                width={32}
                src="/assets/svg/twitter.svg"
                alt="Twitter Icon"
              />
              <Input
                size="large"
                id="twitter"
                name="twitter"
                value={links.twitter}
                placeholder="Paste the link here"
                allowClear={{
                  clearIcon: (
                    <CloseCircleOutlined
                      style={{ color: "black", fontSize: "14px" }}
                      onClick={() => handleCross("twitter")}
                    />
                  ),
                }}
                suffix={
                  <Image
                    height={18}
                    width={18}
                    src="/assets/svg/paste.svg"
                    alt="paste"
                    className={styles.optionIcon}
                    onClick={() => {
                      handlePaste("twitter");
                    }}
                  />
                }
                onChange={(event) => {
                  setTwitterValid(validURL(event.target.value));
                  handleChange(event);
                }}
                status={isTwitterValid ? "" : "error"}
              />
            </div>
            <div>
              {!isTwitterValid && (
                <span className={styles.errorMessage}>
                  Please enter a valid url
                </span>
              )}
            </div>
          </div>
          <div className={styles.social}>
            <div className={styles.platformContainer}>
              <Image
                height={40}
                width={35}
                src="/assets/svg/linkedin.svg"
                alt="Linkedin Icon"
              />
              <Input
                size="large"
                id="linkedIn"
                name="linkedIn"
                value={links.linkedIn}
                placeholder="Paste the link here"
                allowClear={{
                  clearIcon: (
                    <CloseCircleOutlined
                      style={{ color: "black", fontSize: "14px" }}
                      onClick={() => handleCross("linkedIn")}
                    />
                  ),
                }}
                suffix={
                  <Image
                    height={18}
                    width={18}
                    src="/assets/svg/paste.svg"
                    alt="paste"
                    className={styles.optionIcon}
                    onClick={() => {
                      handlePaste("linkedIn");
                    }}
                  />
                }
                onChange={(event) => {
                  setLinkedInValid(validURL(event.target.value));
                  handleChange(event);
                }}
                status={isLinkedInValid ? "" : "error"}
              />
            </div>
            <div>
              {!isLinkedInValid && (
                <span className={styles.errorMessage}>
                  Please enter a valid url
                </span>
              )}
            </div>
          </div>
          <div className={styles.social}>
            <div className={styles.platformContainer}>
              <Image
                height={32}
                width={32}
                src="/assets/svg/snapchat.svg"
                alt="Snapchat Icon"
              />
              <Input
                size="large"
                id="snapchat"
                name="snapchat"
                value={links.snapchat}
                placeholder="Paste the link here"
                allowClear={{
                  clearIcon: (
                    <CloseCircleOutlined
                      style={{ color: "black", fontSize: "14px" }}
                      onClick={() => handleCross("snapchat")}
                    />
                  ),
                }}
                suffix={
                  <Image
                    height={18}
                    width={18}
                    src="/assets/svg/paste.svg"
                    alt="paste"
                    className={styles.optionIcon}
                    onClick={() => {
                      handlePaste("snapchat");
                    }}
                  />
                }
                onChange={(event) => {
                  setSnapchatValid(validURL(event.target.value));
                  handleChange(event);
                }}
                status={isSnapchatValid ? "" : "error"}
              />
            </div>
            <div>
              {!isSnapchatValid && (
                <span className={styles.errorMessage}>
                  Please enter a valid url
                </span>
              )}
            </div>
          </div>
          <div className={styles.social}>
            <div className={styles.platformContainer}>
              <Image
                height={32}
                width={32}
                src="/assets/svg/tiktok.svg"
                alt="Tiktok Icon"
              />
              <Input
                size="large"
                id="tiktok"
                name="tiktok"
                value={links.tiktok}
                placeholder="Paste the link here"
                allowClear={{
                  clearIcon: (
                    <CloseCircleOutlined
                      style={{ color: "black", fontSize: "14px" }}
                      onClick={() => handleCross("tiktok")}
                    />
                  ),
                }}
                suffix={
                  <Image
                    height={18}
                    width={18}
                    src="/assets/svg/paste.svg"
                    alt="paste"
                    className={styles.optionIcon}
                    onClick={() => {
                      handlePaste("tiktok");
                    }}
                  />
                }
                onChange={(event) => {
                  setTiktokValid(validURL(event.target.value));
                  handleChange(event);
                }}
                status={isTiktokValid ? "" : "error"}
              />
            </div>
            <div>
              {!isTiktokValid && (
                <span className={styles.errorMessage}>
                  Please enter a valid url
                </span>
              )}
            </div>
          </div>
          <div className={styles.social}>
            <div className={styles.platformContainer}>
              <Image
                height={28}
                width={32}
                src="/assets/svg/web.svg"
                alt="Other Icon"
              />
              <Input
                size="large"
                id="other"
                name="other"
                value={links.other}
                placeholder="Paste the link here"
                allowClear={{
                  clearIcon: (
                    <CloseCircleOutlined
                      style={{ color: "black", fontSize: "14px" }}
                      onClick={() => handleCross("other")}
                    />
                  ),
                }}
                suffix={
                  <Image
                    height={18}
                    width={18}
                    src="/assets/svg/paste.svg"
                    alt="paste"
                    className={styles.optionIcon}
                    onClick={() => {
                      handlePaste("other");
                    }}
                  />
                }
                onChange={(event) => {
                  setOtherValid(validURL(event.target.value));
                  handleChange(event);
                }}
                status={isOtherValid ? "" : "error"}
              />
            </div>
            <div>
              {!isOtherValid && (
                <span className={styles.errorMessage}>
                  Please enter a valid url
                </span>
              )}
            </div>
          </div>
        </div>
        <Flex>
          <Button
            size="large"
            type="link"
            htmlType="button"
            onClick={handleSkip}
            style={{ display: "flex" }}
          >
            Skip
          </Button>

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={btnLoading}
            onClick={handleContinue}
            disabled={
              !isYoutubeValid ||
              !isInstagramValid ||
              !isFacebookValid ||
              !isLinkedInValid ||
              !isSnapchatValid ||
              !isTiktokValid ||
              !isTwitterValid ||
              !isOtherValid ||
              !(
                links.youtube ||
                links.facebook ||
                links.instagram ||
                links.linkedIn ||
                links.snapchat ||
                links.tiktok ||
                links.other ||
                links.twitter
              )
            }
          >
            Continue
          </Button>
        </Flex>
      </div>
    </>
  );
}

export default transition(Step2);
