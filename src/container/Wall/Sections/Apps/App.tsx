"use client";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import styles from "./Apps.module.scss";
import React, { useState } from "react";
import { SubSection } from "@/models";
import Image from "next/image";
import { hexToRgba } from "@/utils/helperFunction";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";
import InfoContainer from "@/components/InfoContainer/InfoContainer";

type AppsProps = {
  props: SubSection;
  themeColor: string;
  isThemeDark?: boolean;
  isEditable?: boolean;
};

function Apps({
  props,
  themeColor,
  isThemeDark = false,
  isEditable,
}: AppsProps) {
  const { customLinkItems, title, enabled } = props;

  if (!customLinkItems?.items?.length) {
    return;
  }

  const isDataAvailable = customLinkItems.items
    .filter((item) => !item?.customLink?.isArchived)
    .sort((a, b) => a.customLink.position - b.customLink.position);

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    description: "",
  });
  const displayTitle = (title: string, description: string) => {
    if (description.length > 50) {
      return (
        <>
          {description.slice(0, 50)}...
          <span
            className={styles.viewMore}
            onClick={() => {
              setModalData({
                isOpen: true,
                title: title,
                description: description,
              });
            }}
          >
            View More
          </span>
        </>
      );
    }
    return description;
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
              {title}{" "}
              {!enabled && (
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

          <div
            className={`${styles.listScrollerWrapper} ${
              !enabled ? styles.disableSubSection : ""
            }`}
          >
            <div className={styles.listScroller}>
              {isDataAvailable.map((data, index: number) => (
                <div key={index}>
                  <div
                    className={styles.section}
                    style={{
                      backgroundColor: hexToRgba(themeColor, 0.1),
                      display: "block",
                    }}
                  >
                    {isEditable && (
                      <div className={styles.editButtonContainer}>
                        <Link
                          href={{
                            pathname: `/configure/sub-section/edit-link/${encodeURI(
                              data?.customLinkId
                            )}`,
                          }}
                          onClick={handleBeforeUnload}
                          className={styles.editButton}
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
                    <div className={styles.singleLink}>
                      {data.customLink.link ? (
                        <Link
                          href={data.customLink.link || ""}
                          onClick={handleBeforeUnload}
                          className={styles.linkIcon}
                          target="_blank"
                        >
                          <Image
                            src={
                              data.customLink.image?.includes("https")
                                ? data.customLink.image
                                : getPublicURL(
                                    ("public/" +
                                      data.customLink.image) as string
                                  )
                            }
                            className={styles.icon}
                            alt={props?.title as string}
                            width={64}
                            height={64}
                          />
                        </Link>
                      ) : (
                        <Image
                          src={
                            data.customLink.image?.includes("https")
                              ? data.customLink.image
                              : getPublicURL(
                                  ("public/" + data.customLink.image) as string
                                )
                          }
                          className={styles.icon}
                          alt={props?.title as string}
                          width={64}
                          height={64}
                        />
                      )}

                      <div className={styles.titleWrapper}>
                        <p className={styles.title}>
                          {data?.customLink?.title}
                        </p>

                        <span className={styles.description}>
                          {displayTitle(
                            data?.customLink?.title || "",
                            data?.customLink?.description || ""
                          )}
                        </span>

                        <div>
                          {data?.customLink?.link && (
                            <div>
                              {data.customLink.isAffiliate ? (
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "8px",
                                  }}
                                >
                                  <a
                                    href={data.customLink.link || ""}
                                    target="_blank"
                                  >
                                    <Image
                                      src="/assets/svg/playstore.svg"
                                      className={styles.appIcon}
                                      alt="Playstore"
                                      width={92}
                                      height={30}
                                    />
                                  </a>
                                  <a
                                    href={data.customLink.link || ""}
                                    target="_blank"
                                  >
                                    <Image
                                      src="/assets/svg/appstore.svg"
                                      className={styles.appIcon}
                                      alt="Appstore"
                                      width={92}
                                      height={30}
                                    />
                                  </a>
                                </div>
                              ) : (
                                <div>
                                  {data?.customLink?.playStoreLink && (
                                    <a
                                      href={data.customLink.playStoreLink || ""}
                                      target="_blank"
                                    >
                                      <Image
                                        src="/assets/svg/playstore.svg"
                                        className={styles.appIcon}
                                        alt="Playstore"
                                        width={92}
                                        height={30}
                                      />
                                    </a>
                                  )}

                                  {data?.customLink?.appStoreLink && (
                                    <a
                                      href={data.customLink.appStoreLink || ""}
                                      target="_blank"
                                    >
                                      <Image
                                        src="/assets/svg/appstore.svg"
                                        className={styles.appIcon}
                                        alt="Playstore"
                                        width={92}
                                        height={30}
                                      />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isEditable && (
                <Link
                  href={{
                    pathname: `/configure/sub-section/add/content/${encodeURI(
                      props?.id
                    )}`,
                  }}
                  onClick={handleBeforeUnload}
                >
                  <div style={{ width: "15rem" }}>
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
                          Add App
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
}
export default transition(Apps);
