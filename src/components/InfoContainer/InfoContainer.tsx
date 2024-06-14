"use client";

import React from "react";
import { Modal } from "antd";

interface DataProps {
  title: string;
  description: string;
  isOpen: boolean;
}
interface InfoContainerProps {
  modalData: DataProps;
  setModalData: React.Dispatch<React.SetStateAction<DataProps>>;
}
const InfoContainer = ({ modalData, setModalData }: InfoContainerProps) => {
  return (
    <div>
      <Modal
        footer={null}
        centered
        title={modalData.title}
        open={modalData.isOpen}
        onCancel={() => setModalData({ ...modalData, isOpen: false })}
      >
        <p>{modalData.description}</p>
      </Modal>
    </div>
  );
};

export default InfoContainer;
