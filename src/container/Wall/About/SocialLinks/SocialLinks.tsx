import { useSelector } from "react-redux";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedln,
  Twitter,
  Youtube,
  Other,
  Snapchat,
  TikTok,
} from "@/utils/icons";
import styles from "./SocialLinks.module.scss";
import { AuthType } from "@/store/slices/auth/authSlice";
import { useEffect, useState } from "react";
import transition from "@/components/Transition/Transition";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { hexToRgba } from "@/utils/helperFunction";
import { handleBeforeUnload } from "@/utils/useScrollRestoration";

type SocialLinksProp = {
  isEditable?: boolean;
};

function SocialLinks({ isEditable }: SocialLinksProp) {
  const { userDetail } = useSelector((state: AuthType) => state.auth);
  const { socialLinks } = userDetail || {};
  const [hasLinks, setHasLinks] = useState(false);
  const {
    instagram,
    facebook,
    youtube,
    twitter,
    linkedIn,
    snapchat,
    tiktok,
    other,
  } = socialLinks || {};
  const router = useRouter();

  useEffect(() => {
    setHasLinks(
      !!(
        instagram ||
        facebook ||
        youtube ||
        twitter ||
        linkedIn ||
        snapchat ||
        tiktok ||
        other
      )
    );
  }, [socialLinks]);

  const socialLinksData = [
    { platform: "youtube", href: youtube, Icon: Youtube },
    { platform: "instagram", href: instagram, Icon: Instagram },
    { platform: "facebook", href: facebook, Icon: Facebook },
    { platform: "twitter", href: twitter, Icon: Twitter },
    { platform: "linkedIn", href: linkedIn, Icon: Linkedln },
    { platform: "snapchat", href: snapchat, Icon: Snapchat },
    { platform: "tiktok", href: tiktok, Icon: TikTok },
    { platform: "other", href: other, Icon: Other },
  ];

  return (
    <>
      {hasLinks && (
        <div className={styles.socialLinks}>
          {socialLinksData.map(
            ({ platform, href, Icon }) =>
              href && (
                <Link
                  key={platform}
                  target="_blank"
                  href={href}
                  aria-label={`Read more about ${userDetail?.name} in ${platform}`}
                >
                  <Icon
                    color={userDetail?.themeColor || "var(--primary-color)"}
                  />
                </Link>
              )
          )}
          {isEditable && (
            <div
              className={styles.editIcon}
              onClick={() => {
                router.push("/configure/edit-socials");
                handleBeforeUnload();
              }}
            >
              <Image
                src="/assets/svg/edit.svg"
                alt="edit"
                height={16}
                width={16}
              />
            </div>
          )}
        </div>
      )}

      {isEditable && !hasLinks && (
        <div
          onClick={() => {
            router.push("/configure/add-socials");
            handleBeforeUnload();
          }}
          className={styles.addSocialLinks}
        >
          <Button
            type="dashed"
            style={{
              borderColor: `{userDetail?.themeColor || "var(--primary-color)"}`,
              backgroundColor: hexToRgba(
                userDetail?.themeColor || "var(--primary-color)",
                0.1
              ),
            }}
          >
            + Add Social links
          </Button>
        </div>
      )}
    </>
  );
}
export default transition(SocialLinks);
