"use client";

import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Squash as Hamburger } from "hamburger-react";
import { scrollToSection } from "@/utils/helperFunction";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link href={"/home"} prefetch={false}>
            <Image
              src="/images/svg/mywall.svg"
              alt="logo"
              width={150}
              height={70}
              priority={true}
            />
          </Link>
        </div>
        <div className={styles.menu}>
          <Hamburger toggled={openMenu} toggle={setOpenMenu} />
        </div>
        <div className={styles.buttonContainer}>
          {/* <div>
            <Link href={"/tutorials"} className={styles.signInBtn}>
              Tutorials
            </Link>
          </div> */}
          {/* <div>
            <Link href={"/login"} className={styles.signInBtn}>
              Sign In
            </Link>
          </div> */}
          <div>
            <button className={styles.signUpBtn} onClick={scrollToSection}>
              Contact Us
              <span>
                <Image
                  src={"/images/svg/arrow.svg"}
                  height={12}
                  width={12}
                  alt="arrow"
                  className={styles.arrow}
                  priority={true}
                />
              </span>
            </button>
          </div>
          {/* <div>
            <Link href={"/register"} className={styles.signUpBtn}>
              Sign Up Now
              <span>
                <Image
                  src={"/images/svg/arrow.svg"}
                  height={12}
                  width={12}
                  alt="arrow"
                  className={styles.arrow}
                  priority={true}
                />
              </span>
            </Link>
          </div> */}
        </div>
      </div>
      {openMenu && (
        <div className={styles.menuItems}>
          {/* <Link href={"/tutorials"} className={styles.signInBtn}>
            Tutorials
          </Link> */}
          {/* <Link href={"/login"} className={styles.signInBtn}>
            Sign In
          </Link> */}
          {/* <Link href={"/register"} className={styles.signUpBtn}>
            Sign Up Now
            <span>
              <Image
                src={"/images/svg/arrow.svg"}
                height={12}
                width={12}
                alt="arrow"
                className={styles.arrow}
                priority={true}
              />
            </span>
          </Link> */}
          <button onClick={scrollToSection} className={styles.signUpBtn}>
            Contact Us
            <span>
              <Image
                src={"/images/svg/arrow.svg"}
                height={12}
                width={12}
                alt="arrow"
                className={styles.arrow}
                priority={true}
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
