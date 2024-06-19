"use client";

import React from "react";
import styles from "./WhySection2.module.scss";
import dynamic from "next/dynamic";

// import Lottie from "lottie-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "../../../../../public/images/video/second-video.json";

const WhySection2 = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.lottieContainer} id="lottie-main-video">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.content}>
            <h1>Grow Your Audience Across Platform</h1>
            <p>
              Leverage integrated social media tools and SEO optimization to
              reach new customers and expand your presence across multiple
              platforms effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySection2;
