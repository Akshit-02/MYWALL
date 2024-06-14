"use client";

import React from "react";
import styles from "./PageNotFound.module.scss";
import Image from "next/image";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const router = useRouter();
  return (
    <div className={`${styles.container} screenWidth`}>
      <div className={styles.imageWrapper}>
        <Image
          height={400}
          width={400}
          className={styles.mywallIcon}
          alt="mywall"
          src="/assets/svg/404Error.svg"
        />
      </div>
      <div className={styles.textContainer}>
        <h3>Page Not Found</h3>
        <p>
          We apologise, but the page you are trying to access cannot be found.
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

export default PageNotFound;
