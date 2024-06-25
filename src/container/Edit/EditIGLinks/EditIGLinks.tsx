"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCustomLinks,
  getSections,
} from "@/store/sagas/handlers/configure.handle";
import styles from "./EditIGLinks.module.scss";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import transition from "@/components/Transition/Transition";
import { useRouter } from "next/navigation";
import { Button, Flex, Form, Input } from "antd";
import Toast from "@/components/Toast/Toast";
import Header from "@/components/Header/Header";
import IGPLayer from "@/components/IGPlayer/IGPLayer";
import DeleteModal from "@/components/DeleteModal/DeleteModal";

type EditIGLinksProp = {
  data: any;
};

function EditIGLinks({ data }: EditIGLinksProp) {
  const dispatch = useDispatch();
  const [editLinkData, setEditLinkData] = useState(data);
  const [loading, setLoading] = useState(false);
  const userDetail = useSelector((state: any) => state.auth);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  useEffect(() => {
    setEditLinkData(data);
  }, [data]);

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };
  const updateLinkComponent = async () => {
    setLoading(true);
    try {
      // if (
      //   !editLinkData?.ctaButton?.text.length ||
      //   !editLinkData?.ctaButton?.link.length
      // ) {
      //   return;
      // }

      const linkdata = {
        description: editLinkData?.description || "",
        image: "",
        link: editLinkData?.ctaLink,
        title: editLinkData?.title || "",
        id: editLinkData?.id,
        ctaButton: {
          text: "",
          link: editLinkData?.ctaButton?.link,
          type: "LINK",
          isActive: true,
        },
      };
      const payload = linkdata;
      await updateCustomLinks(payload);

      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.userDetail?.id,
      });
      showToast("Item updated successfully", "success");
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
                <Flex justify="center">
                  <Form.Item>
                    <IGPLayer url={editLinkData?.link} />
                  </Form.Item>
                </Flex>
                <Form.Item
                  name="title"
                  label={<span style={{ fontWeight: 600 }}>Title</span>}
                  style={{ marginBottom: "8px" }}
                  initialValue={editLinkData.title}
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
                  style={{ marginBottom: "8px" }}
                  initialValue={editLinkData.description}
                >
                  <Input
                    name="description"
                    placeholder="Add description here"
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
                  initialValue={editLinkData.ctaButton.text}
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
                  label={<span style={{ fontWeight: 600 }}>Button Link</span>}
                  rules={[
                    { required: true, message: "Please input button link!" },
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

export default transition(EditIGLinks);
