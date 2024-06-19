"use client";

import React, { useEffect, useState } from "react";
import styles from "./StepsDesktop.module.scss";
import Image from "next/image";

const steps = [
  {
    title: "Step 1",
    description: "Signup with Gmail",
    imageSrc: "/images/webp/step1.webp",
  },
  {
    title: "Step 2",
    description: "Choose your username",
    imageSrc: "/images/webp/step2.webp",
  },
  {
    title: "Step 3",
    description: "Customize Your Wall",
    imageSrc: "/images/webp/step3.webp",
  },
  {
    title: "Step 4",
    description: "Link Social media profiles",
    imageSrc: "/images/webp/step4.webp",
  },
  {
    title: "Step 5",
    description: "Your Wall is Ready",
    imageSrc: "/images/webp/step5.webp",
  },
];

const StepsDesktop = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState("");

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection("right");
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection("left");
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const stepElement = document.getElementById("currentStep");
    if (stepElement) {
      stepElement.classList.remove(
        styles.slideInFromRight,
        styles.slideInFromLeft
      );

      void stepElement.offsetWidth;
      stepElement.classList.add(
        direction === "right" ? styles.slideInFromRight : styles.slideInFromLeft
      );
    }
  }, [currentStep, direction]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Look how simple it is</h1>
        <p>Create your wall in a few easy steps</p>
      </div>
      <div className={styles.stepContainer}>
        <div className={styles.stepsWrapper}>
          <div id="currentStep" className={styles.step}>
            <div className={styles.stepTitle}>
              <h4>{steps[currentStep].title}</h4>
              <p>{steps[currentStep].description}</p>
            </div>
            <div className={styles.stepImageWrapper}>
              <Image
                src={steps[currentStep].imageSrc}
                alt={steps[currentStep].title}
                fill
                className={styles.stepImage}
              />
            </div>
          </div>
        </div>
        <div className={styles.arrows}>
          <div
            className={styles.leftArrow}
            onClick={handlePrev}
            style={{ visibility: currentStep === 0 ? "hidden" : "visible" }}
          >
            <Image
              src={"/images/svg/left-arrow.svg"}
              alt="left-arrow"
              height={40}
              width={40}
              className={styles.arrow}
            />
          </div>
          <div
            className={styles.rightArrow}
            onClick={handleNext}
            style={{
              visibility:
                currentStep === steps.length - 1 ? "hidden" : "visible",
            }}
          >
            <Image
              src={"/images/svg/right-arrow.svg"}
              alt="right-arrow"
              height={40}
              width={40}
              className={styles.arrow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsDesktop;
