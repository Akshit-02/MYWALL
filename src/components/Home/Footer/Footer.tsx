"use client";

import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <div className={styles.footerContainer}>
        <div className={styles.row1}>
          <div className={styles.social}>
            <div className={styles.logo}>
              <Link href={"/home"}>
                <Image
                  src="/images/svg/mywall_white.svg"
                  alt="logo"
                  width={150}
                  height={50}
                />
              </Link>
            </div>
            <div className={styles.findUs}>
              <p>Find Us Online</p>
              <div className={styles.icons}>
                {/* <Link href={"#"}>
                  <Image
                    src="/images/svg/facebook.svg"
                    alt="facebook"
                    height={36}
                    width={36}
                  />
                </Link> */}
                <Link
                  href={"https://www.instagram.com/mywall.me/"}
                  target="_blank"
                >
                  <Image
                    src="/images/svg/instagram.svg"
                    alt="instagram"
                    height={38}
                    width={38}
                  />
                </Link>
                <Link
                  href={"https://www.youtube.com/@mywallofficial"}
                  target="_blank"
                >
                  <Image
                    src="/images/svg/youtube.svg"
                    alt="youtube"
                    height={42}
                    width={42}
                  />
                </Link>

                <Link href={"https://x.com/Mywallofficial"} target="_blank">
                  <Image
                    src="/images/svg/twitter.svg"
                    alt="twitter"
                    height={34}
                    width={34}
                  />
                </Link>
                {/* <Link
                  href={"https://www.linkedin.com/company/mywallmedia/"}
                  target="_blank"
                >
                  <Image
                    src="/images/svg/linkedin.svg"
                    alt="linkedin"
                    height={36}
                    width={36}
                  />
                </Link> */}
                <Link
                  href={"https://api.whatsapp.com/send?phone=971563043657"}
                  target="_blank"
                >
                  <Image
                    src="/images/svg/whatsapp.svg"
                    alt="whatsapp"
                    height={38}
                    width={38}
                  />
                </Link>
              </div>
            </div>
            <div className={styles.payments}>
              <p>Powered By</p>
              <Image
                src={"/images/svg/stripe.svg"}
                alt="stripe"
                height={40}
                width={60}
              />
            </div>
          </div>
          <div className={styles.contactWrapper}>
            <p className={styles.contact}>Contact Us</p>
            <div className={styles.email}>
              <Image
                src={"/images/svg/mail.png"}
                alt="mail"
                height={24}
                width={24}
              />
              <Link href={"mailto:contact@mywall.me"} className={styles.mail}>
                contact@mywall.me
              </Link>
            </div>

            <div className={styles.address}>
              <div className={styles.locationContainer}>
                <p>USA</p>
                <div className={styles.location}>
                  <Image
                    src={"/images/svg/location.png"}
                    alt="location"
                    height={24}
                    width={24}
                  />
                  <p className={styles.address}>
                    3194, 201 E Center St Ste 112, Anaheim, CA 92805 United
                    States
                  </p>
                </div>
              </div>
              <div className={styles.locationContainer}>
                <p>UAE</p>
                <div className={styles.location}>
                  <Image
                    src={"/images/svg/location.png"}
                    alt="location"
                    height={24}
                    width={24}
                  />
                  <p className={styles.address}>
                    Sapphire Tower, AL Ittihad Rd, 303, Port Saeed - Deira -
                    Dubai - United Arab Emirates
                  </p>
                </div>
              </div>
            </div>

            {/* <div className={styles.phone}>
              <Image
                src={"/images/svg/phone.png"}
                alt="phone"
                height={24}
                width={24}
              />
              <div className={styles.numbersDiv}>
                <Link href={"tel:+919899537363"} className={styles.number}>
                  +91 9899537363
                </Link>
                ,
                <Link href={"tel:+919917486405"} className={styles.number}>
                  +91 9917486405
                </Link>
              </div>
            </div> */}
          </div>
          {/* <div className={styles.services}>Services</div> */}
        </div>

        <div className={styles.row2}>
          <div className={styles.copyright}>
            <p>© 2022 mywall, All Rights Reserved.</p>
          </div>
          <div className={styles.terms}>
            <Link href={"/privacy-policy"} className={styles.footerLinks}>
              Terms & Conditions
            </Link>
            <Link href={"/privacy-policy"} className={styles.footerLinks}>
              Privacy Policy
            </Link>
            {/* <Link href={"#"} className={styles.footerLinks}>
              Disclaimer
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
