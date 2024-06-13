"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";
import { Auth } from "aws-amplify";

export default function ValidateAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const { onBoarding } = useSelector((state: any) => state.onboarding);

  const unauthorizedRoute = (route: string): string => {
    const routeMapper: { [key: string]: string } = {
      "/": "/home",
      "/login": "/login",
      "/register": "/register",
      "/login/forgot-password": "/login/forgot-password",
    };

    return routeMapper[route] || "/login";
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      if (
        pathName === "/" ||
        pathName.startsWith("/configure") ||
        pathName.startsWith("/login") ||
        pathName === "/register"
      ) {
        if (!isAuth) {
          router.push(unauthorizedRoute(pathName));
          return;
        } else {
          if (onBoarding.profileStatusCode === "done") {
            if (
              pathName.includes("/configure/profile") ||
              pathName === "/" ||
              pathName === "/login" ||
              pathName === "/register"
            ) {
              router.push("/configure/wall");
            }
          } else if (onBoarding.profileStatusCode === "step2") {
            router.push("/configure/profile/user-details");
          } else if (onBoarding.profileStatusCode === "step1") {
            router.push("/configure/profile/claim-slug");
          }
        }
      }
    };
    checkAuth();
  }, [pathName]);

  useEffect(() => {
    if (onBoarding?.themeColor)
      document.documentElement.style.setProperty(
        "--primary-color",
        onBoarding?.themeColor
      );
  }, [onBoarding?.themeColor]);

  const isAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user && !onBoarding.id) {
        const id = `${user.attributes.sub}:` + `:${user.username}`;
        dispatch({
          type: onboardingSagaActions.SET_ID,
          payload: id,
        });
      }
      return !!user;
    } catch (error) {
      console.log("Auth Error", error);
      return false;
    }
  };

  return <div></div>;
}
