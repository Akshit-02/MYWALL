"use client";

import React from "react";
import styles from "./Template.module.scss";
import Image from "next/image";
import Link from "next/link";

const Template = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>MyWall Templates</h1>
      </div>
      <div className={styles.cardContainer}>
        <Link href={"https://mywall.me/allen_chaudhary"} target="_blank">
          <div className={styles.cardWrapper}>
            <div className={styles.card} style={{ backgroundColor: "#89DAFC" }}>
              <Image
                src="/images/png/template13.png"
                alt="template"
                height={800}
                width={250}
              />
            </div>
            <div className={styles.cardTitle}>Allen Choudhary</div>
          </div>
        </Link>
        <Link href={"https://mywall.me/amaya"} target="_blank">
          <div className={styles.cardWrapper}>
            <div className={styles.card} style={{ backgroundColor: "#7378FF" }}>
              <Image
                src="/images/png/template22.png"
                alt="template"
                height={800}
                width={250}
              />
            </div>
            <div className={styles.cardTitle}>Amaya Colon</div>
          </div>
        </Link>
        <Link href={"https://mywall.me/pankajverma"} target="_blank">
          <div className={styles.cardWrapper}>
            <div className={styles.card} style={{ backgroundColor: "#EC80D5" }}>
              <Image
                src="/images/png/template31.png"
                alt="template"
                height={800}
                width={250}
              />
            </div>
            <div className={styles.cardTitle}>Pankaj Verma</div>
          </div>
        </Link>
        <Link href={"https://mywall.me/amrutha"} target="_blank">
          <div className={styles.cardWrapper}>
            <div className={styles.card} style={{ backgroundColor: "#EE8888" }}>
              <Image
                src="/images/png/template41.png"
                alt="template"
                height={800}
                width={250}
              />
            </div>
            <div className={styles.cardTitle}>Amrutha Saju</div>
          </div>
        </Link>
        <Link href={"https://mywall.me/sandeepbaisoya"} target="_blank">
          <div className={styles.cardWrapper}>
            <div className={styles.card} style={{ backgroundColor: "#D9C08E" }}>
              <Image
                src="/images/png/template51.png"
                alt="template"
                height={800}
                width={250}
              />
            </div>
            <div className={styles.cardTitle}>Sandeep Baisoya</div>
          </div>
        </Link>
        <Link href={"https://mywall.me/mililakhmaniii"} target="_blank">
          <div className={styles.cardWrapper}>
            <div className={styles.card} style={{ backgroundColor: "#C4D778" }}>
              <Image
                src="/images/png/template61.png"
                alt="template"
                height={800}
                width={250}
              />
            </div>
            <div className={styles.cardTitle}>Mili Lakhmani</div>
          </div>
        </Link>
        <Link href={"https://mywall.me/azam"} target="_blank">
          <div className={styles.cardWrapper}>
            <div className={styles.card} style={{ backgroundColor: "#87D88F" }}>
              <Image
                src="/images/png/template71.png"
                alt="template"
                height={800}
                width={250}
              />
            </div>
            <div className={styles.cardTitle}>Mohd Azam</div>
          </div>
        </Link>
        <Link href={"https://mywall.me/kareena"} target="_blank">
          <div className={styles.cardWrapper}>
            <div className={styles.card} style={{ backgroundColor: "#89DAFC" }}>
              <Image
                src="/images/png/template81.png"
                alt="template"
                height={800}
                width={250}
              />
            </div>
            <div className={styles.cardTitle}>Kareena Tekwani</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Template;
