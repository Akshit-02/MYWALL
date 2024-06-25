"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCustomLinks,
  getSections,
} from "@/store/sagas/handlers/configure.handle";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import styles from "./EditLinks.module.scss";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { Storage } from "aws-amplify";
import { Button, Flex, Form, Input, Spin, Upload } from "antd";
import { useRouter } from "next/navigation";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import ImgCrop from "antd-img-crop";
import Header from "@/components/Header/Header";
import DeleteModal from "@/components/DeleteModal/DeleteModal";

interface LinkData {
  description: string;
  image: string;
  link: string;
  title: string;
  id: string;
  ctaButton?: {
    text: string;
    link: string;
    type: string;
    isActive: boolean;
  };
}

type EditLinks = {
  data: any;
};

function EditLinks({ data }: EditLinks) {
  const [editLinkData, setEditLinkData] = useState(data);
  const userDetail = useSelector((state: any) => state.auth);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };

  useEffect(() => {
    setEditLinkData(data);
    form.setFieldsValue({
      title: data?.title,
      description: data?.description,
    });
  }, [data]);

  const handleFileChange = async (info: any) => {
    setSpinner(true);
    try {
      const fileObj = info.file;
      if (!fileObj) {
        return;
      }

      const res = await Storage.put(
        `custom/${
          fileObj?.type.includes("image") ? "images" : "videos"
        }/${(fileObj?.name)
          .split(".")
          .slice(0, -1)
          .join("")}-${new Date().valueOf()}`,
        fileObj,
        {
          contentType: fileObj?.type,
          level: "public",
        }
      );
      setEditLinkData({
        ...editLinkData,
        image: res.key,
      });
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setSpinner(false);
    }
  };

  const updateLinkComponent = async () => {
    setLoading(true);
    try {
      if (editLinkData?.image === "") {
        showToast("Please upload image", "error");
        return;
      }
      // if (
      //   editLinkData?.linkType === "CUSTOM" &&
      //   (!editLinkData?.ctaButton?.text.length ||
      //     !editLinkData?.ctaButton?.link.length)
      // ) {
      //   return;
      // }
      if (
        editLinkData?.linkType === "CUSTOM" &&
        !editLinkData?.ctaButton?.link.length
      ) {
        return;
      }

      const linkData: LinkData = {
        description: editLinkData?.description || "",
        image: editLinkData?.image,
        link: editLinkData?.ctaLink,
        title: editLinkData?.title || "",
        id: editLinkData?.id,
      };
      if (editLinkData?.linkType === "CUSTOM") {
        linkData.ctaButton = {
          text: "",
          link: editLinkData?.ctaButton?.link,
          type: "LINK",
          isActive: true,
        };
      }
      const payload = linkData;

      await updateCustomLinks(payload);
      showToast("Data updated successfully!", "success");
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.userDetail?.id,
      });
      getSections(userDetail?.userDetail?.id);
      router.push("/configure/wall");
    } catch (error) {
      console.error("error:", error);
      showToast("Error occurred!", "error");
    } finally {
      setLoading(false);
    }
  };

  const archiveItem = async () => {
    try {
      const payload = {
        isArchived: true,
        id: editLinkData?.id,
      };

      setDeleteModal(false);
      await updateCustomLinks(payload);
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.userDetail?.id,
      });
      getSections(userDetail?.userDetail?.id);
      router.push("/configure/wall");
      showToast("Item deleted successfully!", "success");
    } catch (error) {
      console.error("error:", error);
      showToast("Error occurred!", "error");
    } finally {
    }
  };
  const removeImage = () => {
    setEditLinkData({
      ...editLinkData,
      image: "",
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditLinkData({
      ...editLinkData,
      [name]: value,
    });
  };

  return (
    <>
      <div className={`${styles.mainWrapper} pageWidth`}>
        <Header title="Edit Link" deleteModal setDeleteModal={setDeleteModal} />
        <div className={styles.formContainer}>
          <div className={styles.fetchedForm}>
            <Form
              form={form}
              layout="vertical"
              size="large"
              onFinish={updateLinkComponent}
              requiredMark={false}
              autoComplete="off"
            >
              <Flex vertical>
                <Form.Item valuePropName="fileList">
                  {!editLinkData?.image && (
                    <div className={styles.addWrapper}>
                      {spinner && <Spin className={styles.spinner} />}
                      {!spinner && (
                        <ImgCrop rotationSlider>
                          <Upload
                            customRequest={handleFileChange}
                            showUploadList={false}
                          >
                            <div className={styles.addThumbnail}>Add Image</div>
                          </Upload>
                        </ImgCrop>
                      )}
                    </div>
                  )}
                  {!!editLinkData?.image && (
                    <div
                      className={`${styles.uploadWrapper}  ${
                        !!editLinkData?.image ? styles.transitionEffect : ""
                      }`}
                    >
                      <div className={styles.imageContainer}>
                        {!spinner && (
                          <Image
                            src={
                              typeof editLinkData?.image === "string" &&
                              (editLinkData?.image.includes("https") ||
                                editLinkData?.image.includes("http"))
                                ? editLinkData?.image
                                : typeof editLinkData?.image === "string"
                                ? getPublicURL("public/" + editLinkData?.image)
                                : typeof editLinkData?.image === "object" &&
                                  editLinkData?.image instanceof Blob
                                ? URL.createObjectURL(editLinkData?.image)
                                : ""
                            }
                            alt="image"
                            width={100}
                            height={100}
                          />
                        )}
                        {!!spinner && <Spin className={styles.spinner} />}
                      </div>
                      <div className={`${styles.uploadActions} `}>
                        <div>
                          <ImgCrop>
                            <Upload
                              onChange={handleFileChange}
                              customRequest={handleFileChange}
                              showUploadList={false}
                            >
                              <span className={styles.updateHeader}>
                                Update Image
                              </span>
                            </Upload>
                          </ImgCrop>
                        </div>
                        <div
                          className={styles.removeHeader}
                          onClick={removeImage}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  )}
                </Form.Item>
                <Form.Item
                  name="title"
                  label={<span style={{ fontWeight: 600 }}>Title</span>}
                  style={{ marginBottom: "8px" }}
                  initialValue={editLinkData?.title}
                >
                  <Input
                    name="title"
                    placeholder="Add title here"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item
                  name="description"
                  label={<span style={{ fontWeight: 600 }}>Description</span>}
                  initialValue={editLinkData?.description}
                >
                  <Input
                    name="description"
                    placeholder="Add description here"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                {editLinkData?.linkType === "CUSTOM" && (
                  <div>
                    {/* <Form.Item
                      name="btnText"
                      label={
                        <span style={{ fontWeight: 600 }}>Button Text</span>
                      }
                      style={{ marginBottom: "8px" }}
                      rules={[
                        {
                          required: true,
                          message: "Please input button text!",
                        },
                      ]}
                      initialValue={editLinkData?.ctaButton?.text}
                    >
                      <Input
                        name="btnText"
                        placeholder="Add button text here"
                        onChange={(e) =>
                          setEditLinkData({
                            ...editLinkData,
                            ctaButton: {
                              ...editLinkData.ctaButton,
                              text: e.target.value,
                            },
                          })
                        }
                      />
                    </Form.Item> */}
                    <Form.Item
                      name="btnLink"
                      label={
                        <span style={{ fontWeight: 600 }}>Button Link</span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please input button link!",
                        },
                      ]}
                      initialValue={editLinkData.ctaButton.link}
                    >
                      <Input
                        name="btnLink"
                        placeholder="Add button text here"
                        onChange={(e) =>
                          setEditLinkData({
                            ...editLinkData,
                            ctaButton: {
                              ...editLinkData.ctaButton,
                              link: e.target.value,
                            },
                          })
                        }
                      />
                    </Form.Item>
                  </div>
                )}
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Save Changes
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
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
          deleteConfirmation={archiveItem}
        />
      )}
    </>
  );
}

export default transition(EditLinks);
