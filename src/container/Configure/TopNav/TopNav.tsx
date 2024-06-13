"use client";
import React from "react";
import style from "./TopNav.module.scss";
import { useSelector } from "react-redux";
import { Flex } from "antd";
import {
  EyeOutlined,
  ShareAltOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { Auth } from "aws-amplify";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";
import { useDispatch } from "react-redux";
import Link from "next/link";

const TopNav = () => {

  const dispatch = useDispatch();
  const { onBoarding } = useSelector((state: any) => state.onboarding);

  const handleLogout = async () => {
    dispatch({
      type: onboardingSagaActions.SET_ID,
      payload: "",
    });
    await Auth.signOut();
    window.location.href = "/login";
    localStorage.clear();
  };
  
  return (
    <div className={`${style.bottomTab} screenWidth`}>
      <Flex justify="space-between">
        <div>
          <Image
            height={50}
            width={50}
            src="/assets/svg/myWallTop.svg"
            alt="logo"
          />
        </div>
        <Flex gap="1.5rem" justify="center" align="center">
          <Link href={`/${onBoarding.slug}`} target="_blank">
            <EyeOutlined className={style.icons} style={{ fontSize: "24px" }} />
          </Link>

          <ShareAltOutlined className={style.icons} />

          <LogoutOutlined
            onClick={() => {
              handleLogout();
            }}
            className={style.icons}
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default TopNav;
