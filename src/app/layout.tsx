import React from "react";
import type { Metadata } from "next";
import { Providers } from "@/store/Provider";
import styles from "@/app/layout.module.scss";
import "../../public/static/global.css";
import {
  inter,
  interBold,
  interSemiBold,
  outfit,
} from "../../public/static/fonts";
import ValidateAuth from "@/components/ValidateAuth/ValidateAuth";
import { Amplify, Auth } from "aws-amplify";
import {
  GOOGLE_ANALYTICS_ID,
  REDIRECT_SIGN_IN_URI,
  REDIRECT_SIGN_OUT_URI,
} from "@/config";
import awsExport from "@/config/aws-export";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Script from "next/script";

Amplify.configure({
  ...awsExport,
  oauth: {
    ...awsExport.oauth,
    redirectSignIn: REDIRECT_SIGN_IN_URI,
    redirectSignOut: REDIRECT_SIGN_OUT_URI,
  },
  ssr: true,
});

Auth.configure({
  ...awsExport,
});

export const metadata: Metadata = {
  title: "MyWall",
  description: "MyWall",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interBold.variable} ${interSemiBold.variable} ${outfit.variable} `}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, shrink-to-fit=no"
        />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://static.doubleclick.net" />
        <link rel="preconnect" href="https://d22vvmkoiygrv8.cloudfront.net" />
        <link rel="preconnect" href="https://dghiinrvmhb25.cloudfront.net" />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        ></Script>
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </head>
      <body className={styles.body}>
        <div className={styles.wrapper}>
          {/* <ErrorBoundary> */}
          <Providers>
            <ValidateAuth />
            {children}
          </Providers>
          {/* </ErrorBoundary> */}
        </div>
      </body>
    </html>
  );
}
