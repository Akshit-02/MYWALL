"use client";

import React, { useRef } from "react";
import styles from "./Creator.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const Creator = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start 0.2", "end start"],
  });
  const reversedScale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const transformedTranslateY = useTransform(scrollYProgress, (latest) =>
    Math.min(Math.pow(latest, 3) * 2500, 250)
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Join The Squad</h1>
        <p>
          Join a community reshaping the digital landscape. Be part of the My
          Wall revolution.
        </p>
      </div>

      <motion.div
        ref={divRef}
        className={styles.creator}
        id="creator"
        style={{ scale: reversedScale, translateY: transformedTranslateY }}
      >
        <div ref={divRef} className={styles.creatorImg}>
          <div className={styles.creator1}>
            <Image
              src={"/images/creator/usCreator12.webp"}
              alt="creator"
              fill
              className={styles.creatorPic}
            />
          </div>
          <div className={styles.creator2}>
            <Image
              src={"/images/creator/usCreator1.webp"}
              alt="creator"
              fill
              className={styles.creatorPic}
            />
          </div>
          <div className={styles.creator3}>
            <Image
              src={"/images/creator/usCreator24.webp"}
              alt="creator"
              fill
              className={styles.creatorPic}
            />
          </div>
          <div className={styles.creator4}>
            <Image
              src={"/images/creator/usCreator27.webp"}
              alt="creator"
              fill
              className={styles.creatorPic}
            />
          </div>
          <div className={styles.creator5}>
            <Image
              src={"/images/creator/usCreator5.webp"}
              alt="creator"
              fill
              className={styles.creatorPic}
            />
          </div>
          <div className={styles.creator6}>
            <Image
              src={"/images/creator/usCreator14.webp"}
              alt="creator"
              fill
              className={styles.creatorPic}
            />
          </div>
          <div className={styles.creator7}>
            <Image
              src={"/images/creator/usCreator26.webp"}
              alt="creator"
              fill
              className={styles.creatorPic}
            />
          </div>
          <div className={styles.creator8}>
            <Image
              src={"/images/creator/usCreator10.webp"}
              alt="creator"
              fill
              className={styles.creatorPic}
            />
          </div>
          <div className={styles.creator10}>& more</div>
          <div className={styles.creator9}>
            <Image
              src={"/images/creator/usCreator3.webp"}
              alt="creator"
              fill
              className={styles.creatorPic}
            />
          </div>
        </div>
      </motion.div>
      <div className={styles.creatorsCountContainer}>
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.gridMatrixDiv} />
        <div className={styles.content}>
          Built to Empower Creators Across All Categories
        </div>
      </div>
    </div>
  );
};

export default Creator;
