"use client";
import { useSelector } from "react-redux";
import styles from "./Namecard.module.scss";
import { AuthType } from "@/store/slices/auth/authSlice";
import transition from "@/components/Transition/Transition";

function Namecard() {
  const { userDetail } = useSelector((state: AuthType) => state.auth);

  return <div className={styles.nameCard}>{userDetail?.name}</div>;
}
export default transition(Namecard);
