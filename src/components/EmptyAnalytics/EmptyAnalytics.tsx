"use client";

import React from "react";
import styles from "./EmptyAnalytics.module.scss";
import transition from "@/components/Transition/Transition";

interface EmptyAnalyticsInputType {
  isYtMetricsAvailable?: boolean;
  isIgMetricsAvailable?: boolean;
}

const EmptyAnalytics = (data: EmptyAnalyticsInputType): React.ReactElement => {
  return (
    <div className={styles.container}>
      {data?.isYtMetricsAvailable && (
        <div className={styles.messageWrapper}>
          <span>Youtube Analytics Not Available</span>
        </div>
      )}
      {data?.isIgMetricsAvailable && (
        <div className={styles.messageWrapper}>
          <span>Instagram Analytics Not Available</span>
        </div>
      )}
    </div>
  );
};
export default transition(EmptyAnalytics);
