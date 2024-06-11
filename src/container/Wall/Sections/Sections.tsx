"use client";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./Sections.module.scss";
import { Section, SubSection } from "@/models";
import Logo from "@/container/Wall/Sections/Logo/Logo";
import YTLink from "@/container/Wall/Sections/YTLink/YTLink";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";
import IGLink from "@/container/Wall/Sections/IGLink/IGLink";
import { Dropdown, MenuProps } from "antd";
import {
  EllipsisOutlined,
  ProductOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import NewComponentSection from "../../../components/NewComponentSection/NewComponentSection";
import { useDispatch } from "react-redux";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";

const YoutubeVideo = dynamic(
  () => import("@/container/Wall/Sections/YoutubeVideo/YoutubeVideo")
);
const Products = dynamic(() => import("@/container/Wall/Sections/Products/Products"));
const Reels = dynamic(() => import("@/container/Wall/Sections/Reels/Reels"));
const Apps = dynamic(() => import("@/container/Wall/Sections/Apps/App"));
const Media = dynamic(() => import("@/container/Wall/Sections/Media/Media"));
const Portfolio = dynamic(
  () => import("@/container/Wall/Sections/Portfolio/Portfolio")
);

type AddSection = {
  themeColor: string;
};

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link
        href={{ pathname: `/configure/arrange-section` }}
        className={styles.arrangeSectionBtn}
        onClick={handleBeforeUnload}
        style={{ color: "var(--light-black-text-color)" }}
      >
        Arrange
      </Link>
    ),
    icon: (
      <ProductOutlined
        style={{ fontSize: "18px", color: "var(--light-black-text-color)" }}
      />
    ),
  },
  {
    key: "2",
    label: (
      <Link
        href={{
          pathname: `/configure/add-new-section`,
        }}
        onClick={handleBeforeUnload}
        style={{ color: "var(--light-black-text-color)" }}
      >
        Add new Section
      </Link>
    ),
    icon: (
      <PlusOutlined
        style={{ fontSize: "16px", color: "var(--light-black-text-color)" }}
      />
    ),
  },
];

function Sections({ themeColor }: AddSection) {
  const { userDetail } = useSelector((state: any) => state.auth);
  const { activeIndex } = useSelector((state: any) => state.activeSection);
  const sections: Array<Section> | undefined = userDetail?.sections || [];
  const dispatch = useDispatch();
  const subSections: Array<SubSection> = useMemo(() => {
    if (sections?.length) {
      const activeSection = sections[activeIndex];
      return activeSection && activeSection?.subSections
        ? (activeSection?.subSections?.items as Array<SubSection>)
        : [];
    }
    return [];
  }, [sections, activeIndex]);

  if (!sections?.length) {
    return;
  }

  return (
    <Fragment>
      <div className={styles.main}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionTitleWrapper}>
            <div className={styles.tags}>
              {sections?.map((section: any, index: number) => (
                <div key={index}>
                  <span
                    key={index}
                    style={{ opacity: section?.isArchived ? "0.5" : "1" }}
                    className={
                      activeIndex === index ? styles.selectedTags : styles.tagss
                    }
                    onClick={() => {
                      dispatch({
                        type: onboardingSagaActions.SET_ACTIVE_SECTION,
                        payload: index,
                      });
                    }}
                  >
                    {section.title}
                    <Link
                      href={{
                        pathname: `/configure/edit-section-meta/${encodeURI(
                          section.id
                        )}`,
                      }}
                      onClick={handleBeforeUnload}
                    >
                      <Image
                        alt="edit"
                        src={
                          activeIndex === index
                            ? "/assets/svg/edit-white.svg"
                            : "/assets/svg/edit.svg"
                        }
                        height={16}
                        width={16}
                      />
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.hamburger}>
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={["click"]}
            >
              <EllipsisOutlined
                className={styles.ellipsis}
                rotate={90}
                style={{
                  fontSize: "28px",
                  color: "#737982",
                }}
              />
            </Dropdown>
          </div>
        </div>
        <div className={styles.ComponentContainer}>
          {subSections?.length > 0 &&
            subSections.map((data, index) => {
              return (
                <div key={index}>
                  {data?.type === "YOUTUBE" && (
                    <YoutubeVideo
                      {...data}
                      props={data}
                      themeColor={themeColor}
                      isEditable
                    />
                  )}
                  {data?.type === "INSTAGRAM" && (
                    <Reels
                      key="Instagram"
                      props={data}
                      themeColor={themeColor}
                      isEditable
                    />
                  )}
                  {data?.type === "FACEBOOK" && (
                    <Reels
                      key="Facebook"
                      props={data}
                      themeColor={themeColor}
                      isEditable
                    />
                  )}
                  {(data?.customLinkType === "PRODUCT" ||
                    data?.customLinkType === "EXTERNAL") && (
                    <Products props={data} themeColor={themeColor} isEditable />
                  )}
                  {data?.customLinkType === "APP" && (
                    <Apps props={data} themeColor={themeColor} isEditable />
                  )}
                  {data.customLinkType === "CUSTOM" && (
                    <Portfolio
                      props={data}
                      themeColor={themeColor}
                      isEditable
                    />
                  )}
                  {data.customLinkType === "YTLINK" && (
                    <YTLink props={data} themeColor={themeColor} isEditable />
                  )}
                  {data.customLinkType === "IGLINK" && (
                    <IGLink props={data} themeColor={themeColor} isEditable />
                  )}

                  {data?.type === "MEDIA" && (
                    <Media
                      key="Media"
                      props={data}
                      themeColor={themeColor}
                      isEditable
                    />
                  )}
                  {data?.type === "LOGO" && (
                    <Logo
                      key="Logo"
                      props={data}
                      themeColor={themeColor}
                      isEditable
                    />
                  )}
                </div>
              );
            })}
        </div>
        <NewComponentSection sectionId={sections[activeIndex]?.id as string} />
      </div>
    </Fragment>
  );
}
export default transition(Sections);
