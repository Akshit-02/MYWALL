import React from "react";
import Footer from "@/components/Footer/Footer";
import { fetchUserBySlug } from "@/store/sagas/requests/auth.request";
import { AnalyticsPreview } from "@/container/PreviewPage/AnalyticsPreview/AnalyticsPreview";
import styles from "./page.module.scss";
export const revalidate = 3;

type Props = {
  params: { username: string };
};

export async function generateStaticParams() {
  return [];
}

export default async function AnalyticsPage(props: Props) {
  const { username } = props.params;
  const data = await fetchUserBySlug(username);
  return (
    <div className={`${styles.container} screenWidth`}>
      {data?.isAnalyticsEnabled && <AnalyticsPreview data={data} />}
      {!data?.isAnalyticsEnabled && (
        <div className={styles.messageWrapper}>
          Influencer has opted to disable the display of analytics data.
        </div>
      )}
      <Footer />
    </div>
  );
}
