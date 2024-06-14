"use client";

import Link from "next/link";
import React from "react";
import styles from "./EmptyArrangeOrder.module.scss";
import Image from "next/image";
import transition from "../Transition/Transition";

interface EmptyArrangeOrderProps {
  subSectionId: string;
}
const EmptyArrangeOrder = ({ subSectionId }: EmptyArrangeOrderProps) => {
  return (
    <div>
      <Link
        href={{
          pathname: `/configure/sub-section/add/content/${encodeURI(
            subSectionId
          )}`,
        }}
      >
        <div className={styles.emptyState}>
          <Image
            className={styles.imgIcon}
            alt="img"
            src="/assets/svg/gallery.svg"
            height={64}
            width={64}
          />
          <p className={styles.message}>
            No data found. Click here to add data.
          </p>
        </div>
      </Link>
    </div>
  );
};

export default transition(EmptyArrangeOrder);
