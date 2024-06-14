"use client";

import React from "react";
import styles from "./PageLoader.module.scss";
import Image from "next/image";

const PageLoader = () => {
  return (
    <div className={styles.pageLoaderComponent}>
      <div className={styles.logo}>
        <Image
          height={80}
          width={80}
          src="/assets/svg/mywallLoaderLogo.svg"
          alt="page-loader"
        />
      </div>
    </div>
  );
};

export default PageLoader;
