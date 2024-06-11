import styles from "./IGLink.module.scss";
import Image from "next/image";
import { SubSection } from "@/models";
import { useState } from "react";
import { hexToRgba } from "@/utils/helperFunction";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";
import InfoContainer from "@/components/InfoContainer/InfoContainer";
import IGPLayer from "@/components/IGPlayer/IGPLayer";

type CustomProps = {
  props: SubSection;
  themeColor: string;
  isThemeDark?: boolean;
  isEditable?: boolean;
};

function IGLink({
  props,
  themeColor,
  isThemeDark = false,
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
    if (description.length > 15) {
      return (
        <>
          {description.slice(0, 15)}...
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
              {isDataAvailable.map((portfolio, index: number) => (
                <div
                  key={index}
                  className={styles.container}
                  style={{ backgroundColor: hexToRgba(themeColor, 0.1) }}
                >
                  {/* {isEditable && (
                    <div className={styles.editButtonContainer}>
                      <Link
                        href={{
                          pathname: `/configure/sub-section/edit-link/${encodeURI(
                            portfolio?.customLinkId
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
                  )} */}
                  <div className={styles.igPLayer}>
                    <IGPLayer url={portfolio?.customLink?.link} />
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
                    <span className={styles.title}>
                      {portfolio?.customLink?.title}
                    </span>

                    <span className={styles.description}>
                      {displayTitle(
                        portfolio?.customLink?.title || "",
                        portfolio?.customLink?.description || ""
                      )}
                    </span>
                  </div>
                  {/* <a
                    href={portfolio?.customLink?.ctaButton?.link as string}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    <button className={commonStyles.linkButton}>
                      {portfolio?.customLink?.ctaButton?.text || `Check it out`}
                    </button>
                  </a> */}
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
                  <div style={{ width: "13.5rem" }}>
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
                          Add Instagram Link
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
export default transition(IGLink);
