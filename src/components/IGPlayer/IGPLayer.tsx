"use client";

import React from "react";
import styles from "./IGPlayer.module.scss";

interface IGPLayerProps {
  url: string;
}
const IGPLayer = ({ url }: IGPLayerProps) => {
  const extractInstagramReelId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)?(?:[^/]+\/)?(?:reel|p)\/([^/?#&]+)/i;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  return (
    <div>
      <div className={styles.player}>
        <iframe
          scrolling="no"
          title="video-tag"
          src={`https://www.instagram.com/reel/${extractInstagramReelId(
            url
          )}/embed`}
          frameBorder="0"
          loading="lazy"
          className={styles.playerIframe}
        ></iframe>
      </div>
    </div>
  );
};

export default IGPLayer;
