"use client";

import React, { useEffect } from "react";
import { message } from "antd";

interface ToastProp {
  toastDisplay: string;
  toastMessage: string;
  toastType: string;
}

const Toast = ({ toastDisplay, toastMessage, toastType }: ToastProp) => {
  useEffect(() => {
    switch (toastType) {
      case "success":
        message.success(toastMessage);
        break;
      case "error":
        message.error(toastMessage);
        break;
      case "warning":
        message.warning(toastMessage);
        break;
      default:
        break;
    }
  }, [toastDisplay, toastMessage, toastType]);

  return null;
};

export default Toast;
