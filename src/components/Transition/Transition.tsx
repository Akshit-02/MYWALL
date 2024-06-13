"use client";

import React from "react";
import styles from "@/components/Transition/Transition.module.scss";

export default function transition<P>(Component: React.ComponentType<P>) {
  return function TransitionComponent(
    props: P & React.ComponentPropsWithoutRef<"div">
  ) {
    return (
      <div className={styles.transitionEffect}>
        <Component {...props} />
      </div>
    );
  };
}
