"use client";

import React from "react";
import styles from "./UserNotFound.module.scss";
import Image from "next/image";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const UserNotFound = () => {
  const router = useRouter();
  return (
    <div className={`${styles.container} screenWidth`}>
      <div className={styles.imageWrapper}>
        <Image
          height={400}
          width={400}
          className={styles.mywallIcon}
          alt="mywall"
          src="/assets/svg/noData.svg"
        />
      </div>
      <div className={styles.textContainer}>
        <h3>User Not Found</h3>
        <p>
          We're unable to display the user profile. It might have been removed
          or the link is incorrect.
        </p>
      </div>

      <div>
        <Button
          type="primary"
          size="large"
          onClick={() => router.push("/")}
          className={styles.goHomeButton}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default UserNotFound;
