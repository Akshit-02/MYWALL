"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  scrapLinkData,
  createLinks,
  getSections,
} from "@/store/sagas/handlers/configure.handle";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import styles from "./AddLinks.module.scss";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { Storage } from "aws-amplify";
import { useRouter } from "next/navigation";
import { Button, Divider, Flex, Form, Input, Spin, Upload } from "antd";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import ImgCrop from "antd-img-crop";
import Header from "../../../components/Header/Header";

type AddLinks = {
  sectionId: string;
  subSectionId?: string;
};

function AddLinks({ sectionId, subSectionId }: AddLinks) {
  const { userDetail } = useSelector((state: any) => state.auth);
  const [isToggled, toggle] = useState(true);
  const [playStoreLink, setPlayStoreLink] = useState("");
  const [appStoreLink, setAppStoreLink] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState<boolean>(false);
  const [spinner, setSpinner] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLinkInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAffiliateLink(event.target.value);
  };

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };
  const submitLink = async () => {
    try {
      setLoading(true);
      const res = await scrapLinkData(
        isToggled
          ? affiliateLink
          : !!playStoreLink.length
          ? playStoreLink
          : appStoreLink
      );
      if (!!res) {
        setLoading(false);
        const data = (res as any)?.data?.getUrlMeta;
        storeImageToS3(data.image);
        setFormData((prevState) => ({
          ...prevState,
          title: data.title,
          description: data.description,
        }));
        form.setFieldsValue({
          title: data.title,
          description: data.description,
        });
        setFetched(true);
      } else {
        showToast("Failed to fetch data!", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const storeImageToS3 = async (url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }

      const blob = await response.blob();

      const file = new File([blob], `${new Date().valueOf()}`, {
        type: "jpg",
      });
      const res = await Storage.put(`custom/images/${file?.name}`, file, {
        contentType: file?.type,
        level: "public",
      });

      setFormData((prevState) => ({
        ...prevState,
        image: res.key,
      }));

      return file;
    } catch (error) {
      return null;
    }
  };

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
      setFormData((prevState) => ({
        ...prevState,
        image: res.key,
      }));
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setSpinner(false);
    }
  };

  const createLinkComponent = async () => {
    setSaveBtnLoading(true);
    try {
      if (formData.image === "") {
        showToast("Please upload image", "error");
        return;
      }
      const linkdata = {
        description: formData.description,
        image: formData.image,
        link: isToggled
          ? affiliateLink
          : !!playStoreLink.length
          ? playStoreLink
          : appStoreLink,
        linkType: "APP",
        position: 0,
        playStoreLink:
          !isToggled && !!playStoreLink.length ? playStoreLink : null,
        appStoreLink: !isToggled && !!appStoreLink.length ? appStoreLink : null,
        isAffiliate: isToggled,
        title: formData.title,
      };

      const payload = {
        links: { links: [linkdata] },
        sectionId: sectionId,
        subSectionId,
      };

      await createLinks(payload);
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.id,
      });
      getSections(userDetail?.id);
      showToast("App link added successfully", "success");
      router.push("/configure/wall");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occurred!", "error");
    } finally {
      setSaveBtnLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      return newState;
    });
  };
  const removeImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      image: "",
    }));
  };

  return (
    <>
      <div className={`${styles.addLinksConatiner} pageWidth`}>
        <Header title="Add App Link" />
        <div className={styles.formContainer}>
          <div className={styles.linkForm}>
            <Form
              layout="vertical"
              size="large"
              onFinish={submitLink}
              requiredMark={false}
              autoComplete="off"
            >
              <Flex vertical>
                <Form.Item
                  name="addLink"
                  label={<span style={{ fontWeight: 600 }}>Add Links</span>}
                  rules={[
                    { required: true, message: "Please input a link!" },
                    {
                      type: "url",
                      message: "Please enter a valid URL",
                    },
                  ]}
                >
                  <Input
                    name="addLink"
                    placeholder="Paste any link here"
                    onChange={handleLinkInputChange}
                  />
                </Form.Item>
                <Form.Item style={{ margin: 0 }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Link Preview
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
          </div>
          {fetched && (
            <div className={styles.fetchedForm}>
              <Divider className={styles.divider} />
              <Form
                form={form}
                layout="vertical"
                size="large"
                onFinish={createLinkComponent}
                requiredMark={false}
                autoComplete="off"
              >
                <Flex vertical>
                  <Form.Item valuePropName="fileList">
                    {!formData.image && (
                      <div className={styles.addWrapper}>
                        {spinner && <Spin className={styles.spinner} />}
                        {!spinner && (
                          <ImgCrop rotationSlider>
                            <Upload
                              customRequest={handleFileChange}
                              showUploadList={false}
                            >
                              <div className={styles.addThumbnail}>
                                Add Image
                              </div>
                            </Upload>
                          </ImgCrop>
                        )}
                      </div>
                    )}
                    {!!formData.image && (
                      <div
                        className={`${styles.uploadWrapper}  ${
                          !!formData.image ? styles.transitionEffect : ""
                        }`}
                      >
                        <div className={styles.imageContainer}>
                          {!spinner && (
                            <Image
                              src={getPublicURL("public/" + formData.image)}
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
                  >
                    <Input
                      name="title"
                      placeholder="Add title here"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label={<span style={{ fontWeight: 600 }}>Description</span>}
                  >
                    <Input
                      name="description"
                      placeholder="Add description here"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={saveBtnLoading}
                    >
                      Save Changes
                    </Button>
                  </Form.Item>
                </Flex>
              </Form>
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

export default transition(AddLinks);
