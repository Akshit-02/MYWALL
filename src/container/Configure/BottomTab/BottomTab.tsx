"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Analytics, Collection, YourWall } from "@/utils/icons";
import style from "./BottomTabs.module.scss";
import { Flex, Tabs } from "antd";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";

const BottomTabs = (): React.ReactElement => {
  const pathName = usePathname();

  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("/configure/wall");

  const items = [
    {
      label: (
        <Flex
          onClick={() => {
            router.push("/configure/wall");
            handleBeforeUnload();
          }}
          gap={4}
          vertical
          align="center"
        >
          <YourWall
            size={22}
            color={pathName === "/configure/wall" ? "#406AFF" : "#A2A2A2"}
          />
          Your Wall
        </Flex>
      ),
      key: "/configure/wall",
    },
    {
      label: (
        <Flex
          onClick={() => {
            router.push("/configure/analytics");
            handleBeforeUnload();
          }}
          gap={4}
          vertical
          align="center"
        >
          <Analytics
            size={22}
            color={pathName === "/configure/analytics" ? "#406AFF" : "#A2A2A2"}
          />
          Analytics
        </Flex>
      ),
      key: "/configure/analytics",
    },
    {
      label: (
        <Flex
          onClick={() => {
            router.push("/configure/collection");
            handleBeforeUnload();
          }}
          gap={4}
          vertical
          align="center"
        >
          <Collection
            size={22}
            color={pathName === "/configure/collection" ? "#406AFF" : "#A2A2A2"}
          />
          Collection
        </Flex>
      ),
      key: "/configure/collection",
    },
  ];

  useEffect(() => {
    const currentRoute = pathName;
    const selectedItem = items.find((item) => currentRoute.includes(item.key));
    if (selectedItem && selectedTab !== selectedItem.key) {
      setSelectedTab(selectedItem.key);
    }
  }, [pathName]);

  const handleTabClick = (key: string) => {
    setSelectedTab(key);
  };

  return (
    <div className={`${style.bottomTab} screenWidth`}>
      <Tabs
        tabPosition="bottom"
        items={items}
        activeKey={selectedTab}
        onTabClick={handleTabClick}
        centered={false}
      />
    </div>
  );
};

export default BottomTabs;
