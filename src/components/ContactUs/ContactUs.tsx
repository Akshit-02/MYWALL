"use client";

import React, { useState } from "react";
import styles from "./ContactUs.module.scss";
import Link from "next/link";
import Image from "next/image";
import { sendContactFormData } from "@/store/sagas/handlers/configure.handle";
import { Button } from "antd";

const ContactUs = () => {
  const [contactFormData, setContactFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { firstName, lastName, email, phone } = contactFormData;
    if (!firstName || !lastName || !email || !phone) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: any) => {
    console.log("click");
    // event.preventDefault();
    if (!validateForm()) {
      alert(
        "Please fill in all required fields: First Name, Last Name, Email, Phone Number."
      );
      return;
    }
    setLoading(true);
    try {
      await sendContactFormData(contactFormData);
      setShowResult(true);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.container} id="contactUs">
      <div className={styles.header}>
        <h1>Contact Us</h1>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.left}>
          <div className={styles.content}>
            <h3>Get in touch with us</h3>
            <p>
              We would love to hear from you. Please fill out the form and we
              will get back to you as soon as possible.
            </p>
          </div>
          <div className={styles.icons}>
            <Link href={"https://www.instagram.com/mywall.me/"} target="_blank">
              <Image
                src="/images/svg/instagram.svg"
                alt="instagram"
                height={38}
                width={38}
              />
            </Link>
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
        <div className={styles.right}>
          {!showResult && (
            <div className={styles.form}>
              <div className={styles.form}>
                <div className={styles.names}>
                  <div className={styles.fields}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      className={styles.inputTag}
                      value={contactFormData.firstName}
                      onChange={(e) =>
                        setContactFormData({
                          ...contactFormData,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.fields}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      className={styles.inputTag}
                      value={contactFormData.lastName}
                      onChange={(e) =>
                        setContactFormData({
                          ...contactFormData,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.contactDetails}>
                    <div className={styles.fields}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className={styles.inputTag}
                        value={contactFormData.email}
                        onChange={(e) =>
                          setContactFormData({
                            ...contactFormData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className={styles.fields}>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        pattern="[0-9]*"
                        required
                        className={styles.inputTag}
                        value={contactFormData.phone}
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^[0-9+]*$/;
                          if (regex.test(value)) {
                            setContactFormData({
                              ...contactFormData,
                              phone: value,
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.fields}>
                  <label htmlFor="message">Message</label>
                  <input
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Write your message..."
                    className={styles.inputTag}
                    value={contactFormData.message}
                    onChange={(e) =>
                      setContactFormData({
                        ...contactFormData,
                        message: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.sendBtnDiv}>
                  <Button
                    loading={loading}
                    onClick={handleSubmit}
                    type="primary"
                    size="large"
                    style={{
                      backgroundColor: "#000",
                      width: "fit-content",
                    }}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          )}
          {showResult && (
            <div className={styles.result}>
              <div>
                <Image
                  src="/images/svg/success.svg"
                  alt="success"
                  height={100}
                  width={100}
                />
              </div>
              <div className={styles.content}>
                <p>Email sent successfully.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
