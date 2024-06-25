"use client";
import styles from "./EditCTA.module.scss";
import React, { useState, useEffect } from "react";
import {
  updateFBVideo,
  updateYTVideo,
  updateIGVideo,
} from "@/store/sagas/handlers/configure.handle";
import { useDispatch, useSelector } from "react-redux";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { Button, Flex, Form, Input, Switch } from "antd";
import { useRouter } from "next/navigation";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import Header from "@/components/Header/Header";
import { convertToTitleCase } from "@/utils/helperFunction";

const EditCTA = ({ data, platform }: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userDetail = useSelector((state: any) => state.onboarding);
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const [formData, setFormData] = useState({
    btnText: "",
    btnLink: "",
    isActive: true,
    title: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setFormData({
      btnText: data?.ctaButton?.text,
      btnLink: data?.ctaButton?.link,
      isActive: data?.ctaButton?.isActive,
      title: data?.title,
    });
    form.setFieldsValue({
      btnText: data?.ctaButton?.text,
      btnLink: data?.ctaButton?.link,
      isActive: data?.ctaButton?.isActive,
      title: data?.title,
    });
  }, [data]);
  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };

  const save = async () => {
    setLoading(true);
    try {
      const payload = {
        id: data?.id,
        ctaButton: {
          text: formData.btnText,
          link: formData.btnLink,
          isActive: formData.isActive,
        },
        title: formData.title || "",
      };
      if (platform === "FACEBOOK") {
        await updateFBVideo(payload);
      } else if (platform === "INSTAGRAM") {
        await updateIGVideo(payload);
      } else if (platform === "YOUTUBE") {
        await updateYTVideo(payload);
      }
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail.onBoarding.id,
      });
      showToast("Data updated successfully!", "success");
      router.push("/configure/wall");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className={`${styles.container} pageWidth`}>
      <Header title={`Edit ${convertToTitleCase(platform)}`} />

      <div className={styles.formContainer}>
        <div className={styles.fetchedForm}>
          <Form
            form={form}
            layout="vertical"
            size="large"
            onFinish={save}
            requiredMark={false}
            autoComplete="off"
          >
            <Flex vertical>
              <Form.Item
                name="btnText"
                label={<span style={{ fontWeight: 600 }}>Button Text</span>}
                style={{ marginBottom: "8px" }}
                initialValue={formData.btnText}
              >
                <Input
                  name="btnText"
                  placeholder="Add button text here"
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                name="btnLink"
                label={<span style={{ fontWeight: 600 }}>Button Link</span>}
                initialValue={formData.btnLink}
                rules={[{ type: "url", message: "Please enter a valid link" }]}
              >
                <Input
                  name="btnLink"
                  placeholder="Add button link here"
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item name="isAcive" style={{ marginBottom: "8px" }}>
                <Flex gap="0.5rem">
                  <Switch
                    checked={formData?.isActive}
                    onChange={() => {
                      setFormData({
                        ...formData,
                        isActive: !formData?.isActive,
                      });
                    }}
                  />
                  <div className={styles.strong}>Show Button on Wall</div>
                </Flex>
              </Form.Item>
              <Form.Item
                name="title"
                label={<span style={{ fontWeight: 600 }}>Media Caption</span>}
                initialValue={formData.title}
              >
                <Input
                  name="title"
                  placeholder="Add media caption here"
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
              </Form.Item>
            </Flex>
          </Form>
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
  );
};

export default transition(EditCTA);
