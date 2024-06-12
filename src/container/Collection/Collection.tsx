"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  getImportedFbMedia,
  getImportedIgMedia,
  getImportedYtMedia,
} from "@/store/sagas/handlers/configure.handle";
import { configureSagaActions } from "@/store/sagas/sagaActions/configure.action";
import styles from "./Collection.module.scss";
import transition from "@/components/Transition/Transition";

const Collection = () => {
  const router = useRouter();
  const importedData = useSelector((state: any) => state.configure);
  const { authData } = useSelector((state: any) => state.auth);
  const { configureData } = useSelector((state: any) => state.configure);
  const { onBoarding } = useSelector((state: any) => state.onboarding);
  const dispatch = useDispatch();
  const getImportedMedia = async () => {
    const ytMediaData = await getImportedYtMedia(onBoarding.id);
    const fbMediaData = await getImportedFbMedia(onBoarding.id);
    const igMediaData = await getImportedIgMedia(onBoarding.id);
    dispatch({
      type: configureSagaActions.SET_IMPORTED_YT_MEDIA,
      payload: ytMediaData,
    });
    dispatch({
      type: configureSagaActions.SET_IMPORTED_FB_MEDIA,
      payload: fbMediaData,
    });
    dispatch({
      type: configureSagaActions.SET_IMPORTED_IG_MEDIA,
      payload: igMediaData,
    });
  };
  useEffect(() => {
    getImportedMedia();
  }, [configureData, authData]);
  return (
    <>
      <div className={styles.addNewComponents}>
        <div className={styles.grid}>
          <span className={styles.collectionHead}>Imported</span>

          <div className={styles.gridContainer}>
            <div
              className={styles.gridItem}
              onClick={() => {
                importedData?.importedYt?.data.length != 0
                  ? router.push(`/configure/collection/edit/youtube`)
                  : router.push(`/configure/collection/import/youtube`);
              }}
            >
              {importedData?.importedYt?.data?.filter(
                (item: any) => !item.isArchived
              ).length || 0}
              <span className={styles.collectiontext}>YT Videos</span>
            </div>
            <div
              className={styles.gridItem}
              onClick={() => {
                importedData?.importedFb?.data.length > 0
                  ? router.push(`/configure/collection/edit/facebook`)
                  : router.push(`/configure/collection/import/facebook`);
              }}
            >
              {importedData?.importedFb?.data?.filter(
                (item: any) => !item.isArchived
              ).length || 0}
              <span className={styles.collectiontext}>FB Videos</span>
            </div>
            <div
              className={styles.gridItem}
              onClick={() => {
                importedData?.importedIg?.data.length > 0
                  ? router.push(`/configure/collection/edit/instagram`)
                  : router.push(`/configure/collection/import/instagram`);
              }}
            >
              {importedData?.importedIg?.data?.filter(
                (item: any) => !item.isArchived
              ).length || 0}
              <span className={styles.collectiontext}>IG Videos</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default transition(Collection);
