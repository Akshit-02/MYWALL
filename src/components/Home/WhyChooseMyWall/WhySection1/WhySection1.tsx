"use client";

import React from "react";
import styles from "./WhySection1.module.scss";
import dynamic from "next/dynamic";

// import Lottie from "lottie-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "../../../../../public/images/video/first-video.json";

const WhySection1 = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.content}>
            <h1> Create Your Own Store</h1>
            <p>
              Build your personalized online storefront with ease, allowing you
              to showcase and sell your products or services directly to your
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

export default WhySection1;
