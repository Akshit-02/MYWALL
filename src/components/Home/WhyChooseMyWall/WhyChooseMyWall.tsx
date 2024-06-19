"use client";

import React from "react";
import styles from "./WhyChooseMyWall.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { scrollToSection } from "@/utils/helperFunction";

const WhySection1 = dynamic(() => import("./WhySection1/WhySection1"), {
  ssr: false,
});
const WhySection2 = dynamic(() => import("./WhySection2/WhySection2"), {
  ssr: false,
});
const WhySection3 = dynamic(() => import("./WhySection3/WhySection3"), {
  ssr: false,
});
const WhySection4 = dynamic(() => import("./WhySection4/WhySection4"), {
  ssr: false,
});

const WhyChooseMyWall = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Why Choose My Wall?</h2>
        </div>
        <div className={styles.whySections}>
          <WhySection1 />
          <WhySection2 />
          <WhySection3 />
          <WhySection4 />
        </div>
        <div className={styles.getStarted}>
          <button
            // href="/contact-us"
            // href={"/register"}
            className={styles.signUpBtn}
            // prefetch={false}
            onClick={scrollToSection}
          >
            Get Started Now!
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
  );
};

export default WhyChooseMyWall;
