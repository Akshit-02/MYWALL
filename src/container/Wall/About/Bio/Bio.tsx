import { useSelector } from "react-redux";
import React from "react";
import styles from "./Bio.module.scss";
import { AuthType } from "@/store/slices/auth/authSlice";
import transition from "@/components/Transition/Transition";
import parse from "html-react-parser";

function Bio(props: any) {
  const isThemeDark = props?.isThemeDark || false;
  const { userDetail } = useSelector((state: AuthType) => state.auth);

  return (
    <div>
      {!!userDetail?.bio?.length && (
        <div
          className={styles.bio}
          style={{
            color: `${
              isThemeDark ? "var(--light-font-color)" : "var(--dark-font-color)"
            }`,
          }}
        >
          {userDetail?.bio ? parse(userDetail?.bio) : ""}
        </div>
      )}
    </div>
  );
}
export default transition(Bio);
