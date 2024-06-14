"use client";

import React, { useEffect, useState } from "react";
import styles from "./TutorialVideo.module.scss";
import Image from "next/image";
import { data } from "./data";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"));

const TutorialVideo = () => {
  const [videoData, setVideoData] = useState(data[0]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const extractVideoIdFromUrl = (url: string) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?t=\d*&(?:v=)?|shorts\/))([^&?#]+)/i;

    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      return "";
    }
  };

  useEffect(() => {
    setFadeIn(true);
  }, [videoData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Video Tutorials</h1>
      </div>
      <div className={styles.tutorialContainer}>
        <div className={styles.tutorialWrapper}>
          <div
            className={`${styles.videoContainer} ${
              fadeIn ? styles.fadeIn : ""
            }`}
          >
            <ReactPlayer
              url={`https://www.youtube.com/embed/${extractVideoIdFromUrl(
                videoData.url
              )}`}
              controls
              className={styles.reactPlayer}
            />
          </div>
          <div className={styles.videoContent}>
            <h3>{videoData.title}</h3>
            <p>{videoData.description}</p>
          </div>
        </div>
        <div className={styles.tutorialList}>
          <div
            className={styles.listHeader}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <h3 className={styles.listTitle}>More Videos</h3>
            <Image
              src={"/images/svg/chevron.svg"}
              height={8}
              width={15}
              alt="chevron"
              className={`${styles.chevron} ${
                isCollapsed ? styles.rotateDown : styles.rotateUp
              }`}
            />
          </div>
          {data?.map((item: any, index) => (
            <div
              key={index}
              className={`${styles.listContent} ${
                isCollapsed ? styles.collapsed : ""
              } ${item === videoData ? styles.selected : ""}`}
              onClick={() => {
                setFadeIn(false);
                setVideoData(item);
              }}
            >
              <div className={styles.listImage}>
                <Image
                  src={item.thumbnail}
                  alt="Thumbnail"
                  width={130}
                  height={80}
                />
              </div>
              <div className={styles.description}>
                <h4>{item.title}</h4>
                <p>{item.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialVideo;
