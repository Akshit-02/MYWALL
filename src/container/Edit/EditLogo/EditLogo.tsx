"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./EditLogo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import {
  createLogoItem,
  updateLogoItems,
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
  data?: any;
};

function EditLogo({ sectionId, subSectionId, data }: ProgressProp) {
  const userDetail = useSelector((state: any) => state.auth);
  const [uploadedImageKey, setUploadedImageKey] = useState<Array<string>>([]);
  const [uploadedDataMeta, setUploadedDataMeta] = useState<Array<any>>([]);
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

  const dispatch = useDispatch();
  const router = useRouter();
  const inputRef: any = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUploadedDataMeta(data);
  }, [data]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
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
        if (fileObj.size > 1 * 1000 * 10240) {
          showToast("File with maximum size of 10MB is allowed", "warning");
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

  const handleDelete = async () => {
    try {
      const filteredImages = uploadedDataMeta.filter(
        (_, i) => i !== deleteIndex
      );
      const filteredImageKey = uploadedImageKey.filter(
        (_, i) => i !== deleteIndex
      );
      setUploadedDataMeta(filteredImages);
      setUploadedImageKey(filteredImageKey);
      showToast("Logo deleted successfully!", "success");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
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
        showToast("Please add atleast one logo", "warning");
        return;
      }
      if (!!deleteId?.length) {
        deleteId.map(async (id: string) => {
          const payload = {
            id: id,
            isArchived: true,
          };
          await updateLogoItems(payload);
        });
      }
      const payload = {
        logoItems: [
          ...uploadedDataMeta.filter((item) => !item.hasOwnProperty("id")),
        ],
        sectionId: sectionId,
        subSectionId,
      };

      if (!!payload?.logoItems.length) {
        await createLogoItem(payload);
      }

      await Promise.all(
        uploadedDataMeta.map(async (item) => {
          if (item?.id) {
            const payload = {
              ...item,
              title: item?.title || "",
            };

            await updateLogoItems(payload);
          }
        })
      );
      showToast("Logo edited successfully!", "success");
      dispatchAndClose();
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
        <Header title="Edit Logo" />
        <div className={styles.contentWrapper}>
          <div className={styles.messageWrapper}>
            <span>
              Upload logo from your phone. Supported formats include PNG, JPEG,
              JPG, and WEBP with a maximum file size of 10MB.
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

                            <div className={styles.imageTag}>
                              <Image
                                src={getPublicURL("public/" + image?.mediaPath)}
                                alt="media"
                                width={52}
                                height={39}
                              />
                            </div>

                            <div className={styles.rightSectionWrapper}>
                              <div className={styles.sizeTitleWrapper}>
                                <div className={styles.imageTitle}>
                                  {image.name}
                                </div>
                                <div className={styles.imageSize}>
                                  {image.size} MB
                                </div>
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
              ghost
              size="large"
              className={styles.addMoreBtn}
            >
              <Image
                src="/assets/svg/secondaryPlus.svg"
                width={14}
                height={14}
                alt="add image"
              />
              <span>Add More</span>
            </Button>
            <input
              ref={inputRef}
              name="Select File"
              type="file"
              accept={"image/png, image/jpeg, image/heic, image/webp"}
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
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
      </div>
      {toast.toastDisplay && (
        <Toast
          toastDisplay={toast.toastDisplay}
          toastMessage={toast.toastMessage}
          toastType={toast.toastType}
        />
      )}
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

export default transition(EditLogo);
