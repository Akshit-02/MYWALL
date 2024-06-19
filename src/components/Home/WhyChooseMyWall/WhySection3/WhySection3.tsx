"use client";

import React from "react";
import styles from "./WhySection3.module.scss";
import dynamic from "next/dynamic";

// import Lottie from "lottie-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "../../../../../public/images/video/third-video.json";

const WhySection3 = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.content}>
            <h1> Craft Your Brand Portfolio</h1>
            <p>
              Curate and present your brand&apos;s story, values, and products
              in a compelling portfolio that resonates with your target
              audience.
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.lottieContainer} id="lottie-main-video">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySection3;
