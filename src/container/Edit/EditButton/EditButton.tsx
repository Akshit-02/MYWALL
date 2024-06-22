"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";
import styles from "./EditButton.module.scss";
import { CTAButton } from "@/models";
import type { MenuProps } from "antd";
import { Button, Dropdown, Flex, Form, Input, Switch } from "antd";
import { LinkOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import transition from "@/components/Transition/Transition";
import Toast from "@/components/Toast/Toast";
import { convertToTitleCase } from "@/utils/helperFunction";
import Header from "@/components/Header/Header";
type EditButton = {
  buttonData?: any;
  ctaButton: CTAButton[] | null;
  index: number;
};

function EditButton({ buttonData, ctaButton, index }: EditButton) {
  const { onBoarding } = useSelector((state: any) => state.onboarding);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    link: "",
    type: "",
    isActive: true,
  });
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setFormData(buttonData);
    form.setFieldsValue({
      text: buttonData?.text,
      link: buttonData?.link,
    });
  }, [buttonData]);

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };

  const submitButton = async () => {
    setLoading(true);
    try {
      if (!formData.text?.length) {
        return;
      }
      const modifyCtaButton = [...(ctaButton || [])];
      modifyCtaButton[index] = {
        text: formData.text,
        link: formData.link,
        isActive: formData.isActive,
        type: formData.type as any,
      };
      const payload = {
        id: onBoarding.id,
        ctaButton: modifyCtaButton,
      };
      dispatch({
        type: onboardingSagaActions.EDIT_USER,
        payload,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      showToast("Button updated successfully!", "success");
      router.push("/configure/wall");
    } catch (error) {
      console.error("error: ", error);
      showToast("Error occured!", "error");
    } finally {
      setLoading(false);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Link",
      key: "LINK",
      icon: getSVG("LINK"),
    },
    {
      label: "Email",
      key: "EMAIL",
      icon: getSVG("EMAIL"),
    },
    {
      label: "Contact",
      key: "CONTACT",
      icon: getSVG("CONTACT"),
    },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    setFormData({
      ...formData,
      type: key,
    });
  };

  return (
    <>
      <div className={`${styles.editButtonContainer} pageWidth`}>
        <Header title="Edit Button" />

        <div>
          <Form
            layout="vertical"
            size="large"
            onFinish={submitButton}
            requiredMark={false}
            autoComplete="off"
            form={form}
          >
            <Flex vertical>
              <Form.Item
                name="text"
                label={<span style={{ fontWeight: 600 }}>Button Text</span>}
                rules={[
                  { required: true, message: "Please enter button text!" },
                ]}
              >
                <Input
                  name="text"
                  placeholder="Add button text here"
                  value={formData?.text}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                name="link"
                label={
                  <span style={{ fontWeight: 600 }}>
                    {convertToTitleCase(formData?.type)}
                  </span>
                }
                rules={[{ required: true, message: "Please fill this field!" }]}
                // rules={[
                //   {
                //     validator: async (rule, value) => {
                //       let errorMessage = "";
                //       if (formData.type === "LINK") {
                //         // Validate URL
                //         const urlRegex =
                //           /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                //         if (!urlRegex.test(value)) {
                //           errorMessage = "Please enter a valid URL!";
                //         }
                //       } else if (formData.type === "EMAIL") {
                //         // Validate Email
                //         const emailRegex =
                //           /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                //         if (!emailRegex.test(value)) {
                //           errorMessage = "Please enter a valid email!";
                //         }
                //       } else if (formData.type === "CONTACT") {
                //         // Validate Phone Number
                //         const phoneRegex = /^\+?[1-9]\d{1,14}$/;
                //         if (!phoneRegex.test(value)) {
                //           errorMessage = "Please enter a valid phone number!";
                //         }
                //       }

                //       if (errorMessage) {
                //         return Promise.reject(errorMessage);
                //       } else {
                //         return Promise.resolve();
                //       }
                //     },
                //   },
                // ]}
              >
                <Input
                  name="link"
                  placeholder={`Add your ${(
                    formData?.type || ""
                  ).toLowerCase()} here`}
                  onChange={handleInputChange}
                  value={formData?.link}
                  prefix={getSVG(formData?.type)}
                  suffix={
                    <Dropdown
                      menu={{
                        items,
                        onClick,
                      }}
                      placement="bottomRight"
                      arrow
                      trigger={["click"]}
                    >
                      <Image
                        alt="down"
                        src={"/assets/svg/backArrow.svg"}
                        height={24}
                        width={24}
                        className={styles.downIcon}
                      />
                    </Dropdown>
                  }
                />
              </Form.Item>
              <Form.Item name="isAcive">
                <Flex gap="0.5rem">
                  <Switch
                    checked={formData?.isActive}
                    onChange={() => {
                      setFormData({
                        ...formData,
                        isActive: !formData?.isActive,
                      });
                    }}
                  />
                  <div className={styles.strong}>Show on Wall</div>
                </Flex>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Done
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </div>
        {toast.toastDisplay && (
          <Toast
            toastDisplay={toast.toastDisplay}
            toastMessage={toast.toastMessage}
            toastType={toast.toastType}
          />
        )}
      </div>
    </>
  );
}

const getSVG = (value: string): any => {
  const svgMapper: { [key: string]: any } = {
    link: <LinkOutlined style={{ fontSize: "16px" }} />,
    contact: (
      <PhoneOutlined style={{ transform: "rotate(90deg)", fontSize: "16px" }} />
    ),
    email: <MailOutlined style={{ fontSize: "14px" }} />,
  };
  return svgMapper[value?.toLowerCase()];
};

export default transition(EditButton);
