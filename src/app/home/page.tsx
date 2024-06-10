"use client";

import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import Navbar from "@/components/Home/Navbar/Navbar";
import Section1 from "@/components/Home/Section1/Section1";

const Squad = dynamic(() => import("@/components/Home/Squad/Squad"), {
  ssr: false,
});
const Stats = dynamic(() => import("@/components/Home/Stats/Stats"), {
  ssr: false,
});
const WhyChooseMyWall = dynamic(
  () => import("@/components/Home/WhyChooseMyWall/WhyChooseMyWall"),
  { ssr: false }
);
const Steps = dynamic(() => import("@/components/Home/Steps/Steps"), {
  ssr: false,
});
const StepsDesktop = dynamic(
  () => import("@/components/Home/StepsDesktop/StepsDesktop"),
  {
    ssr: false,
  }
);
const StepsMobile = dynamic(
  () => import("@/components/Home/StepsMobile/StepsMobile")
);
const Walls = dynamic(() => import("@/components/Home/Walls/Walls"), {
  ssr: false,
});
const Creator = dynamic(() => import("@/components/Home/Creator/Creator"), {
  ssr: false,
});
const ContactUs = dynamic(() => import("@/components/ContactUs/ContactUs"), {
  ssr: false,
});
const FAQ = dynamic(() => import("@/components/Home/FAQ/FAQ"), { ssr: false });
const Footer = dynamic(() => import("@/components/Home/Footer/Footer"), {
  ssr: false,
});

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = "MyWall - Home";

    return () => {
      document.title = "MyWall";
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="home-container">
      <Navbar />
      <div className={styles.sections}>
        <div>
          <Section1 />
          {/* <Squad /> */}
          <Stats />
        </div>
        <WhyChooseMyWall />
        <div>
          <StepsDesktop />
          {/* {isMobile ? <StepsMobile /> : <StepsDesktop />} */}
          <Walls />
          <Creator />
        </div>
        <div>
          <FAQ />
          <ContactUs />
          <Footer />
        </div>
      </div>
      <div className={styles.stickyIcons}>
        <div className={styles.whatsapp}>
          <Link
            target="_blank"
            href={"https://api.whatsapp.com/send?phone=971563043657"}
            prefetch={false}
            className={styles.whatsappBtn}
          >
            <Image
              src={"/images/svg/whatsapp-white.svg"}
              alt="whatsapp"
              height={28}
              width={28}
            />
          </Link>
        </div>
        <div className={styles.up} onClick={handleScroll}>
          <Image src={"/images/svg/top.svg"} alt="top" height={30} width={30} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
