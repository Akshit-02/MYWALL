"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  scrapLinkData,
  createLinks,
  getSections,
} from "@/store/sagas/handlers/configure.handle";
import styles from "./AddIGLinks.module.scss";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { Button, Divider, Flex, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import Header from "../../../components/Header/Header";
import IGPLayer from "../../../components/IGPlayer/IGPLayer";

interface AddIGLinks {
  sectionId: string;
  subSectionId?: string;
}

function AddIGLinks({ sectionId, subSectionId }: AddIGLinks) {
  const { userDetail } = useSelector((state: any) => state.auth);
  const [linkInputs, setLinkInputs] = useState<string>("");
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
      /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\/.*/;
    return allowedDomainsRegex.test(url);
  };

  function extractTextInQuotes(inputString: string) {
    const regex = /"([^"]+)"/;
    const match = regex.exec(inputString);
    if (match && match.length > 1) {
      return match[1];
    } else {
      return "";
    }
  }

  const submitLink = async () => {
    try {
      if (!isURLAllowed(linkInputs)) {
        showToast("Please enter a valid instagram url!", "error");
        return;
      }
      setLoading(true);
      const res: any = await scrapLinkData(linkInputs);

      if (!!res) {
        setLoading(false);
        const data = res?.data?.getUrlMeta;
        const extractedText = extractTextInQuotes(data.description);
        setFormData((prevState) => ({
          ...prevState,
          title: data.title,
          description: `${extractedText}`,
          image: data.image,
          btnLink: linkInputs,
        }));
        form.setFieldsValue({
          title: data.title,
          description: `${extractedText}`,
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
        image: "",
        link: linkInputs,
        linkType: "IGLINK",
        title: formData.title,
        secondaryLink: null,
        ctaButton: {
          // text: formData.btnText,
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
      showToast("Instagram link added successfully", "success");
      router.push("/configure/wall");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
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
      <Header title="Add Instagram Link" />
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
                    <IGPLayer url={linkInputs} />
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
                {/* <Form.Item
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
                </Form.Item> */}
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

export default transition(AddIGLinks);
