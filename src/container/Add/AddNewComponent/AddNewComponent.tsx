"use client";

import React from "react";
import Image from "next/image";
import styles from "./AddNewComponent.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import Header from "@/components/Header/Header";

type AddComponent = {
  sectionId: string;
};
const AddNewComponent = ({ sectionId }: AddComponent) => {
  const router = useRouter();

  return (
    <>
      <div className={`${styles.addNewComponents} pageWidth`}>
        <Header title="Add New Component" />
        <div className={styles.componentsContainer}>
          <span className={styles.componentsheading}>Links</span>
          <div className={styles.container}>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/custom`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/customLink.svg"
                  alt="Ig Icon"
                  width={38}
                  height={56}
                />

                <div className={styles.textContainer}>
                  <span className={styles.text}>Custom Links</span>
                </div>
              </div>
            </Link>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/ytlink`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/youtubeLink.svg"
                  alt="Links"
                  width={38}
                  height={56}
                />

                <div className={styles.textContainer}>
                  <span className={styles.text}>Youtube Links</span>
                </div>
              </div>
            </Link>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/shopping`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/shoppingLink.svg"
                  alt="Links"
                  width={38}
                  height={56}
                />
                <div className={styles.textContainer}>
                  <span className={styles.text}>Shopping Links</span>
                </div>
              </div>
            </Link>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/app`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/appLink.svg"
                  alt="Links"
                  width={38}
                  height={56}
                />
                <div className={styles.textContainer}>
                  <span className={styles.text}> App Link</span>
                </div>
              </div>
            </Link>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/iglink`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/instagram-gray.svg"
                  alt="Links"
                  width={48}
                  height={48}
                />

                <div className={styles.textContainer}>
                  <span className={styles.text}>Instagram Links</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.componentsContainer}>
          <span className={styles.componentsheading}>Media From Phone</span>
          <div className={styles.container}>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/media`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/photo.svg"
                  alt="Ig Icon"
                  width={60}
                  height={60}
                />
                <div className={styles.textContainer}>
                  <span className={styles.text}>Media From Phone</span>
                </div>
              </div>
            </Link>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/logo`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/logo.svg"
                  alt="Ig Icon"
                  width={60}
                  height={60}
                />
                <div className={styles.textContainer}>
                  <span className={styles.text}>Logo</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.componentsContainer}>
          <span className={styles.componentsheading}>From your Socials </span>
          <div className={styles.container}>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/facebook`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/fb.svg"
                  alt="Yt Icon"
                  height={68}
                  width={70}
                />
                <div className={styles.textContainer}>
                  <span className={styles.text}>Facebook</span>
                </div>
              </div>
            </Link>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/instagram`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/ig.svg"
                  alt="Ig Icon"
                  width={46}
                  height={68}
                />
                <div className={styles.textContainer}>
                  <span className={styles.text}>Instagram</span>
                </div>
              </div>
            </Link>
            <Link
              href={{
                pathname: `/configure/sub-section/add/${encodeURI(
                  sectionId
                )}/youtube`,
              }}
            >
              <div className={styles.parent}>
                <Image
                  src="/assets/svg/yt.svg"
                  alt="Ig Icon"
                  width={46}
                  height={68}
                />
                <div className={styles.textContainer}>
                  <span className={styles.text}>Youtube</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default transition(AddNewComponent);
