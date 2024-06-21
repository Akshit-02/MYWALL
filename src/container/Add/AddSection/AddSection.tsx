"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSections,
  editSection,
} from "@/store/sagas/handlers/configure.handle";
import styles from "./AddSection.module.scss";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { useRouter } from "next/navigation";
import { Button, Flex, Form, Input, Switch } from "antd";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import Header from "@/components/Header/Header";

type Section = {
  isArchived?: boolean;
  id?: string;
  title?: string;
  position?: number | null;
};

type AddSection = {
  section: Section;
};

function AddSection({ section }: AddSection) {
  const { userDetail } = useSelector((state: any) => state.auth);
  const [isToggled, toggle] = useState(!section?.isArchived);
  const [sectionData, setSection] = useState<Section>(section || {});
  const [loading, setLoading] = useState(false);
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

  const submitSection = async () => {
    setLoading(true);
    try {
      if (!sectionData?.id) {
        const payload = {
          section: {
            isArchived: !isToggled,
            title: sectionData?.title,
            position: 99,
          },
          id: userDetail?.id,
        };
        await createSections(payload);
      } else {
        const payload = {
          section: {
            isArchived: !isToggled,
            title: sectionData?.title,
            position: section?.position,
            id: sectionData?.id,
          },
          id: userDetail?.id,
        };
        await editSection(payload);
      }

      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.id,
      });
      showToast("Section added successfully!", "success");
      router.push("/configure/wall");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={`${styles.addSectionContainer} pageWidth`}>
        <Header title="Add New Section" />
        <div className={styles.formContainer}>
          <Form
            layout="vertical"
            size="large"
            onFinish={submitSection}
            requiredMark={false}
            autoComplete="off"
          >
            <Flex vertical>
              <Form.Item
                name="title"
                label={<span style={{ fontWeight: 600 }}>Section Title</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input the section title!",
                  },
                ]}
                initialValue={sectionData?.title}
              >
                <Input
                  name="title"
                  placeholder="Enter section title here"
                  value={sectionData?.title || ""}
                  onChange={(e) => {
                    setSection((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                />
              </Form.Item>
              <Form.Item name="isAcive">
                <Flex gap="0.5rem">
                  <Switch
                    checked={isToggled}
                    onChange={() => {
                      toggle(!isToggled);
                    }}
                  />
                  <div className={styles.strong}>Show on Wall</div>
                </Flex>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Done
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </div>

        {toast.toastDisplay && (
          <Toast
            toastDisplay={toast.toastDisplay}
            toastMessage={toast.toastMessage}
            toastType={toast.toastType}
          />
        )}
      </div>
    </div>
  );
}

export default transition(AddSection);
