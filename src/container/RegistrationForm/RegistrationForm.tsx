"use client";

import React, { useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import styles from "./RegistrationForm.module.scss";
import Image from "next/image";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Auth } from "aws-amplify";
import Toast from "@/components/Toast/Toast";
import transition from "@/components/Transition/Transition";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);

  const createAccount = (provider: string) => {
    dispatch({
      type: onboardingSagaActions.CREATE_AWS_ACCOUNT,
      payload: {
        provider,
      },
    });
  };

  const getNameFromEmail = async (email: string) => {
    const regex = /([a-zA-Z0-9._-]+)@/;
    const match = email.match(regex);
    return match ? match[1] : "user"; // Returns the name before the '@' or "user" if not found
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      const { user } = await Auth.signUp({
        username: data?.email,
        password: data?.password,
        attributes: {
          email: data?.email, // optional
          name: await getNameFromEmail(data?.email),
        },
        autoSignIn: {
          enabled: true,
        },
      });
      if (user) {
        const loggedInUser = await Auth.signIn(data?.email, data?.password);
        router.push("/");
      }
    } catch (error) {
      //add toast error
      console.log("error signing up:", error);
      if (
        error instanceof Error &&
        error.message.includes(
          "An account with the given email already exists."
        )
      ) {
        showToast("Email already registered!", "warning");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
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
      <div className={styles.header}>Create your MyWall for free</div>
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
                {
                  validator: (_, value) => {
                    if (
                      !value ||
                      /^(?=[a-zA-Z0-9#@$?]{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/.test(
                        value
                      )
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
                    );
                  },
                },
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

          <Form.Item className={styles.formItem}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Signup
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
            Already have an account?{" "}
            <span
              className={styles.footerLink}
              onClick={() => router.push("/login")}
            >
              Login
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

export default transition(RegistrationForm);
