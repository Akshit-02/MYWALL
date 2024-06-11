"use client";
import { useSelector } from "react-redux";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import styles from "./Avatar.module.scss";
import { AuthType } from "@/store/slices/auth/authSlice";
import Image from "next/image";
import transition from "@/components/Transition/Transition";

function Avatar() {
  const { userDetail } = useSelector((state: AuthType) => state.auth);

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.userSection}>
        <Image
          src={
            userDetail.profilePictureWithoutBg
              ? getPublicURL(userDetail.profilePictureWithoutBg)
              : "/assets/png/maleUser.png"
          }
          placeholder="blur"
          blurDataURL="/assets/png/maleUser.png"
          alt={userDetail?.name || "User picture"}
          className={styles.avatar}
          height={100}
          width={400}
          quality={75}
          priority
        />
      </div>
    </div>
  );
}
export default transition(Avatar);
