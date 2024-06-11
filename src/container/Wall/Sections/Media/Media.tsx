"use client";
import React, { useState } from "react";
import { SubSection } from "@/models";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { hexToRgba } from "@/utils/helperFunction";
import Image from "next/image";
import styles from "./Media.module.scss";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import Video from "@/components/Video/Video";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";
import InfoContainer from "@/components/InfoContainer/InfoContainer";

interface MediaProps {
  props: SubSection;
  themeColor: string;
  isThemeDark?: boolean;
  isEditable?: boolean;
}

const Media = ({ props, themeColor, isThemeDark, isEditable }: MediaProps) => {
  const mediaData = props?.mediaItems?.items;

  if (!mediaData) {
    return;
  }
  const isDataAvailable = mediaData.filter((item) => !item?.media?.isArchived);
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
          <div className={styles.headerContainer}>
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
              <div>
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
              </div>
            )}
          </div>
          <div className={styles.listScrollerWrapper}>
            <div className={styles.listScroller}>
              {mediaData
                ?.filter((item: any) => !item?.media?.isArchived)
                ?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`${styles.listScrollerWrapper} ${
                        !props?.enabled ? styles.disableSubSection : ""
                      }`}
                    >
                      {item?.media?.type === "IMAGE" ? (
                        <div
                          className={styles.contentWrapper}
                          style={{
                            backgroundColor: hexToRgba(themeColor, 0.1),
                          }}
                        >
                          <Link
                            href={item?.media?.ctaButton?.link || ""}
                            onClick={handleBeforeUnload}
                            className={styles.linkIcon}
                            target="_blank"
                          ></Link>
                          <div
                            className={`${styles.imageWrapper} ${styles.mediaContainer}`}
                          >
                            {item?.media?.ctaButton?.link ? (
                              <Link
                                href={item?.media?.ctaButton?.link || ""}
                                onClick={handleBeforeUnload}
                                className={styles.linkIcon}
                                target="_blank"
                              >
                                <Image
                                  src={getPublicURL(
                                    ("public/" +
                                      item?.media?.mediaPath) as string
                                  )}
                                  alt="mediaImage"
                                  width={200}
                                  height={200}
                                  className={styles.imageMedia}
                                />
                              </Link>
                            ) : (
                              <Image
                                src={getPublicURL(
                                  ("public/" + item?.media?.mediaPath) as string
                                )}
                                alt="mediaImage"
                                width={200}
                                height={200}
                                className={styles.imageMedia}
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
                                        itemId: `${item?.media?.id}`,
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
                              {item?.media?.ctaButton?.isActive && (
                                <div>
                                  <Link
                                    href={item?.media?.ctaButton?.link || ""}
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
                              )}
                            </div>
                          </div>
                          <div className={styles.bottomWrapper}>
                            <span className={styles.title}>
                              {displayTitle(item?.media?.title || "")}
                            </span>
                            {/* {item?.media?.ctaButton?.isActive && (
                              <Link
                                target="_blank"
                                href={
                                  (item?.media?.ctaButton?.link as string) ||
                                  " "
                                }
                                className={styles.ctaButtonLink}
                              >
                                <button className={styles.ctaButton}>
                                  {item?.media?.ctaButton?.text ||
                                    "Check it out"}
                                </button>
                              </Link>
                            )} */}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={styles.contentWrapper}
                          style={{
                            backgroundColor: hexToRgba(themeColor, 0.1),
                          }}
                        >
                          <div
                            style={{ position: "relative", margin: "auto" }}
                            key={index}
                            className={styles.mediaContainer}
                          >
                            {item?.media?.ctaButton?.link ? (
                              <Link
                                href={item.media.ctaButton.link || ""}
                                onClick={handleBeforeUnload}
                                className={styles.linkIcon}
                                target="_blank"
                              >
                                <Video
                                  url={
                                    item.media.mediaPath &&
                                    (getPublicURL(
                                      "public/" + item.media.mediaPath
                                    ) as string)
                                  }
                                  thumbnailUrl={
                                    item.media.thumbnailUrl &&
                                    (getPublicURL(
                                      "public/" + item.media.thumbnailUrl
                                    ) as string)
                                  }
                                />
                              </Link>
                            ) : (
                              <Video
                                url={
                                  item.media.mediaPath &&
                                  (getPublicURL(
                                    "public/" + item.media.mediaPath
                                  ) as string)
                                }
                                thumbnailUrl={
                                  item.media.thumbnailUrl &&
                                  (getPublicURL(
                                    "public/" + item.media.thumbnailUrl
                                  ) as string)
                                }
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
                                        itemId: `${item?.media?.id}`,
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
                              {item?.media?.ctaButton?.isActive && (
                                <div>
                                  <Link
                                    href={item?.media?.ctaButton?.link || ""}
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
                              )}
                            </div>
                          </div>
                          <div className={styles.bottomWrapper}>
                            <span className={styles.title}>
                              {displayTitle(item?.media?.title || "")}
                            </span>
                            {/* {item?.media?.ctaButton?.isActive && (
                              <Link
                                target="_blank"
                                href={
                                  (item?.media?.ctaButton?.link as string) || ""
                                }
                                className={styles.ctaButtonLink}
                              >
                                <button className={styles.ctaButton}>
                                  {item?.media?.ctaButton?.text ||
                                    "Check it out"}
                                </button>
                              </Link>
                            )} */}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              {isEditable && (
                <Link
                  href={{
                    pathname: `/configure/sub-section/edit/content/${encodeURI(
                      props?.id
                    )}`,
                  }}
                  onClick={handleBeforeUnload}
                >
                  <div className={styles.addMoreContainer}>
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
                          Add Media
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

export default transition(Media);
