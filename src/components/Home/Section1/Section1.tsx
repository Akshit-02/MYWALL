"use client";

import React from "react";
import styles from "./Section1.module.scss";
import Link from "next/link";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "../../../../public/images/video/Hero B.json";
import { scrollToSection } from "@/utils/helperFunction";

const Section1 = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.content}>
            <h1> Share Smarter, Influence Stronger! </h1>
            <p>
              Elevate your online world with My Wall, the link in bio tool that
              turns your story into a vast, vibrant space. Make it all yours,
              and make it shine!
            </p>
            <div>
              <button
                // href="/contact-us"
                // href="/register"
                className={styles.signUpBtn}
                onClick={scrollToSection}
              >
                Contact Us!
                <span>
                  <Image
                    src={"/images/svg/arrow.svg"}
                    height={12}
                    width={12}
                    alt="arrow"
                    className={styles.arrow}
                  />
                </span>
              </button>
            </div>
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

export default Section1;
