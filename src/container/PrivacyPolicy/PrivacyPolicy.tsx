"use client";
import React from "react";
import styles from "./PrivacyPolicy.module.scss";
import Link from "next/link";

export const PrivacyPolicy = (): React.ReactElement => {
  return (
    <div className="pageWidth">
      <h1 className={styles.title}>Privacy Policy</h1>

      <div className={styles.privacyPage}>
        My Wall is committed to protecting the privacy and security of your
        personal information. This privacy policy outlines how we collect, use,
        and protect your data when you use the My Wall app ("the App").
        Information We Collect:
        <p className={styles.bold}>Google User Permission</p>
        Mywall’s use and transfer to any other app of information received from
        Google APIs will adhere to{" "}
        <Link href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </Link>
        , including the Limited Use requirements.
        <p className={styles.bold}>Personal Information:</p>
        We may collect personal information, such as your name, email address,
        and social media links when you sign up for an account on the App.
        Social Media Data: With your explicit consent, we may import data from
        your Instagram and YouTube accounts, such as followers count, posts,
        videos, and engagement metrics. Usage Data: We may collect non-personal
        information about your interactions with the App, such as device
        information, IP address, and browser type.{" "}
        <p className={styles.bold}>How We Use Your Information:</p>
        Personal Information: We use your personal information to create and
        manage your account, communicate with you, and provide customer support.
        Social Media Data: The imported data from your Instagram and YouTube
        accounts is used to display relevant information on your My Wall landing
        page. Usage Data: We may use aggregated and anonymized usage data for
        analytics and to improve the App's performance and user experience.
        <p className={styles.bold}>Data Sharing:</p> We will not sell, rent, or
        lease your personal information to third parties. Your social media data
        will only be shared with the necessary APIs and services to display the
        relevant information on your landing page. We may share anonymised and
        aggregated usage data with third parties for marketing, analytics, or
        research purposes. <p className={styles.bold}>Data Security:</p> We
        implement industry-standard security measures to protect your data from
        unauthorised access, alteration, or disclosure. Despite our best
        efforts, no method of transmission or storage is completely secure. We
        cannot guarantee the absolute security of your data.
        <p className={styles.bold}>Data Retention:</p> We will retain your
        personal information for as long as necessary to provide the services
        requested or as required by law. You can request the deletion of your
        account and associated data by contacting us at washib@grynow.in
        <p className={styles.bold}>Your Choices:</p> You can control the data
        you provide and revoke the app's access to your social media accounts at
        any time. You may update or correct your personal information through
        your My Wall account settings.{" "}
        <p className={styles.bold}>Children's Privacy:</p>
        The App is not intended for use by individuals under the age of 6. We do
        not knowingly collect personal information from children.{" "}
        <p className={styles.bold}>Changes to Privacy Policy:</p> We may update
        this privacy policy from time to time. Any changes will be posted on
        this page, and we will notify you via email or within the App. Contact
        Us: If you have any questions, concerns, or requests regarding this
        privacy policy or your personal data, please contact us at{" "}
        <a href="mailto:washib@grynow.in" target="_blank">
          washib@grynow.in
        </a>
        By using the My Wall app, you consent to the practices outlined in this
        privacy policy. Date of Last Update: August 1, 2021
      </div>
    </div>
  );
};
