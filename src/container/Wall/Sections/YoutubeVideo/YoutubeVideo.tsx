import styles from "./YoutubeVideo.module.scss";
import React, { useState } from "react";
import { hexToRgba } from "@/utils/helperFunction";
import { SubSection, SubSectionYTItems } from "@/models";
import Image from "next/image";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";
import InfoContainer from "@/components/InfoContainer/InfoContainer";
import YoutubeVideoPlayer from "@/components/YoutubeVideoPlayer/YoutubeVideoPlayer";

interface ReelsProps {
  props: SubSection;
  themeColor: string;
  isThemeDark?: boolean;
  isEditable?: boolean;
}

function YoutubeVideo({
  props,
  themeColor,
  isThemeDark,
  isEditable,
}: ReelsProps) {
  const youtubeItems = (props?.youtubeItems?.items ??
    []) as Array<SubSectionYTItems>;

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  const isDataAvailable = youtubeItems
    .filter((item) => !item?.youtubeVideo?.isArchived)
    .sort((a, b) => a.youtubeVideo.position - b.youtubeVideo.position);

  const displayTitle = (title: string) => {
    if (title.length > 20) {
      return (
        <>
          {title.slice(0, 20)}...
          <span
            className={styles.viewMore}
            onClick={() => {
              setModalData({
                isOpen: true,
                title: "",
                description: title,
              });
            }}
          >
            View More
          </span>
        </>
      );
    }
    return title;
  };

  return (
    <div>
      {(isDataAvailable.length > 0 || isEditable) && (
        <div className={styles.container}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              className={styles.header}
              style={{
                color: `${
                  isThemeDark
                    ? "var(--light-font-color)"
                    : "var(--dark-font-color)"
                }`,
              }}
            >
              {props?.title}
              {!props?.enabled && (
                <p
                  style={{
                    color: `${
                      isThemeDark
                        ? "var(--light-font-color)"
                        : "var(--dark-font-color)"
                    }`,
                  }}
                >
                  (disabled)
                </p>
              )}
            </span>
            {isEditable && (
              <Link
                href={{
                  pathname: `/configure/sub-section/edit/${encodeURI(
                    props?.id
                  )}`,
                }}
                onClick={handleBeforeUnload}
              >
                <Image
                  alt="edit"
                  src={"/assets/svg/edit.svg"}
                  height={18}
                  width={18}
                />
              </Link>
            )}
          </div>

          <div className={styles.listScroller}>
            {isDataAvailable.map((video, index: number) => {
              return (
                <div
                  key={index}
                  className={`${styles.listScrollerWrapper} ${
                    !props?.enabled ? styles.disableSubSection : ""
                  }`}
                >
                  <div
                    className={styles.videoSlides}
                    style={{
                      backgroundColor: hexToRgba(themeColor, 0.1),
                    }}
                  >
                    <div className={styles.videoWrapper}>
                      <YoutubeVideoPlayer
                        videoId={video?.youtubeVideo?.videoId}
                      />
                      <div className={styles.options}>
                        {isEditable && (
                          <div>
                            <Link
                              href={{
                                pathname: `/configure/sub-section/edit-cta/${encodeURI(
                                  props?.id
                                )}`,
                                query: {
                                  itemId: `${video?.youtubeVideo?.id}`,
                                },
                              }}
                              onClick={handleBeforeUnload}
                              className={styles.editIcon}
                            >
                              <Image
                                alt="edit"
                                src={"/assets/svg/edit-black.svg"}
                                height={18}
                                width={18}
                              />
                            </Link>
                          </div>
                        )}
                        {/* {video?.youtubeVideo?.ctaButton?.isActive && (
                          <div>
                            <Link
                              href={video?.youtubeVideo?.ctaButton?.link || ""}
                              onClick={handleBeforeUnload}
                              className={styles.linkIcon}
                              target="_blank"
                            >
                              <Image
                                alt="edit"
                                src={"/assets/svg/link-icon.svg"}
                                height={18}
                                width={18}
                              />
                            </Link>
                          </div>
                        )} */}
                      </div>
                    </div>

                    <div className={styles.bottomWrapper}>
                      <span className={styles.description}>
                        {displayTitle(video?.youtubeVideo?.title || "")}
                      </span>
                      {video?.youtubeVideo?.ctaButton?.isActive && (
                        <Link
                          target="_blank"
                          href={
                            (video?.youtubeVideo?.ctaButton?.link as string) ||
                            ""
                          }
                        >
                          <button className={styles.ctaButton}>
                            {video?.youtubeVideo?.ctaButton?.text ||
                              `Check it out`}
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {isEditable && (
              <Link
                href={{
                  pathname: `/configure/sub-section/add/content/${encodeURI(
                    props?.id
                  )}`,
                }}
                onClick={handleBeforeUnload}
              >
                <div
                  className={styles.addMoreContainer}
                  style={{
                    height: !!isDataAvailable?.length ? "100%" : "23rem",
                  }}
                >
                  <div className={styles.addMoreWrapper}>
                    <div className={styles.addMoreInnerWrapper}>
                      <div className={styles.addMoreIconWrapper}>
                        <Image
                          src="/assets/svg/plus.svg"
                          width={16}
                          height={16}
                          alt="add image"
                        />
                      </div>
                      <button className={styles.addMoreButton}>
                        Add Youtube Video
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
      {modalData.isOpen && (
        <InfoContainer modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  );
}
export default transition(YoutubeVideo);
