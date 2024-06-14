"use client";

import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProp {
  title: string;
  deleteModal?: boolean;
  setDeleteModal?: (value: boolean) => void;
}
const Header = ({ title, deleteModal, setDeleteModal }: HeaderProp) => {
  const router = useRouter();

  return (
    <div>
      <div className={styles.headerWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            alt="back"
            src={"/assets/svg/backArrow.svg"}
            height={24}
            width={24}
            className={styles.backIcon}
            onClick={() => router.back()}
          />
        </div>
        <div className={styles.headerTextWrapper}>
          <span className={styles.headerText}>{title}</span>
        </div>
        {deleteModal && setDeleteModal && (
          <div className={styles.imageWrapper}>
            <Image
              alt="back"
              src={"/assets/svg/delete.svg"}
              height={16}
              width={16}
              onClick={() => setDeleteModal(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
