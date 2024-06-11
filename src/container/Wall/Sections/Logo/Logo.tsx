"use client";
import React from "react";
import { SubSection } from "@/models";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { hexToRgba } from "@/utils/helperFunction";
import Image from "next/image";
import styles from "./Logo.module.scss";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";
interface MediaProps {
  props: SubSection;
  themeColor: string;
  isThemeDark?: boolean;
  isEditable?: boolean;
}

const Logo = ({
  props,
  themeColor,
  isThemeDark = false,
  isEditable,
}: MediaProps) => {
  const mediaData = props?.logoItems?.items;

  if (!mediaData) {
    return;
  }
  const isDataAvailable = mediaData.filter((item) => !item?.logo?.isArchived);

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
          <div
            className={`${styles.listScrollerWrapper} ${
              !props?.enabled ? styles.disableSubSection : ""
            }`}
          >
            <div className={styles.listScroller}>
              {!!mediaData.length &&
                mediaData?.map((item: any, index: number) => {
                  return (
                    !item?.logo?.isArchived && (
                      <div key={index} style={{ padding: "0.5rem" }}>
                        <div
                          className={styles.contentWrapper}
                          style={{
                            backgroundColor: hexToRgba(themeColor, 0.1),
                          }}
                        >
                          <div className={styles.imageWrapper}>
                            <Image
                              src={getPublicURL(
                                ("public/" + item?.logo?.mediaPath) as string
                              )}
                              alt="play"
                              width={70}
                              height={70}
                            />
                          </div>
                        </div>
                      </div>
                    )
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
                  <div style={{ width: "8rem", margin: "0.7rem 0" }}>
                    <div className={styles.addMoreWrapper}>
                      <div className={styles.addMoreInnerWrapper}>
                        <div className={styles.addMoreIconWrapper}>
                          <Image
                            src="/assets/svg/plus.svg"
                            width={12}
                            height={13}
                            alt="add image"
                          />
                        </div>
                        <button className={styles.addMoreButton}>
                          Add Logo
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
    </div>
  );
};

export default transition(Logo);
