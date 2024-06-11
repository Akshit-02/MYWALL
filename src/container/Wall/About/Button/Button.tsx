"use client";
import { useSelector } from "react-redux";
import styles from "./Button.module.scss";
import { AuthType } from "@/store/slices/auth/authSlice";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import transition from "@/components/Transition/Transition";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";

interface ButtonProps {
  isEditable?: boolean;
}

function Button(props: ButtonProps) {
  const { onBoarding } = useSelector((state: any) => state?.onboarding);
  const { userDetail } = useSelector((state: AuthType) => state.auth);

  const pathname = usePathname();

  const { ctaButton = [] } =
    onBoarding?.ctaButton && onBoarding.slug === userDetail.slug
      ? onBoarding
      : userDetail || {};

  const handleClick = (link: string) => {
    if (link && typeof window !== "undefined") {
      window.open(link, "_blank");
    }
  };

  return ctaButton?.length ? (
    <div className={styles.buttonDiv}>
      {ctaButton?.map(
        (buttons: any, index: number) =>
          (pathname.includes("configure")
            ? true
            : buttons.isActive && !!buttons?.link?.length) && (
            <div key={index} className={styles.buttonContainer}>
              <button
                className={!index ? styles.button : styles.buttonBorder}
                style={{ opacity: buttons.isActive ? "1" : "0.5" }}
                onClick={() => {
                  handleClick(
                    buttons.type === "LINK"
                      ? (buttons.link as string)
                      : buttons.type === "EMAIL"
                      ? `mailto:${buttons.link}`
                      : `tel:${buttons.link}`
                  );
                  handleBeforeUnload();
                }}
              >
                {buttons.text}
              </button>
              {props.isEditable && (
                <Link
                  href={{
                    pathname: `/configure/edit-button/${encodeURI(
                      index.toString()
                    )}`,
                  }}
                  onClick={handleBeforeUnload}
                >
                  <div className={styles.edit}>
                    <Image
                      src="/assets/svg/edit.svg"
                      alt="edit"
                      height={16}
                      width={16}
                    />
                  </div>
                </Link>
              )}
            </div>
          )
      )}
    </div>
  ) : (
    ""
  );
}
export default transition(Button);
