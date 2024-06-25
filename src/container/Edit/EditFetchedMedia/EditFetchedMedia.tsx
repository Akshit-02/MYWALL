"use client";
import React, { useEffect, useState } from "react";
import styles from "./EditFetchedMedia.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createFbItems,
  createIgItems,
  createYtItems,
} from "@/store/sagas/handlers/configure.handle";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { Button, Checkbox, CheckboxProps } from "antd";
import { useRouter } from "next/navigation";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import Header from "@/components/Header/Header";

type ProgressProp = {
  allMediaData: any;
  selectedMediaData: any;
  subSectionId: string;
  sectionId: string;
  type: string;
};

function EditFetchedMedia({
  allMediaData,
  selectedMediaData,
  subSectionId,
  sectionId,
  type,
}: ProgressProp) {
  const [loading, setLoading] = useState(false);
  const [allMedia, setAllMedia] = useState<any>([]);
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const userDetail = useSelector((state: any) => state.onboarding);
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setAllMedia(allMediaData);
    setSelectedMedia(selectedMediaData);
  }, [allMediaData, selectedMediaData]);

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
      if (type === "YOUTUBE") {
        const videos = selectedMedia.map(
          ({
            channelPic,
            channelId,
            createdAt,
            __typename,
            influencerId,
            isArchived,
            statistics,
            subSections,
            id,
            updatedAt,
            ...video
          }: any) => {
            const cleanedVideo = Object.fromEntries(
              Object.entries(video).filter(([_, value]) => value !== null)
            );
            return cleanedVideo;
          }
        );
        const payload = {
          selectedMedia: { videos: videos },
          sectionId: sectionId,
          subSectionId: subSectionId,
        };
        await createYtItems(payload);
        showToast("Youtube shorts edited successfully!", "success");
      } else if (type === "FACEBOOK") {
        const videos = selectedMedia.map(
          ({
            id,
            like_count,
            permalink,
            createdAt,
            __typename,
            influencerId,
            isArchived,
            statistics,
            subSections,
            updatedAt,
            ...video
          }: any) => {
            const cleanedVideo = Object.fromEntries(
              Object.entries(video).filter(([_, value]) => value !== null)
            );
            return cleanedVideo;
          }
        );
        const payload = {
          selectedMedia: { videos: videos },
          sectionId: sectionId,
          subSectionId: subSectionId,
        };
        await createFbItems(payload);
        showToast("Facebook reels edited successfully!", "success");
      } else if (type === "INSTAGRAM") {
        const videos = selectedMedia.map(
          ({
            thumbnail_url,
            comments_count,
            media_product_type,
            media_url,
            statistics,
            caption,
            createdAt,
            updatedAt,
            isArchived,
            id,
            like_count,
            permalink,
            subSections,
            __typename,
            influencerId,
            ...video
          }: any) => {
            const cleanedVideo = Object.fromEntries(
              Object.entries(video).filter(([_, value]) => value !== null)
            );
            return cleanedVideo;
          }
        );
        const payload = {
          selectedMedia: { videos: videos },
          sectionId: sectionId,
          subSectionId: subSectionId,
        };
        await createIgItems(payload);
        showToast("Instagram reels edited successfully!", "success");
      }

      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail.onBoarding.id,
      });
      router.push("/configure/wall");
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
          <Header title="Select Videos" />
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
                    onClick={(e) =>
                      toggleImageInState(image?.videoData || image)
                    }
                  >
                    <img
                      src={getPublicURL(image?.thumbnailUrl)}
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
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
        {toast.toastDisplay && (
          <Toast
            toastDisplay={toast.toastDisplay}
            toastMessage={toast.toastMessage}
            toastType={toast.toastType}
          />
        )}
      </div>
    </>
  );
}

export default transition(EditFetchedMedia);
