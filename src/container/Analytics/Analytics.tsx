"use client";
import React, { useState } from "react";
import styles from "./Analytics.module.scss";
import { Select, Switch, Tabs, TabsProps } from "antd";
import YtAnalytics from "@/container/Analytics/YtAnalytics/YtAnalytics";
import IgAnalytics from "@/container/Analytics/IgAnalytics/IgAnalytics";
import { useSelector } from "react-redux";
import { updateAnalyticsToggle } from "@/store/sagas/handlers/configure.handle";
import { useDispatch } from "react-redux";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";
import transition from "@/components/Transition/Transition";

const Analytics = (): React.ReactElement => {
  const [activeKey, setActiveKey] = useState("1");
  const [dateSelected, setDateSelected] = useState("LAST30");
  const { onBoarding } = useSelector((state: any) => state.onboarding);
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    setDateSelected(value);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Youtube",
    },
    {
      key: "2",
      label: "Instagram",
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };
  const onChange = async (checked: boolean) => {
    const payload = {
      id: onBoarding?.id,
      isAnalyticsEnabled: checked,
    };
    await updateAnalyticsToggle(payload);
    dispatch({
      type: onboardingSagaActions.EDIT_USER,
      payload,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <span>Analytics</span>
        </div>
      </div>
      <div className={styles.itemWrapper}>
        <div className={styles.switch}>
          <Switch onChange={onChange} checked={onBoarding.isAnalyticsEnabled} />
          <p className={styles.switchLabel}>Show on wall</p>
        </div>
        <div>
          <Select
            defaultValue={dateSelected}
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: "LAST30", label: "Last 30 days" },
              { value: "LAST60", label: "Last 60 days" },
              { value: "LAST90", label: "Last 90 days" },
            ]}
          />
        </div>
      </div>
      <div className={styles.tabs}>
        <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
        {activeKey === "1" && <YtAnalytics dateSelected={dateSelected} />}
        {activeKey === "2" && <IgAnalytics dateSelected={dateSelected} />}
      </div>
    </div>
  );
};

export default transition(Analytics);
