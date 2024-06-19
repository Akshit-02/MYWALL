"use client";

import React from "react";
import styles from "./WhySection4.module.scss";
import dynamic from "next/dynamic";

// import Lottie from "lottie-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "../../../../../public/images/video/fourth-video.json";

const WhySection4 = () => {
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
            <h1>All Your Insights At One Place</h1>
            <p>
              Access comprehensive analytics and insights about your sales,
              customer behavior, and more from a single dashboard to make
              informed business decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySection4;
