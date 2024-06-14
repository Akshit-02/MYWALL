"use client";

import styles from "@/components/Footer/Footer.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <div
      className={styles.footer}
      onClick={() => {
        router.push("/home");
      }}
    >
      <Image
        height={80}
        width={125}
        alt="mywall"
        src="/assets/svg/mywallLogo.svg"
        loading="lazy"
      />
    </div>
  );
}
