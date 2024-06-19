"use client";
import React from "react";
import styles from "./StepsMobile.module.scss";
import Image from "next/image";

const StepsMobile = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Look how simple it is</h1>
          <p>Create your wall in a few easy steps</p>
        </div>
        <div className={styles.steps}>
          <div className={styles.stepImageWrapper}>
            <Image
              src={"/images/webp/step1.webp"}
              alt="step1"
              fill
              className={styles.stepImage}
            />
          </div>
          <div className={styles.stepTitle}>
            <h4>Step 1</h4>
            <p>Signup with Gmail</p>
          </div>
        </div>
        <div className={styles.steps}>
          <div className={styles.stepImageWrapper}>
            <Image
              src={"/images/webp/step2.webp"}
              alt="step2"
              fill
              className={styles.stepImage}
            />
          </div>
          <div className={styles.stepTitle}>
            <h4>Step 2</h4>
            <p>Choose your username</p>
          </div>
        </div>
        <div className={styles.steps}>
          <div className={styles.stepImageWrapper}>
            <Image
              src={"/images/webp/step3.webp"}
              alt="step3"
              fill
              className={styles.stepImage}
            />
          </div>
          <div className={styles.stepTitle}>
            <h4>Step 3</h4>
            <p>Customise Your Wall</p>
          </div>
        </div>
        <div className={styles.steps}>
          <div className={styles.stepImageWrapper}>
            <Image
              src={"/images/webp/step4.webp"}
              alt="step4"
              fill
              className={styles.stepImage}
            />
          </div>
          <div className={styles.stepTitle}>
            <h4>Step 4</h4>
            <p> Link Social media profiles</p>
          </div>
        </div>
        <div className={styles.steps}>
          <div className={styles.stepImageWrapper}>
            <Image
              src={"/images/webp/step5.webp"}
              alt="step5"
              fill
              className={styles.stepImage}
            />
          </div>
          <div className={styles.stepTitle}>
            <h4>Step 5</h4>
            <p>Your Wall is Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsMobile;
