"use client";

import React from "react";
import styles from "./Squad.module.scss";
import Image from "next/image";

const Squad = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Join The Squad</h1>
          <p>
            Join a community reshaping the digital landscape. Be part of the My
            Wall revolution.
          </p>
        </div>

        <div className={styles.marquee}>
          <ul className={styles.marqueeContent}>
            <li>
              <Image
                src={"/images/png/mywall-squad-1.png"}
                alt=""
                width={185}
                height={185}
              />
              <div className={styles.userCountry}>
                <p>Chris Burkard</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    src={"/images/png/india.png"}
                    alt=""
                    height={20}
                    width={20}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-2.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>Bola Sokunbi</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-3.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>Rochelle Johnson</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-4.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>AVA</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            {/*  */}
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-1.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>Chris Burkard</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-2.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>Bola Sokunbi</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-3.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>Rochelle Johnson</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-4.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>AVA</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            {/*  */}
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-1.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>Chris Burkard</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-2.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>Bola Sokunbi</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-3.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>Rochelle Johnson</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
            <li>
              <Image
                height={185}
                width={185}
                src={"/images/png/mywall-squad-4.png"}
                alt=""
              />
              <div className={styles.userCountry}>
                <p>AVA</p>
                <div className={styles.userCountryWrapper}>
                  <Image
                    height={20}
                    width={20}
                    alt=""
                    src={"/images/png/india.png"}
                  />
                  <span>Comedy</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Squad;
