"use client";

import React, { useEffect } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

type DeleteModal = {
  text: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteConfirmation: () => void;
};

const DeleteModal = ({ text, closeModal, deleteConfirmation }: DeleteModal) => {
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: `Delete Confirmation`,
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete this ${text}? This action cannot be undone.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No, Canel",
      autoFocusButton: null,
      onOk() {
        deleteConfirmation();
        closeModal(false);
      },
      onCancel() {
        closeModal(false);
      },
    });
  };
  useEffect(() => {
    showDeleteConfirm();
  });
  return <div></div>;
};

export default DeleteModal;
