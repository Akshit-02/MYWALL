"use client";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onboardingSagaActions } from "@/store/sagas/sagaActions/onboarding.actions";
import styles from "./Step1.module.scss";
import { Storage } from "aws-amplify";
import { Influencer } from "@/models";
import { getPublicURL } from "@/utils/getPublicImageUrl";
import { themeColors } from "@/utils/helperFunction";
import { Button, Flex, Form, Input, Upload } from "antd";
import type { UploadFile } from "antd";
import ImgCrop from "antd-img-crop";
import { Image } from "antd";
import transition from "@/components/Transition/Transition";
import { useRouter } from "next/navigation";
import { LogoutOutlined } from "@ant-design/icons";
import { Auth } from "aws-amplify";
import Toast from "@/components/Toast/Toast";
import Loader from "@/components/Loader/Loader";
import TextArea from "antd/es/input/TextArea";
import {
  BtnBold,
  BtnItalic,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";

type ProgressProp = {
  setDisplayStep: React.Dispatch<React.SetStateAction<boolean>>;
};

const Step1 = ({ setDisplayStep }: ProgressProp) => {
  const [toast, setToast] = useState({
    toastDisplay: "",
    toastMessage: "",
    toastType: "",
  });

  const dispatch = useDispatch();
  const inputRef: any = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  const { onBoarding }: { onBoarding: Influencer } = useSelector(
    (state: any) => state.onboarding
  );

  const [removeBgLoader, setRemoveBgLoader] = useState(false);
  const [profileWithBg, setProfileWithBg] = useState(
    onBoarding.profilePictureWithBg
  );
  const [profileWithoutBg, setProfileWithoutBg] = useState(
    onBoarding.profilePictureWithoutBg
  );

  const [name, setName] = useState(onBoarding.name);
  const [bio, setBio] = useState(onBoarding.bio?.replace(/\n/g, "<br>"));
  const [themeColor, setThemeColor] = useState(
    onBoarding.themeColor ?? "#0fa1de"
  );
  const [country, setCountry] = useState(onBoarding.address?.country);
  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [city, setCity] = useState(onBoarding.address?.city);
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "1",
      name: onBoarding.profilePictureWithBg as string,
      url: getPublicURL(onBoarding.profilePictureWithBg as string),
    },
  ]);

  const showToast = (message: string, type: string) => {
    setToast({
      toastDisplay: Date.now().toString(),
      toastMessage: message,
      toastType: type,
    });
  };

  const handleColorChange = (color: string) => {
    setThemeColor(color);
  };

  const customRequest = async ({ file }: any) => {
    try {
      if (!file) {
        return;
      }

      setRemoveBgLoader(true);

      const fileName = `profile/${onBoarding.slug}-bg${file.uid}`;

      // Perform the upload to S3 or another storage service
      // This is a placeholder for the actual upload logic
      const uploadResponse = await Storage.put(fileName, file, {
        contentType: file.type,
        level: "public",
      });

      if (uploadResponse) {
        setRemoveBgLoader(true);
        setProfileWithBg(`public/profile/${onBoarding.slug}-bg${file.uid}`);
      }
    } catch (error) {
      setRemoveBgLoader(false);
      setProfileWithBg("");
    } finally {
      setRemoveBgLoader(false);
    }
  };

  const isDisabled = !name || !profileWithBg;

  const handleContinue = async () => {
    if (!profileWithBg) {
      showToast("Please upload profile picture", "error");
      return;
    } else {
      setBtnLoading(true);
      try {
        const payload: Influencer = {
          name,
          bio: bio || "",
          themeColor,
          address: {
            country: "",
            city: "",
            street: "",
            state: "",
            postalCode: "",
          },
          profileStatusCode: "done",
          profilePictureWithoutBg: profileWithBg,
          profilePictureWithBg: profileWithBg,
          id: onBoarding.id,
        };
        setLoading(true);
        dispatch({
          type: onboardingSagaActions.EDIT_USER,
          payload,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        setDisplayStep(true);
      } finally {
        setLoading(false);
        setBtnLoading(false);
      }
    }
  };

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
      <div className={`${styles.step1Container} pageWidth`}>
        {/* {onBoarding?.profileStatusCode !== "done" && (
          <div>
            <Progress step={1} show={true} />
          </div>
        )} */}
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
        <div className={styles.tellUsAbout}>
          <div className={styles.header}>Tell us about yourself</div>

          <div className={styles.uploadImage}>
            <div className={styles.imageContainerParent}>
              {!!(profileWithBg as string)?.length && (
                <div className={styles.deleteWrapper}>
                  <Image
                    alt="back"
                    src={"/assets/svg/delete.svg"}
                    height={30}
                    width={30}
                    preview={false}
                    onClick={() => {
                      setProfileWithBg("");
                    }}
                  />
                </div>
              )}
              <div>
                <ImgCrop rotationSlider>
                  <Upload
                    listType="picture-circle"
                    showUploadList={false}
                    customRequest={customRequest}
                    maxCount={1}
                  >
                    {!(profileWithBg as string)?.length && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </div>
              {!!(profileWithBg as string)?.length && (
                <div
                  className={`${styles.imageContainer}`}
                  style={{ position: "relative" }}
                >
                  <Image
                    width={200}
                    src={getPublicURL(profileWithBg as string)}
                    fallback="data:image/png;base64,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"
                  />
                </div>
              )}
            </div>
          </div>
          <Form layout="vertical" autoComplete="off" size="large">
            <Flex vertical gap={4}>
              <Form.Item
                label="Your Name"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                initialValue={name as string}
              >
                <Input
                  name="username"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="About you"
                name="bio"
                rules={[
                  { required: false, message: "Please input your username!" },
                ]}
                initialValue={bio}
              >
                <EditorProvider>
                  <Editor
                    value={bio || ""}
                    onChange={(e) => setBio(e.target.value)}
                  >
                    <Toolbar>
                      <BtnBold />
                      <BtnItalic />
                      <BtnStrikeThrough />
                      <BtnUnderline />
                    </Toolbar>
                  </Editor>
                </EditorProvider>
                {/* <TextArea
                  rows={4}
                  name="bio"
                  onChange={(e) => setBio(e.target.value)}
                /> */}
                {/* <Input name="bio" onChange={(e) => setBio(e.target.value)} /> */}
              </Form.Item>

              <div className={styles.nameSpace}>Choose Theme color</div>
              <div className={styles.themeColorContainer}>
                {themeColors.map((color) => (
                  <div
                    key={color}
                    style={{ padding: 4 }}
                    className={`${
                      color === themeColor ? styles.activeColor : ""
                    }`}
                  >
                    <div
                      onClick={() => setThemeColor(color)}
                      style={{ backgroundColor: color }}
                      className={styles.themeColor}
                    />
                  </div>
                ))}
                <div
                  className={`${styles.colorPickerContainer}`}
                  onClick={handleClick}
                >
                  <input
                    className={styles.colorPicker}
                    ref={inputRef}
                    type="color"
                    value={!themeColors.includes(themeColor) ? themeColor : ""}
                    onChange={(event) => {
                      handleColorChange(event.target.value);
                    }}
                  ></input>
                  <button className={styles.colorPickerButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 128"
                      width="30px"
                      height="30px"
                    >
                      <path
                        fill={
                          !themeColors.includes(themeColor) ? themeColor : ""
                        }
                        d="M64 9A55 55 0 1 0 64 119A55 55 0 1 0 64 9Z"
                        transform="rotate(-45.001 64 64.001)"
                      />
                      <path
                        fill="#fff"
                        d="M64 29A35 35 0 1 0 64 99A35 35 0 1 0 64 29Z"
                        transform="rotate(-45.001 64 64.001)"
                      />
                      <path
                        fill="#fff"
                        d="M64,122c-14.9,0-29.7-5.7-41-17C0.4,82.4,0.4,45.6,23,23c22.6-22.6,59.4-22.6,82,0c0,0,0,0,0,0 c22.6,22.6,22.6,59.4,0,82C93.7,116.3,78.9,122,64,122z M64,12c-13.3,0-26.6,5.1-36.8,15.2C7,47.5,7,80.5,27.2,100.8 c20.3,20.3,53.3,20.3,73.5,0c20.3-20.3,20.3-53.3,0-73.5C90.6,17.1,77.3,12,64,12z"
                      />
                      <path
                        fill="black"
                        d="M83,61H67V45c0-1.7-1.3-3-3-3s-3,1.3-3,3v16H45c-1.7,0-3,1.3-3,3s1.3,3,3,3h16v16c0,1.7,1.3,3,3,3s3-1.3,3-3 V67h16c1.7,0,3-1.3,3-3S84.7,61,83,61z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <Form.Item>
                <Button
                  onClick={handleContinue}
                  type="primary"
                  htmlType="submit"
                  loading={btnLoading}
                >
                  Continue
                </Button>
              </Form.Item>
            </Flex>
          </Form>

          <div className={styles.loader}>{loading && <Loader />}</div>
        </div>
      </div>
      {toast.toastDisplay && (
        <Toast
          toastDisplay={toast.toastDisplay}
          toastMessage={toast.toastMessage}
          toastType={toast.toastType}
        />
      )}
    </>
  );
};
export default transition(Step1);
