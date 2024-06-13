"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import styles from "./Video.module.scss";
import { Spin } from "antd";

interface VideoProp {
  url: string;
  thumbnailUrl?: string;
}
const Video = ({ url, thumbnailUrl }: VideoProp) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(true);

  // useEffect(() => {
  //   checkVisibility();
  // }, []);

  const checkVisibility = () => {
    if (!playerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.intersectionRatio <= 0) {
            setIsPlaying(false);
          }
        });
      },
      { threshold: [0] }
    );

    observer.observe(playerRef.current);

    return () => {
      if (playerRef.current) {
        observer.unobserve(playerRef.current);
      }
    };
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (showThumbnail) {
      setShowThumbnail(false);
    }
  };

  const handlePausePlay = () => {
    setIsPlaying(!isPlaying);
  };
  const handleMuteUnmute = () => {
    setIsMute(!isMute);
  };

  return (
    <div>
      {!!url && (
        <div ref={playerRef} className={styles.reactPlayerContainer}>
          <ReactPlayer
            width="100%"
            height="100%"
            url={url}
            playing={isPlaying}
            muted={isMute}
            controls={false}
            loop={true}
            playsinline
            fallback={
              <div className={styles.fallback}>
                <Spin />
              </div>
            }
          />
          {/* <div className={styles.options}>
            <div className={styles.pausePlay} onClick={handlePausePlay}>
              <Image
                src={
                  isPlaying ? "/assets/svg/pause.svg" : "/assets/svg/play.svg"
                }
                alt="play"
                width={16}
                height={16}
              />
            </div>
            <div className={styles.muteUnmute} onClick={handleMuteUnmute}>
              <Image
                src={isMute ? "/assets/svg/mute.svg" : "/assets/svg/unmute.svg"}
                alt="play"
                width={24}
                height={24}
              />
            </div>
          </div> */}
          {/* {showThumbnail && thumbnailUrl && (
            <div className={styles.overlayContainer}>
              <Image
                src={thumbnailUrl}
                alt="play"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "white",
                  objectFit: "cover",
                }}
                width={70}
                height={70}
              />
            </div>
          )} */}
        </div>
      )}

      {!!!url && <div>Failed to load video</div>}
    </div>
  );
};

export default Video;
