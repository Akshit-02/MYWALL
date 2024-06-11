"use client";

import React, { useState } from "react";
import styles from "./LoginForm.module.scss";
import Image from "next/image";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Flex, Form, Input } from "antd";
import { Auth } from "aws-amplify";
import Toast from "@/components/Toast/Toast";
import transition from "@/components/Transition/Transition";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const onFinish = async () => {
    setLoading(true);
    try {
      const user = await Auth.signIn(data?.email, data?.password);

      router.push("/");
    } catch (error) {
      console.log("error signing in:", error);
      if (
        error instanceof Error &&
        error.message.includes("Incorrect username or password.")
      ) {
        showToast("Invalid email or password", "warning");
      }
      if (
        error instanceof Error &&
        error.message.includes("Password attempts exceeded")
      ) {
        showToast("Maximum attempts reached. Try again later!", "warning");
      }
      if (
        error instanceof Error &&
        error.message.includes("User does not exist")
      ) {
        showToast("No user found. Register now!", "warning");
      }
    } finally {
      setLoading(false);
    }
  };

  const createAccount = (provider: string) => {
    dispatch({
      type: onboardingSagaActions.CREATE_AWS_ACCOUNT,
      payload: {
        provider,
      },
    });
  };

  return (
    <div className={`${styles.container} pageWidth`}>
      <div className={styles.logo}>
        <Image
          height={120}
          width={120}
          className={styles.mywallIcon}
          alt="mywall"
          src="/assets/svg/mywallLogo.svg"
        />
      </div>
      <div className={styles.header}>Hi, Welcome Back! </div>
      <div className={styles.registrationForm}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
          requiredMark={false}
        >
          <Flex vertical>
            <Form.Item
              name="email"
              label={<span className={styles.label}>Email</span>}
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
              className={styles.formItem}
            >
              <Input
                name="email"
                placeholder="Enter Your Email"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              style={{ marginBottom: "28px" }}
            >
              <Input.Password
                name="password"
                placeholder="Enter Your Password"
                onChange={handleChange}
              />
            </Form.Item>
          </Flex>

          {/* <Flex justify="flex-end">
            <Form.Item className={styles.formItem}>
              <Button
                type="link"
                onClick={() => router.push("/login/forgot-password")}
              >
                Forgot Password?
              </Button>
            </Form.Item>
          </Flex> */}
          <Form.Item className={styles.formItem}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ padding: "0rem 4rem " }}
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.connectDiv}>
          <p>
            <span>Or Connect With</span>
          </p>
        </div>
        <div
          className={styles.continueWithGoogleLeft}
          onClick={() => createAccount("Google")}
        >
          <Image
            className={styles.googleLogoIcon}
            alt="Google icon"
            src="/assets/png/google.png"
            width={50}
            height={50}
          />

          <span className={styles.continueWithGoogle}>
            Continue with Google
          </span>
        </div>
        <div className={styles.footer}>
          <p className={styles.footerMsg}>
            Don't have an account ?{" "}
            <span
              className={styles.footerLink}
              onClick={() => router.push("/register")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
      {toast.toastDisplay && (
        <Toast
          toastDisplay={toast.toastDisplay}
          toastMessage={toast.toastMessage}
          toastType={toast.toastType}
        />
      )}
    </div>
  );
};

export default transition(LoginForm);
