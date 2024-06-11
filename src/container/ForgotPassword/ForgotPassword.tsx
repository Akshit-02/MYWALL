"use client";

import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import { Auth } from "aws-amplify";
import Image from "next/image";
import { Button, Flex, Form, Input } from "antd";

const ForgotPasswordForm = () => {
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    code: "",
    password: "",
  });

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleForgotPassword = async () => {
    try {
      const codeDetails = await Auth.forgotPassword(data.email);
      // await Auth.forgotPassword(email);
      setStage(1);
    } catch (error) {
      console.error("Error sending forgot password request", error);
    }
  };

  // const handleConfirmPassword = async () => {
  //   try {
  //     await Auth.forgotPasswordSubmit(email, code, newPassword);
  //     setStage(0);
  //   } catch (error) {
  //     console.error("Error resetting password", error);
  //   }
  // };
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
      <div className={styles.header}>Forgot Password </div>
      {stage === 0 && (
        <div>
          <Form
            layout="vertical"
            onFinish={handleForgotPassword}
            autoComplete="off"
            size="large"
            requiredMark={false}
          >
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

            <Form.Item className={styles.formItem}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ padding: "0rem 4rem " }}
                loading={loading}
              >
                Send Code
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {stage === 1 && (
        <div>
          <Form
            layout="vertical"
            // onFinish={handleConfirmPassword}
            autoComplete="off"
            size="large"
            requiredMark={false}
          >
            <Flex vertical>
              <Form.Item
                name="code"
                label={<span className={styles.label}>Code</span>}
                rules={[{ required: true, message: "Please enter the code!" }]}
                className={styles.formItem}
              >
                <Input
                  name="code"
                  placeholder="Enter the code"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label={<span className={styles.label}>New Password</span>}
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

            <Form.Item className={styles.formItem}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
