"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./EditMedia.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import {
  createMediaItem,
  updateMediaItems,
} from "@/store/sagas/handlers/configure.handle";
import { Storage } from "aws-amplify";
import Loader from "@/components/Loader/Loader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import Header from "@/components/Header/Header";
import DeleteModal from "@/components/DeleteModal/DeleteModal";

type ProgressProp = {
  sectionId: string;
  subSectionId?: string;
  data: any;
};

function EditMedia({ sectionId, subSectionId, data }: ProgressProp) {
  const userDetail = useSelector((state: any) => state.auth);
  const [uploadedImageKey, setUploadedImageKey] = useState<Array<string>>([]);
  const [uploadedDataMeta, setUploadedDataMeta] = useState<Array<any>>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const inputRef: any = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUploadedDataMeta(data);
  }, [data]);

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event: any) => {
    try {
      setLoader(true);
      const files = event.target.files;
      if (!files || files.length === 0) {
        return;
      }
      const newImages: any = [];

      for (let i = 0; i < files.length; i++) {
        const fileObj = files[i];
        if (fileObj.size > 40 * 1024 * 1024) {
          showToast("File with maximum size of 40MB is allowed", "warning");
          continue;
        }

        const res = await Storage.put(
          `custom/${"images"}/${(fileObj?.name)
            .split(".")
            .slice(0, -1)
            .join("")}-${new Date().valueOf()}`,
          fileObj,
          {
            contentType: fileObj?.type,
            level: "public",
          }
        );

        const obj = {
          type: fileObj?.type?.toUpperCase().split("/")[0],
          mediaPath: res.key,
          name: fileObj?.name,
          size: (fileObj.size / 1024 ** 2).toFixed(2),
          position: uploadedDataMeta.length,
        };
        newImages.push(obj);

        setUploadedImageKey((oldKeys) => [...oldKeys, res.key]);
      }
      setUploadedDataMeta((oldImages) => [...oldImages, ...newImages]);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoader(false);
    }
  };

  const handleThumbnailFileChange = async (event: any, index: number) => {
    try {
      setLoader(true);
      const fileObj = event.target.files && event.target.files[0];
      if (!fileObj) {
        return;
      }
      if (event.target.files[0].size > 1 * 1000 * 10240) {
        if (window) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }

        setShowPopup(true);
        event.target.value = null;
        setTimeout(() => {
          setShowPopup(false);
        }, 2200);
        return;
      }

      const res = await Storage.put(
        `custom/videos/thumbnails/${(fileObj?.name)
          .split(".")
          .slice(0, -1)
          .join("")}-${new Date().valueOf()}`,
        fileObj,
        {
          contentType: fileObj?.type,
          level: "public",
        }
      );

      setUploadedDataMeta((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = { ...updatedData[index], thumbnailUrl: res.key };
        return updatedData;
      });

      event.target.value = null;
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoader(false);
    }
  };

  const handleRemoveThumbnail = async (index: number) => {
    setUploadedDataMeta((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], thumbnailUrl: "" };
      return updatedData;
    });
  };

  const handleDelete = async () => {
    try {
      const filteredImages = uploadedDataMeta.filter(
        (_, i) => i !== deleteIndex
      );
      const filteredImageKey = uploadedImageKey.filter(
        (_, i) => i !== deleteIndex
      );
      showToast("Media deleted successfully!", "success");
      setUploadedDataMeta(filteredImages);
      setUploadedImageKey(filteredImageKey);
    } catch (error) {
    } finally {
      setDeleteIndex(null);
    }
  };

  const submit = async () => {
    setLoading(true);
    try {
      if (loader) {
        return;
      }
      if (uploadedDataMeta?.length === 0) {
        showToast("Please add atleast one media", "warning");
        return;
      }
      if (!!deleteId?.length) {
        deleteId.map(async (id: string) => {
          const payload = {
            id: id,
            isArchived: true,
          };
          await updateMediaItems(payload);
        });
      }
      const payload = {
        mediaItems: [
          ...uploadedDataMeta.filter((item) => !item.hasOwnProperty("id")),
        ],
        sectionId: sectionId,
        subSectionId,
      };
      if (!!payload?.mediaItems.length) {
        await createMediaItem(payload);
      }

      await Promise.all(
        uploadedDataMeta.map(async (item) => {
          if (item?.id) {
            const payload = {
              ...item,
              title: item?.title || "",
              thumbnailUrl: item?.thumbnailUrl || "",
            };
            await updateMediaItems(payload);
          }
        })
      );
      dispatchAndClose();
      showToast("Media edited successfully!", "success");
      router.push("/configure/wall");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
    } finally {
      setLoading(false);
    }
  };

  const dispatchAndClose = () => {
    dispatch({
      type: configureSagaActions.SET_SECTIONS,
      payload: userDetail?.userDetail?.id,
    });
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(uploadedDataMeta);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((element: any, index: number) => {
      return {
        ...element,
        position: index,
      };
    });

    setUploadedDataMeta(updatedItems);
  };

  return (
    <>
      <div className={`${styles.parentWrapper} pageWidth`}>
        <Header title="Edit Media" />
        <div className={styles.contentWrapper}>
          <div
            className={`${styles.messageWrapper} ${
              showPopup ? styles.glowEffect : ""
            }`}
          >
            <span>
              Upload media from your phone. Supported formats include PNG, JPEG,
              JPG, WEBP and MP4 with a maximum file size of 40MB.
            </span>
          </div>
          <div className={styles.imageRowWrapper}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided: any) => (
                  <ul
                    className={styles.ul}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {uploadedDataMeta.map((image: any, index: number) => (
                      <Draggable
                        key={index}
                        draggableId={String(index)}
                        index={index}
                      >
                        {(provided: any) => (
                          <div
                            className={styles.imageWrapper}
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.charactersThumb}>
                              <Image
                                src={"/assets/svg/drag.svg"}
                                alt="drag"
                                height={28}
                                width={28}
                              />
                            </div>
                            {image?.type === "IMAGE" ? (
                              <div className={styles.imageTag}>
                                <Image
                                  src={getPublicURL(
                                    "public/" + image?.mediaPath
                                  )}
                                  alt="media"
                                  width={52}
                                  height={39}
                                />
                              </div>
                            ) : (
                              <div className={styles.videoWrapper}>
                                <Image
                                  alt="back"
                                  src={"/assets/svg/play.svg"}
                                  height={16}
                                  width={16}
                                  className={styles.videoPlayButton}
                                />
                                {!!image?.thumbnailUrl?.length ? (
                                  <Image
                                    src={getPublicURL(
                                      "public/" + image?.thumbnailUrl
                                    )}
                                    alt="media"
                                    width={52}
                                    height={39}
                                  />
                                ) : (
                                  <video
                                    src={getPublicURL(
                                      "public/" + image?.mediaPath
                                    )}
                                    width={52}
                                    height={39}
                                  />
                                )}
                              </div>
                            )}
                            <div className={styles.rightSectionWrapper}>
                              <div className={styles.sizeTitleWrapper}>
                                <div className={styles.imageTitle}>
                                  {image?.name}
                                </div>
                                <div className={styles.imageSize}>
                                  {image?.size} MB
                                </div>
                                {image?.type === "VIDEO" && (
                                  <div className={styles.thumbnailTextWrapper}>
                                    {!!image?.thumbnailUrl?.length ? (
                                      <div
                                        className={styles.editThumbnailWrapper}
                                      >
                                        <div className={styles.customFileInput}>
                                          <label htmlFor="file-upload">
                                            Edit Thumbnail
                                          </label>
                                          <input
                                            type="file"
                                            id="file-upload"
                                            name="file-upload"
                                            accept={
                                              "image/png, image/jpeg, image/heic, image/webp"
                                            }
                                            onChange={(event) =>
                                              handleThumbnailFileChange(
                                                event,
                                                index
                                              )
                                            }
                                          />
                                        </div>
                                        <span className={styles.divider}>
                                          {" "}
                                          |{" "}
                                        </span>
                                        <span
                                          className={styles.thumbnailText}
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            handleRemoveThumbnail(index);
                                          }}
                                        >
                                          Remove Thumbnail
                                        </span>
                                      </div>
                                    ) : (
                                      <div className={styles.customFileInput}>
                                        <label htmlFor="file-upload">
                                          Add Thumbnail
                                        </label>
                                        <input
                                          type="file"
                                          id="file-upload"
                                          name="file-upload"
                                          accept={
                                            "image/png, image/jpeg, image/heic, image/webp"
                                          }
                                          onChange={(event) =>
                                            handleThumbnailFileChange(
                                              event,
                                              index
                                            )
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div>
                                <Image
                                  alt="back"
                                  src={"/assets/svg/delete.svg"}
                                  height={16}
                                  width={16}
                                  onClick={() => {
                                    setDeleteIndex(index);
                                    setDeleteId((prevDeleteId) => [
                                      ...prevDeleteId,
                                      image?.id,
                                    ]);
                                    setDeleteModal(true);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div onClick={handleClick}>
            <Button
              type="primary"
              size={"large"}
              ghost
              className={styles.addMoreBtn}
            >
              <Image
                src="/assets/svg/secondaryPlus.svg"
                width={18}
                height={18}
                alt="add image"
              />
              <span>Add More</span>
            </Button>
            <input
              ref={inputRef}
              name="Select File"
              type="file"
              accept={
                "image/png, image/jpeg, image/gif, image/webp, image/heic, video/*"
              }
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div>
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
        {toast.toastDisplay && (
          <Toast
            toastDisplay={toast.toastDisplay}
            toastMessage={toast.toastMessage}
            toastType={toast.toastType}
          />
        )}
      </div>
      {deleteModal && (
        <DeleteModal
          text={"Item"}
          closeModal={setDeleteModal}
          deleteConfirmation={handleDelete}
        />
      )}

      {loader && <Loader text={`Uploading data`} />}
    </>
  );
}

export default transition(EditMedia);
