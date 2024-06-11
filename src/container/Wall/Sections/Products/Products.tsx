import React, { useState } from "react";
import Link from "next/link";
import styles from "./Products.module.scss";
import { SubSection } from "@/models";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { hexToRgba } from "@/utils/helperFunction";
import Image from "next/image";
import transition from "@/components/Transition/Transition";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";
import InfoContainer from "@/components/InfoContainer/InfoContainer";

type ProductsProps = {
  props: SubSection;
  themeColor: string;
  isThemeDark?: boolean;
  isEditable?: boolean;
};

function Products({
  props,
  themeColor,
  isThemeDark,
  isEditable,
}: ProductsProps) {
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
    if (description.length > 20) {
      return (
        <>
          {description.slice(0, 20)}...
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
              {isDataAvailable.map((product, index: number) => (
                <div key={index} style={{ maxWidth: "16rem" }}>
                  <div
                    style={{
                      backgroundColor: hexToRgba(themeColor, 0.1),
                    }}
                    className={styles.products}
                  >
                    <div className={styles.singleLink}>
                      {product.customLink.link ? (
                        <Link
                          href={product.customLink.link || ""}
                          onClick={handleBeforeUnload}
                          className={styles.linkIcon}
                          target="_blank"
                        >
                          <Image
                            src={
                              product.customLink.image?.includes("https") ||
                              product.customLink.image?.includes("http")
                                ? product.customLink.image
                                : getPublicURL(
                                    ("public/" +
                                      product.customLink.image) as string
                                  )
                            }
                            alt={props.title as string}
                            height={220}
                            width={220}
                            className={styles.productImage}
                          />
                        </Link>
                      ) : (
                        <Image
                          src={
                            product.customLink.image?.includes("https") ||
                            product.customLink.image?.includes("http")
                              ? product.customLink.image
                              : getPublicURL(
                                  ("public/" +
                                    product.customLink.image) as string
                                )
                          }
                          alt={props.title as string}
                          height={220}
                          width={220}
                          className={styles.productImage}
                        />
                      )}

                      <div className={styles.options}>
                        {isEditable && (
                          <div>
                            <Link
                              href={{
                                pathname: `/configure/sub-section/edit-link/${encodeURI(
                                  product?.customLinkId
                                )}`,
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
                      </div>
                    </div>
                    <div className={styles.bottomWrapper}>
                      <div className={styles.content}>
                        <span className={styles.title}>
                          {product?.customLink?.title}
                        </span>

                        <span className={styles.description}>
                          {displayTitle(
                            product?.customLink?.title || "",
                            product?.customLink?.description || ""
                          )}
                        </span>
                      </div>
                      <Link
                        href={product.customLink.link || ""}
                        target="_blank"
                        style={{
                          display: "flex",
                          textDecoration: "none",
                          alignItems: "center",
                        }}
                      >
                        <div className={styles.banner}>
                          <div className={styles.flexContainer}>
                            <Image
                              src="/assets/svg/safearea.svg"
                              alt="safearea-Icon"
                              className={styles.buyIcon}
                              height="12"
                              width="20"
                            />
                            <span>Buy Now</span>
                          </div>
                        </div>
                      </Link>
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
                  <div style={{ width: "15rem", margin: "0.3rem 0" }}>
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
                          Add Product
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
export default transition(Products);
