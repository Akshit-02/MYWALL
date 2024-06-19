"use client";
import React, { useEffect, useState } from "react";
import styles from "./Walls.module.scss";

const Walls = () => {
  // const [isIntersecting, setIsIntersecting] = useState(false);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.1,
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setIsIntersecting(true);
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   }, options);

  //   const target = document.querySelector(`.${styles.container}`);
  //   if (target) {
  //     observer.observe(target);
  //   }

  //   return () => {
  //     if (target) {
  //       observer.unobserve(target);
  //     }
  //   };
  // }, []);
  return (
    <div
      // className={`${styles.container} ${isIntersecting ? styles.lazyload : ""}`}
      className={styles.container}
    ></div>
  );
};

export default Walls;
