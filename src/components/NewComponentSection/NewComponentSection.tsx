"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./NewComponentSection.module.scss";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";

interface Props {
  sectionId: string;
}

const NewComponentSection = ({ sectionId }: Props) => {
  return (
    <div>
      <div className={styles.addNewComponent}>
        <div className={styles.header}>New Component</div>
        <Link
          href={{
            pathname: `/configure/sub-section/add/${encodeURI(sectionId)}`,
          }}
          onClick={handleBeforeUnload}
        >
          <div className={styles.newComponent}>
            <div className={styles.iconsContainer}>
              <div className={styles.emptyState}>
                <Image
                  className={styles.imgIcon}
                  alt="img"
                  src="/assets/svg/photo.svg"
                  height={32}
                  width={32}
                />
              </div>
              <div className={styles.emptyState}>
                <Image
                  className={styles.imgIcon}
                  alt="img"
                  src="/assets/svg/yt2.svg"
                  height={32}
                  width={32}
                />
              </div>
              <div className={styles.emptyState}>
                <Image
                  className={styles.imgIcon}
                  alt="img"
                  src="/assets/svg/reels.svg"
                  height={32}
                  width={32}
                />
              </div>
              <div className={styles.emptyState}>
                <Image
                  className={styles.imgIcon}
                  alt="img"
                  src="/assets/svg/links.svg"
                  height={28}
                  width={28}
                />
              </div>
            </div>
            <div className={styles.addText}> Add New Component</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NewComponentSection;
