"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSubSections,
  deleteSubSections,
} from "@/store/sagas/handlers/configure.handle";
import styles from "./EditComponent.module.scss";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import { Button, Flex, Form, Input, Switch } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubSection } from "@/app/configure/sub-section/edit/[subSectionId]/page";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import Header from "@/components/Header/Header";
import DeleteModal from "@/components/DeleteModal/DeleteModal";

type EditSubSection = {
  data: SubSection;
};

function EditComponent({ data }: EditSubSection) {
  const userDetail = useSelector((state: any) => state.onboarding);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editData, setEditData] = useState(data);
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };
  const handleCheckboxChange = () => {
    setEditData((prevState) => ({
      ...prevState,
      enabled: !prevState.enabled,
    }));
  };

  const submitSection = async () => {
    setLoading(true);
    try {
      const payload = {
        enabled: editData?.enabled,
        title: editData?.title,
        id: editData?.id,
      };
      await updateSubSections(payload);
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.onBoarding?.id,
      });
      showToast("Sub-section edited successfully!", "success");
      router.push("/configure/wall");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteSubSection = async () => {
    try {
      if (editData?.id !== "") {
        await deleteSubSections(editData?.id as string);
      }

      setDeleteModal(false);
      showToast("Sub-section deleted successfully!", "success");
      dispatch({
        type: configureSagaActions.SET_SECTIONS,
        payload: userDetail?.onBoarding?.id,
      });
      router.push("/configure/wall");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setEditData((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      return newState;
    });
  };
  return (
    <>
      <div className={`${styles.editComponentContainer} pageWidth`}>
        <Header
          title="Edit Component"
          deleteModal
          setDeleteModal={setDeleteModal}
        />
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
                label={<span style={{ fontWeight: 600 }}>Title</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input the section title!",
                  },
                ]}
                initialValue={editData?.title}
              >
                <Input
                  name="title"
                  placeholder="Enter section title here"
                  value={editData?.title}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item name="isAcive">
                <Flex gap="0.5rem">
                  <Switch
                    checked={editData?.enabled}
                    onChange={handleCheckboxChange}
                  />
                  <div className={styles.strong}>Show on Wall</div>
                </Flex>
              </Form.Item>
              <Link
                href={{
                  pathname: `/configure/sub-section/edit/content/${encodeURI(
                    editData?.id
                  )}`,
                }}
              >
                <Button type="primary" size={"large"}>
                  Edit Content
                </Button>
              </Link>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ marginTop: "12px" }}
                >
                  Save Changes
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
      {deleteModal && (
        <DeleteModal
          text={"SubSection"}
          closeModal={setDeleteModal}
          deleteConfirmation={deleteSubSection}
        />
      )}
    </>
  );
}

export default transition(EditComponent);
