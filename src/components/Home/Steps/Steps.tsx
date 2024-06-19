"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Steps.module.scss";
import { motion, useScroll, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const Steps = () => {
  const ref = useRef(null);
  const [currentStep, setCurrentStep] = useState<number | null>(1);
  const scoll = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const [ref1, inView1] = useInView({ threshold: 0.3 });
  const [ref2, inView2] = useInView({ threshold: 0.3 });
  const [ref3, inView3] = useInView({ threshold: 0.3 });
  const [ref4, inView4] = useInView({ threshold: 0.3 });
  const [ref5, inView5] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView1) setCurrentStep(1);
  }, [inView1]);

  useEffect(() => {
    if (inView2) setCurrentStep(2);
  }, [inView2]);

  useEffect(() => {
    if (inView3) setCurrentStep(3);
  }, [inView3]);

  useEffect(() => {
    if (inView4) setCurrentStep(4);
  }, [inView4]);

  useEffect(() => {
    if (inView5) setCurrentStep(5);
  }, [inView5]);

  const imageVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Look how simple it is</h1>
          <p>Create your wall in a few easy steps</p>
        </div>
        <div className={styles.steps}>
          <div className={styles.left}>
            <motion.div
              ref={ref1}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView1 ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              className={styles.step}
            >
              <h4>Step 1</h4>
              <p>Signup with Gmail</p>
            </motion.div>
            <motion.div
              ref={ref2}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView2 ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className={styles.step}
            >
              <h4>Step 2</h4>
              <p>Choose your username</p>
            </motion.div>
            <motion.div
              ref={ref3}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView3 ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className={styles.step}
            >
              <h4>Step 3</h4>
              <p>Customise Your Wall</p>
            </motion.div>
            <motion.div
              ref={ref4}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView4 ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className={styles.step}
            >
              <h4>Step 4</h4>
              <p> Link Social media profiles</p>
            </motion.div>
            <motion.div
              ref={ref5}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView5 ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className={styles.step}
            >
              <h4>Step 5</h4>
              <p>Your Wall is Ready</p>
            </motion.div>
          </div>
          <div className={styles.right}>
            <div className={styles.mockScreen}>
              <div className={styles.mobile}>
                <div className={styles.mobileBackground}>
                  {currentStep === 1 && (
                    // <motion.div
                    //   initial="hidden"
                    //   animate="visible"
                    //   variants={imageVariants}
                    // >
                    <Image
                      src="/images/webp/step1.webp"
                      alt="step1"
                      fill
                      // width={100}
                      // height={100}
                      className={styles.stepImage}
                    />
                    // </motion.div>
                  )}
                  {currentStep === 2 && (
                    // <motion.div
                    //   initial="hidden"
                    //   animate="visible"
                    //   variants={imageVariants}
                    // >
                    <Image
                      src="/images/webp/step2.webp"
                      alt="step2"
                      fill
                      // width={100}
                      // height={100}
                      className={styles.stepImage}
                    />
                    // </motion.div>
                  )}
                  {currentStep === 3 && (
                    // <motion.div
                    //   initial="hidden"
                    //   animate="visible"
                    //   variants={imageVariants}
                    // >
                    <Image
                      src="/images/webp/step3.webp"
                      alt="step3"
                      fill
                      // width={100}
                      // height={100}
                      className={styles.stepImage}
                    />
                    // </motion.div>
                  )}
                  {currentStep === 4 && (
                    // <motion.div
                    //   initial="hidden"
                    //   animate="visible"
                    //   variants={imageVariants}
                    // >
                    <Image
                      src="/images/webp/step4.webp"
                      alt="step4"
                      fill
                      // width={100}
                      // height={100}
                      className={styles.stepImage}
                    />
                    // </motion.div>
                  )}
                  {currentStep === 5 && (
                    // <motion.div
                    //   initial="hidden"
                    //   animate="visible"
                    //   variants={imageVariants}
                    // >
                    <Image
                      src="/images/webp/step5.webp"
                      alt="step5"
                      fill
                      // width={100}
                      // height={100}
                      className={styles.stepImage}
                    />
                    // </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
