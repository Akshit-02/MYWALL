"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./YoutubeVideoPlayer.module.scss";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"));
interface Props {
  videoId: string;
  thumbnailUrl?: string;
}
const YoutubeVideoPlayer = ({ videoId, thumbnailUrl }: Props) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
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

    if (playerRef.current) {
      observer.observe(playerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [videoId]);

  return (
    <div ref={playerRef} className={styles.playerContainer}>
      <div className={styles.reactPlayerContainer}>
        <ReactPlayer
          url={`https://www.youtube.com/embed/${videoId}`}
          width={"100%"}
          height={"100%"}
          controls={false}
          playing={isPlaying}
          className={styles.reactPlayer}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default YoutubeVideoPlayer;
