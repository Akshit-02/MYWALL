"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CollectionEdit.module.scss";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import Header from "@/components/Header/Header";
import { convertToTitleCase } from "@/utils/helperFunction";
import { Button } from "antd";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
interface EditProps {
  platform: string;
}
function CollectionEdit({ platform }: EditProps) {
  const importedData = useSelector((state: any) => state.configure);
  const [allMedia, setAllMedia] = useState<any>([]);

  useEffect(() => {
    if (platform === "youtube") {
      if (importedData?.importedYt?.data.length > 0) {
        setAllMedia(
          importedData?.importedYt?.data.filter((item: any) => !item.isArchived)
        );
      }
    } else if (platform === "facebook") {
      if (importedData?.importedFb?.data.length > 0) {
        setAllMedia(
          importedData?.importedFb?.data?.filter(
            (item: any) => !item.isArchived
          )
        );
      }
    } else if (platform === "instagram") {
      if (importedData?.importedIg?.data.length > 0) {
        setAllMedia(
          importedData?.importedIg?.data?.filter(
            (item: any) => !item.isArchived
          )
        );
      }
    }
  }, [platform, importedData]);

  return (
    <>
      <div>
        <div className={`${styles.container} pageWidth`}>
          <Header title={`${convertToTitleCase(platform)} Videos`} />
          <div className={styles.content}>
            {allMedia?.map((image: any, index: number) => (
              <div className={styles.img_block} key={index}>
                <img
                  src={getPublicURL(image.thumbnailUrl as string)}
                  alt="media"
                  height={218}
                  width={168}
                  className={styles.img_noblock}
                />
              </div>
            ))}
          </div>
          <Link href={`/configure/collection/import/${platform}`}>
            <Button type="primary" size="large">
              Import Media
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default transition(CollectionEdit);
