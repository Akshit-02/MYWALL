"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  scrapLinkData,
  createLinks,
  getSections,
} from "@/store/sagas/handlers/configure.handle";
import axios from "axios";
import styles from "./AddYTLinks.module.scss";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import dynamic from "next/dynamic";
import { Button, Divider, Flex, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import Header from "../../../components/Header/Header";
const ReactPlayer = dynamic(() => import("react-player"));

interface AddYTLinks {
  sectionId: string;
  subSectionId?: string;
}

function AddYTLinks({ sectionId, subSectionId }: AddYTLinks) {
  const { userDetail } = useSelector((state: any) => state.auth);
  const [linkInputs, setLinkInputs] = useState<string>("");
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [ytVideoId, setYTVideoId] = useState<string>("");
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    btnText: "Check it out",
    btnLink: "",
  });
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };
  const isURLAllowed = (url: string) => {
    const allowedDomainsRegex =
      /^(https?:\/\/)?(www\.)?(youtu\.be|youtube\.com|m\.youtube\.com)\/.*/;
    return allowedDomainsRegex.test(url);
  };

  const extractVideoIdFromUrl = async (url: string) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?t=\d*&(?:v=)?|shorts\/))([^&?#]+)/i;

    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return "";
    }
  };

  const urlStatusCheck = async (url: string) => {
    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        return "success";
      } else {
        return "failed";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const submitLink = async () => {
    try {
      if (!isURLAllowed(linkInputs)) {
        showToast("Please enter a valid youtube url!", "error");
        return;
      }
      setLoading(true);
      const res: any = await scrapLinkData(linkInputs);
      if (!!res) {
        setLoading(false);
        const data = res?.data?.getUrlMeta;
        const urlStatusRes = await urlStatusCheck(linkInputs);
        if (urlStatusRes === "failed") {
          showToast("Failed to fetch data!", "error");
          return;
        }
        setYTVideoId(await extractVideoIdFromUrl(linkInputs));
        setFormData((prevState) => ({
          ...prevState,
          title: data.title,
          description: data.description,
          btnLink: linkInputs,
          image: data.image,
        }));
        form.setFieldsValue({
          title: data.title,
          description: data.description,
          btnLink: linkInputs,
          btnText: "Check it out",
        });
        setFetched(true);
      } else {
        showToast("Failed to fetch data!", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const createLinkComponent = async () => {
    setSaveBtnLoading(true);
    try {
      if (!formData.btnText.length || !formData.btnLink.length) {
        return;
      }
      const linkdata = {
        description: formData.description,
        image: formData.image,
        link: linkInputs,
        linkType: "YTLINK",
        title: formData.title,
        secondaryLink: null,
        ctaButton: {
          text: formData.btnText,
          link: formData.btnLink,
          type: "LINK",
          isActive: true,
        },
      };

      const payload = {
        links: {
          links: [linkdata],
        },
        sectionId: sectionId,
        subSectionId,
      };

      await createLinks(payload);
      getSections(userDetail?.id);
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.id,
      });
      showToast("Youtube link added successfully", "success");
      router.push("/configure/wall");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
    } finally {
      setSaveBtnLoading(false);
    }
  };
  const handleLinkInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkInputs(event.target.value);
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

  return (
    <div className={`${styles.addYTLinksContainer} pageWidth`}>
      <Header title="Add Youtube Link" />
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
                <Flex justify="center">
                  <Form.Item>
                    <div className={styles.reactPlayerContainer}>
                      <ReactPlayer
                        url={`https://www.youtube.com/embed/${ytVideoId}`}
                        width={"320px"}
                        height={"340px"}
                        controls={false}
                        className={styles.reactPlayer}
                      />
                    </div>
                  </Form.Item>
                </Flex>
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
                  style={{ marginBottom: "8px" }}
                >
                  <Input
                    name="description"
                    placeholder="Add description here"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item
                  name="btnText"
                  label={<span style={{ fontWeight: 600 }}>Button Text</span>}
                  style={{ marginBottom: "8px" }}
                  rules={[
                    { required: true, message: "Please input button text!" },
                  ]}
                >
                  <Input
                    name="btnText"
                    placeholder="Add button text here"
                    value={formData.btnText}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item
                  name="btnLink"
                  label={<span style={{ fontWeight: 600 }}>Button Link</span>}
                  rules={[
                    { required: true, message: "Please input button link!" },
                  ]}
                >
                  <Input
                    name="btnLink"
                    placeholder="Add button link here"
                    value={formData.btnLink}
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
  );
}

export default transition(AddYTLinks);
