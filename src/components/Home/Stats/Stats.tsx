"use client";

import React from "react";
import styles from "./Stats.module.scss";
import Image from "next/image";

const Stats = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Stats To Prove It</h1>
          <p>
            Dive into our success stories with hard-hitting stats. Real impact,
            quantified.
          </p>
        </div>
        <div className={styles.cards}>
          <div className={styles.row1}>
            <div className={styles.card1}>
              <div className={styles.left}>
                <h3 className={styles.bigHead}>10k</h3>
                <p className={styles.subHead}>Monthly clicks generated</p>
              </div>
              <div className={styles.right}>
                <Image
                  src={"/images/webp/clicks-driven.webp"}
                  alt="clicks-driven"
                  height={200}
                  width={150}
                  // loading="lazy"
                  priority={true}
                />
              </div>
            </div>
            <div className={styles.card2}>
              <div className={styles.left}>
                <h3 className={styles.bigHead}>10,000</h3>
                <p className={styles.subHead}>
                  Active profiles hosted on our platform
                </p>
              </div>
              <div className={styles.right}>
                <Image
                  src={"/images/webp/mic.webp"}
                  alt="mic"
                  height={220}
                  width={150}
                  // loading="lazy"
                  priority={true}
                />
              </div>
            </div>
          </div>
          <div className={styles.row2}>
            <div className={styles.card3}>
              <div className={styles.left2}>
                <h3 className={styles.bigHead}>45%</h3>
                <p className={styles.subHead}> More brand collaboration</p>
              </div>
              <div className={styles.right}>
                <Image
                  src={"/images/webp/more-brand-collaboration.webp"}
                  alt="collaboration"
                  height={180}
                  width={170}
                  // loading="lazy"
                  priority={true}
                />
              </div>
            </div>
            <div className={styles.card4}>
              <div className={styles.left2}>
                <h3 className={styles.bigHead}>15%</h3>
                <p className={styles.subHead}>Conversion rate on clicks</p>
              </div>
              <div className={styles.right}>
                <Image
                  src={"/images/webp/more-audience-redirected.webp"}
                  alt="audience-redirected"
                  height={190}
                  width={170}
                  // loading="lazy"
                  priority={true}
                />
              </div>
            </div>
            <div className={styles.card5}>
              <div className={styles.left2}>
                <h3 className={styles.bigHead}>150</h3>
                <p className={styles.subHead}>Countries</p>
              </div>
              <div className={styles.right}>
                <Image
                  src={"/images/webp/more-affiliate-commission.webp"}
                  alt="affiliate-commission"
                  height={200}
                  width={160}
                  // loading="lazy"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
