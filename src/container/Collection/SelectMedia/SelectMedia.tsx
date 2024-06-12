"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./SelectMedia.module.scss";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import {
  syncYtItems,
  syncFbItems,
  syncIgItems,
} from "@/store/sagas/handlers/configure.handle";
import transition from "@/components/Transition/Transition";
import Header from "../../../components/Header/Header";
import { convertToTitleCase } from "@/utils/helperFunction";
import { Button, Checkbox, CheckboxProps, Modal } from "antd";
import { useRouter } from "next/navigation";
import Toast from "../../../components/Toast/Toast";
import { useDispatch } from "react-redux";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";

type ProgressProp = {
  platform: string;
};
function SelectMedia({ platform }: ProgressProp) {
  const configData = useSelector((state: any) => state.configure);
  const [allMedia, setAllMedia] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>([]);
  const [igError, setIGError] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  useEffect(() => {
    if (platform === "youtube") {
      const importedYtVideoIds = configData?.youTube?.mediaData?.data.map(
        (item: any) => item.videoId
      );
      const combinedArray = [
        ...configData?.youTube?.mediaData?.data,
        ...configData?.importedYt?.data.filter((item: any) =>
          importedYtVideoIds.includes(item.videoId)
        ),
        ,
      ];
      const uniqueIds: any[] = [];
      const filteredArray = combinedArray.filter((item) => {
        const id = item.videoId;
        if (!uniqueIds.includes(id)) {
          uniqueIds.push(id);
          return true;
        }
        return false;
      });
      setAllMedia(filteredArray);
      setSelectedMedia(
        configData?.importedYt?.data?.filter((item: any) => !item.isArchived)
      );
    } else if (platform === "facebook") {
      const importedFbVideoIds = configData?.faceBook?.mediaData?.data.map(
        (item: any) => item.videoId
      );
      const combinedArray = [
        ...configData?.faceBook?.mediaData?.data,
        ...configData?.importedFb?.data.filter((item: any) =>
          importedFbVideoIds.includes(item.videoId)
        ),
      ];
      const uniqueIds: any[] = [];
      const filteredArray = combinedArray.filter((item) => {
        const id = item.videoId;
        if (!uniqueIds.includes(id)) {
          uniqueIds.push(id);
          return true;
        }
        return false;
      });
      setAllMedia(filteredArray);
      setSelectedMedia(
        configData?.importedFb?.data?.filter((item: any) => !item.isArchived)
      );
    } else if (platform === "instagram") {
      if (configData?.instagram?.error) {
        setIGError(configData?.instagram.error);
      } else {
        const combinedArray = [
          ...configData?.instagram?.mediaData?.data,
          ...configData?.importedIg?.data,
        ];
        const uniqueIds: any[] = [];
        const filteredArray = combinedArray.filter((item) => {
          const id = item.videoId;
          if (!uniqueIds.includes(id)) {
            uniqueIds.push(id);
            return true;
          }
          return false;
        });
        setAllMedia(filteredArray);
        setSelectedMedia(
          configData?.importedIg?.data?.filter((item: any) => !item.isArchived)
        );
      }
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
      if (!selectedMedia.length) {
        showToast("Please select atleast one media!", "error");
        return;
      }
      if (platform === "youtube") {
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
          }: any) => video
        );
        const payload = {
          videos: videos,
        };
        await syncYtItems(payload);
      }
      if (platform === "facebook") {
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
          }: any) => video
        );
        const payload = {
          videos: videos,
        };
        await syncFbItems(payload);
      }
      if (platform === "instagram") {
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
            createdAt,
            __typename,
            influencerId,
            isArchived,
            statistics,
            subSections,
            updatedAt,
            ...video
          }: any) => video
        );
        const payload = {
          videos: videos,
        };
        await syncIgItems(payload);
      }
      showToast("Video added successfully!", "success");
      router.push("/configure/collection");
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
    return selectedMedia?.some(
      (item: any) => item.videoId === imageId.videoId && !item?.isArchived
    );
  };
  const handleDisconnectClick = () => {
    Modal.confirm({
      title: "Disconnect Social Account Confirmation",
      content:
        "Are you sure you want to disconnect your account from our website? This action cannot be undone.",
      onOk() {
        handleUnlink();
      },
      centered: true,
    });
  };
  const handleUnlink = () => {
    if (platform === "youtube") {
      dispatch({
        type: configureSagaActions.RESET_YT_DATA,
      });
    }
    if (platform === "facebook") {
      dispatch({
        type: configureSagaActions.RESET_FB_DATA,
      });
    }
    if (platform === "instagram") {
      dispatch({
        type: configureSagaActions.RESET_IG_DATA,
      });
    }
  };
  const handleConnectClick = () => {
    if (platform === "youtube") {
      dispatch({
        type: configureSagaActions.RESET_YT_DATA,
      });
    }
    if (platform === "facebook") {
      dispatch({
        type: configureSagaActions.RESET_FB_DATA,
      });
    }
    if (platform === "instagram") {
      dispatch({
        type: configureSagaActions.RESET_IG_DATA,
      });
    }
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
        {(platform === "instagram" ? !igError : true) && (
          <div className={`${styles.container} pageWidth`}>
            <div className={styles.header}>
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
                        onClick={(e) => toggleImageInState(image)}
                      >
                        <img
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

                  <div className={styles.header}>
                    <Button
                      type="primary"
                      size="large"
                      danger
                      onClick={handleDisconnectClick}
                    >
                      Disconnect
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      loading={loading}
                      onClick={submit}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
              {!allMedia.length && (
                <div className={styles.noMediaContainer}>
                  <p className={styles.noMediaHeader}>No Media Found</p>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleConnectClick}
                  >
                    Connect other account
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        {igError && platform === "instagram" && (
          <div className={styles.header}>
            <Header title={`${convertToTitleCase(platform)} Videos`} />
            <div className={styles.failedMessage}>
              <span>
                Your Instagram Account Is Not Connected To a Facebook Page
              </span>
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
    </>
  );
}

export default transition(SelectMedia);
