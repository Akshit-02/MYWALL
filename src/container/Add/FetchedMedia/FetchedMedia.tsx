"use client";

import React, { useEffect, useState } from "react";
import styles from "./FetchedMedia.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  createFbItems,
  createIgItems,
  createYtItems,
  getSections,
} from "@/store/sagas/handlers/configure.handle";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { Button, Checkbox, CheckboxProps } from "antd";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import Header from "@/components/Header/Header";
import { convertToTitleCase } from "@/utils/helperFunction";

type ProgressProp = {
  platform: string;
  sectionId: string;
};

function FetchedMedia({ platform, sectionId }: ProgressProp) {
  const configData = useSelector((state: any) => state.configure);
  const userDetail = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [allMedia, setAllMedia] = useState<any>([]);
  const [showAllVideo, setShowAllVideo] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  useEffect(() => {
    if (platform === "YOUTUBE") {
      setShowAllVideo(true);
      setAllMedia(configData?.youTube?.mediaData?.data);
    } else if (platform === "FACEBOOK") {
      setShowAllVideo(true);
      setAllMedia(configData?.faceBook?.mediaData?.data);
    } else if (platform === "INSTAGRAM") {
      setShowAllVideo(true);
      setAllMedia(configData?.instagram?.mediaData?.data);
    }
  }, [platform, configData]);

  useEffect(() => {
    const allMediaIds = allMedia.map((media: any) => media.videoId);
    const selectedMediaIds = selectedMedia.map((media: any) => media.videoId);

    if (
      allMediaIds.length === selectedMediaIds.length &&
      allMediaIds.every((videoId: string) => selectedMediaIds.includes(videoId))
    ) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [allMedia, selectedMedia]);

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };
  const submit = async () => {
    setLoading(true);
    try {
      if (platform === "YOUTUBE") {
        const videos = selectedMedia.map(
          ({ channelPic, channelId, ...video }: any) => video
        );
        const payload = {
          selectedMedia: { videos: videos },
          sectionId: sectionId,
        };
        await createYtItems(payload);
        showToast("Youtube shorts added successfully!", "success");
      }

      if (platform === "FACEBOOK") {
        const payload = {
          selectedMedia: { videos: selectedMedia },
          sectionId: sectionId,
        };
        await createFbItems(payload);
        showToast("Facebook reels added successfully!", "success");
      }
      if (platform === "INSTAGRAM") {
        const videos = selectedMedia.map(
          ({
            thumbnail_url,
            comments_count,
            media_product_type,
            media_url,
            caption,
            id,
            like_count,
            permalink,
            ...video
          }: any) => video
        );
        const payload = {
          selectedMedia: { videos: videos },
          sectionId: sectionId,
        };
        await createIgItems(payload);
        showToast("Instagram reels added successfully!", "success");
      }
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.userDetail?.id,
      });
      router.push("/configure/wall");

      getSections(userDetail?.id);
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
    } finally {
      setLoading(false);
    }
  };

  function toggleImageInState(image: any) {
    const index = selectedMedia?.findIndex(
      (item: any) => item.videoId === image.videoId
    );
    if (index === -1) {
      const newimage = allMedia?.find(
        (item: any) => item.videoId === image.videoId
      );
      if (newimage) {
        setSelectedMedia((prevState: any) => [...prevState, image]);
      }
    } else {
      setSelectedMedia((prevState: any) =>
        prevState.filter((item: any) => item.videoId !== image.videoId)
      );
    }
  }

  const isImageChecked = (imageId: any) => {
    return selectedMedia?.some((item: any) => item.videoId === imageId.videoId);
  };

  const handleSelectAll: CheckboxProps["onChange"] = (e) => {
    if (e.target.checked) {
      setSelectedMedia(allMedia);
      setIsChecked(true);
    } else {
      setSelectedMedia([]);
      setIsChecked(false);
    }
  };
  return (
    <>
      <div>
        <div className={`${styles.container} pageWidth`}>
          <Header title={`${convertToTitleCase(platform)} Videos`} />
          {!!allMedia.length && (
            <div className={styles.mediaContainer}>
              <div className={styles.options}>
                <div>
                  <p>
                    Selected: {selectedMedia.length} / {allMedia?.length}
                  </p>
                </div>
                <Checkbox
                  checked={isChecked}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                >
                  Select All
                </Checkbox>
              </div>

              <div className={styles.content}>
                {allMedia?.map((image: any, index: number) => (
                  <div
                    className={styles.img_block}
                    key={index}
                    onClick={() => toggleImageInState(image)}
                  >
                    <Image
                      src={
                        image?.thumbnailUrl?.includes("https")
                          ? image.thumbnailUrl
                          : getPublicURL(image.thumbnailUrl)
                      }
                      alt="media"
                      width={150}
                      height={218}
                      className={
                        isImageChecked(image)
                          ? styles.img_blockk
                          : styles.img_noblock
                      }
                    />
                    <Checkbox
                      checked={isImageChecked(image)}
                      className={styles.chkbox}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.footer}>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={submit}
                  size={"large"}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {toast.toastDisplay && (
        <Toast
          toastDisplay={toast.toastDisplay}
          toastMessage={toast.toastMessage}
          toastType={toast.toastType}
        />
      )}
    </>
  );
}

export default transition(FetchedMedia);
