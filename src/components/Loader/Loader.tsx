"use client";

import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoaderProp {
  text?: string;
}
export default function Loader({ text }: LoaderProp) {
  return (
    <div>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        fullscreen
        tip={<div>{text}</div>}
      />
    </div>
  );
}
