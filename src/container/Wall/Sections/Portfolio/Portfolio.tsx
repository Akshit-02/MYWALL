import { getPublicURL } from "@/utils/getPublicImageUrl";
import styles from "./Portfolio.module.scss";
import Image from "next/image";
import { SubSection } from "@/models";
import { hexToRgba } from "@/utils/helperFunction";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";
import { useState } from "react";
import InfoContainer from "@/components/InfoContainer/InfoContainer";

type CustomProps = {
  props: SubSection;
  themeColor: string;
  isThemeDark?: boolean;
  isEditable?: boolean;
};

function Portfolio({
  props,
  themeColor,
  isThemeDark,
  isEditable,
}: CustomProps) {
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
      {(!!isDataAvailable.length || isEditable) && (
        <div className={styles.portfolioContainer}>
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
              {isDataAvailable.map((portfolio, index) => (
                <div
                  key={index}
                  className={styles.container}
                  style={{ backgroundColor: hexToRgba(themeColor, 0.1) }}
                >
                  <div className={styles.imageContainer}>
                    {portfolio?.customLink?.link ? (
                      <Link
                        href={portfolio?.customLink?.link || ""}
                        onClick={handleBeforeUnload}
                        className={styles.linkIcon}
                        target="_blank"
                      >
                        <Image
                          src={getPublicURL(
                            "public/" +
                              encodeURI(portfolio.customLink.image || "")
                          )}
                          className={styles.previewImage}
                          alt="itemImage"
                          width={250}
                          height={156}
                        />
                      </Link>
                    ) : (
                      <Image
                        src={getPublicURL(
                          "public/" +
                            encodeURI(portfolio.customLink.image || "")
                        )}
                        className={styles.previewImage}
                        alt="itemImage"
                        width={250}
                        height={156}
                      />
                    )}

                    <div className={styles.options}>
                      {isEditable && (
                        <div>
                          <Link
                            href={{
                              pathname: `/configure/sub-section/edit-link/${encodeURI(
                                portfolio?.customLinkId
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
                      <div>
                        <Link
                          href={(portfolio?.customLink?.link as string) || ""}
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
                    </div>
                  </div>

                  <div className={styles.content}>
                    <div>
                      <span className={styles.title}>
                        {portfolio?.customLink?.title}
                      </span>
                    </div>

                    <span className={styles.description}>
                      {displayTitle(
                        portfolio?.customLink?.title || "",
                        portfolio?.customLink?.description || ""
                      )}
                    </span>
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
                          Add CustomLink
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
export default transition(Portfolio);
