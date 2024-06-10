"use client";

import React, { useEffect } from "react";
import styles from "./TutorialsPage.module.scss";
import Navbar from "@/components/Home/Navbar/Navbar";
import dynamic from "next/dynamic";

const Template = dynamic(
  () => import("@/components/Tutorial/Template/Template"),
  { ssr: false }
);
const TutorialVideo = dynamic(
  () => import("@/components/Tutorial/TutorialVideo/TutorialVideo"),
  { ssr: false }
);
const Footer = dynamic(() => import("@/components/Home/Footer/Footer"), {
  ssr: false,
});

const page = () => {
  useEffect(() => {
    document.title = "MyWall - Tutorials";

    return () => {
      document.title = "MyWall";
    };
  }, []);
  return (
    <div className="home-container">
      <Navbar />

      <div className={styles.sections}>
        <TutorialVideo />
        <Template />
        <Footer />
      </div>
    </div>
  );
};

export default page;
