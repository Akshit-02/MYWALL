"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBySlug } from "@/store/sagas/requests/auth.request";
import styles from "./ClaimName.module.scss";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Flex, Form, Input } from "antd";
import transition from "@/components/Transition/Transition";
import { LogoutOutlined } from "@ant-design/icons";
import { Auth } from "aws-amplify";

function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
function ClaimName() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { onBoarding } = useSelector((state: any) => state.onboarding);
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestedName, setSuggestedName] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (onBoarding?.profileStatusCode !== "step1") {
      setUserName(onBoarding.slug);
    }
  }, []);

  const debouncedValidator = debounce(
    async (rule: any, value: string, callback: (message?: string) => void) => {
      if (!value) return callback();
      const userData = await getUserBySlug(value);
      if (userData) {
        callback("Username is already taken. Please try something else!");
      } else {
        const regex = /^[a-zA-Z0-9._]{1,30}$/;
        if (!regex.test(value)) {
          callback("Invalid username. Please try something else!");
        } else {
          callback();
        }
      }
    },
    1000
  );

  useEffect(() => {
    if (onBoarding?.profileStatusCode === "step2") {
      router.push("/configure/profile/user-details");
    }
  }, [onBoarding]);

  const handleContinue = async () => {
    setLoading(true);
    try {
      dispatch({
        type: onboardingSagaActions.EDIT_USER,
        payload: {
          slug: userName,
          id: onBoarding.id,
          profileStatusCode: "step2",
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  async function suggestUsernames(name: string) {
    const regex = /^[a-zA-Z0-9._]{1,30}$/;
    const processedName = name.toLowerCase().replace(/[^a-zA-Z0-9._]/g, "");
    const usernames = [];
    for (let i = 0; i < 3; i++) {
      const randomNum = Math.floor(Math.random() * 1000);
      const username = processedName + randomNum;
      const user = await getUserBySlug(username);
      if (user === null && regex.test(username)) {
        usernames.push(username);
      } else {
        const newRandomNum = Math.floor(Math.random() * 1000);
        const newUsername = processedName + newRandomNum;
        usernames.push(newUsername);
      }
    }
    setSuggestedName(usernames);
  }

  useEffect(() => {
    if (onBoarding?.name) {
      suggestUsernames(onBoarding?.name);
    }
  }, [onBoarding?.name]);

  const handleLogout = async () => {
    dispatch({
      type: onboardingSagaActions.SET_ID,
      payload: "",
    });
    await Auth.signOut();
    window.location.href = "/login";
    localStorage.clear();
  };
  return (
    <>
      <div className={`${styles.container} pageWidth`}>
        <div className={styles.logoutBtn}>
          <Button
            onClick={() => {
              handleLogout();
            }}
            className={styles.iconWrapper}
          >
            <LogoutOutlined />
          </Button>
        </div>
        <div className={styles.mywallParent}>
          <Image
            height={150}
            width={150}
            className={styles.mywallIcon}
            alt="mywall"
            src="/assets/svg/mywallLogo.svg"
          />
        </div>
        <div className={styles.header}>Claim MyWall Link</div>
        <div className={styles.inputWrapper}>
          <Form
            onFinish={handleContinue}
            autoComplete="off"
            size="large"
            form={form}
          >
            <Flex vertical gap={8}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  {
                    validator: (rule, value, callback) => {
                      debouncedValidator(rule, value, callback);
                    },
                  },
                ]}
                initialValue={userName}
                hasFeedback
                style={{ marginBottom: "16px" }}
              >
                <Input
                  name="username"
                  addonBefore="mywall.me/"
                  placeholder="username"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value?.toLowerCase());
                  }}
                />
              </Form.Item>
              {!!suggestedName?.length && (
                <div className={styles.suggestion}>
                  <p className={styles.suggestionHeader}>Suggested:</p>
                  <div className={styles.suggestionContainer}>
                    {suggestedName?.map((name) => (
                      <div
                        key={name}
                        onClick={() => {
                          setUserName(name);
                          form.setFieldsValue({
                            username: name,
                          });
                        }}
                        className={`${styles.suggestionItem} ${
                          userName === name ? styles.selected : ""
                        }`}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </div>
      </div>
    </>
  );
}

export default transition(ClaimName);
