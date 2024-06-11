"use client";
import styles from "./Reels.module.scss";
import React, { useMemo, useState } from "react";
import { SubSection, SubSectionFBItems, SubSectionIGItems } from "@/models";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { convertToTitleCase, hexToRgba } from "@/utils/helperFunction";
import Image from "next/image";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import Video from "@/components/Video/Video";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";
import InfoContainer from "@/components/InfoContainer/InfoContainer";

interface ReelsProps {
  props: SubSection;
  themeColor: string;
  isThemeDark?: boolean;
  isEditable?: boolean;
}

const Reels = ({ props, themeColor, isThemeDark, isEditable }: ReelsProps) => {
  const mediaData = (
    props?.type === "FACEBOOK"
      ? props?.facebookItems?.items
      : props?.instagramItems?.items
  ) as Array<SubSectionFBItems & SubSectionIGItems>;

  const videosData = useMemo(() => {
    return mediaData
      ?.map((m) => {
        return m?.instagramVideo || m?.facebookVideo;
      })
      .filter((v) => !v?.isArchived);
  }, [mediaData]);

  const isDataAvailable = videosData
    .filter((item) => !item?.isArchived)
    .sort((a, b) => a.position - b.position);

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  const displayTitle = (title: string) => {
    if (title.length > 10) {
      return (
        <>
          {title.slice(0, 10)}...
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
              {props?.title}{" "}
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
          <div className={styles.listScrollerWrapper}>
            <div className={styles.listScroller}>
              {isDataAvailable.map((videoUrl, index: number) => {
                return (
                  <div>
                    {
                      <div
                        key={index}
                        className={`${styles.videoSlide} ${
                          !props?.enabled ? styles.disableSubSection : ""
                        }`}
                        style={{
                          backgroundColor: hexToRgba(themeColor, 0.1),
                          display: "block",
                        }}
                      >
                        <div className={styles.videoWrapper}>
                          <div className={styles.videoConatiner}>
                            {videoUrl?.ctaButton?.link ? (
                              <Link
                                href={videoUrl?.ctaButton?.link || ""}
                                onClick={handleBeforeUnload}
                                className={styles.linkIcon}
                                target="_blank"
                              >
                                <Video
                                  url={getPublicURL(
                                    videoUrl?.sourceMediaUrl as string
                                  )}
                                />
                              </Link>
                            ) : (
                              <Video
                                url={getPublicURL(
                                  videoUrl?.sourceMediaUrl as string
                                )}
                              />
                            )}

                            <div className={styles.options}>
                              {isEditable && (
                                <div>
                                  <Link
                                    href={{
                                      pathname: `/configure/sub-section/edit-cta/${encodeURI(
                                        props?.id
                                      )}`,
                                      query: {
                                        itemId: `${videoUrl?.id}`,
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
                              {/* {videoUrl?.ctaButton?.isActive && (
                                <div>
                                  <Link
                                    href={videoUrl?.ctaButton?.link || ""}
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
                              {displayTitle(videoUrl?.title || "")}
                            </span>
                            {videoUrl?.ctaButton?.isActive && (
                              <Link
                                target="_blank"
                                href={
                                  (videoUrl?.ctaButton?.link as string) || ""
                                }
                              >
                                <button className={styles.ctaButton}>
                                  {videoUrl?.ctaButton?.text || "Check it out"}
                                </button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    }
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
                          Add {convertToTitleCase(props?.type)} Video
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      {modalData.isOpen && (
        <InfoContainer modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  );
};

export default transition(Reels);
