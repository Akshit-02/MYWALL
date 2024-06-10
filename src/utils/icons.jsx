import { hexToRgba } from "./helperFunction";

const defaultIconSize = 30;
const defaultIconColor = "#A2A2A2";
const defaultViewBoxWidth = 25;
const defaultViewBoxHeight = 25;

export const YourWall = ({
  size = defaultIconSize,
  color = defaultIconColor,
  viewBoxWidth = defaultViewBoxWidth,
  viewBoxHeight = defaultViewBoxHeight,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.375 7.8C3.375 6.11984 3.375 5.27976 3.70198 4.63803C3.9896 4.07354 4.44854 3.6146 5.01303 3.32698C5.65476 3 6.49484 3 8.175 3H16.575C18.2552 3 19.0952 3 19.737 3.32698C20.3015 3.6146 20.7604 4.07354 21.048 4.63803C21.375 5.27976 21.375 6.11984 21.375 7.8V16.2C21.375 17.8802 21.375 18.7202 21.048 19.362C20.7604 19.9265 20.3015 20.3854 19.737 20.673C19.0952 21 18.2552 21 16.575 21H8.175C6.49484 21 5.65476 21 5.01303 20.673C4.44854 20.3854 3.9896 19.9265 3.70198 19.362C3.375 18.7202 3.375 17.8802 3.375 16.2V7.8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3716 9.06791C11.3719 7.8992 9.70487 7.58482 8.45235 8.65501C7.19982 9.72519 7.02348 11.5145 8.0071 12.7802C8.63711 13.5909 10.2506 15.0942 11.3292 16.0704C11.6877 16.3947 11.8669 16.5569 12.0816 16.622C12.2661 16.6779 12.477 16.6779 12.6616 16.622C12.8762 16.5569 13.0555 16.3947 13.4139 16.0704C14.4926 15.0942 16.106 13.5909 16.7361 12.7802C17.7197 11.5145 17.5649 9.71393 16.2908 8.65501C15.0167 7.59608 13.3713 7.8992 12.3716 9.06791Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Analytics = ({
  size = defaultIconSize,
  color = defaultIconColor,
  viewBoxWidth = defaultViewBoxWidth,
  viewBoxHeight = defaultViewBoxHeight,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.125 12H4.725C4.16495 12 3.88492 12 3.67101 12.109C3.48285 12.2049 3.32987 12.3578 3.23399 12.546C3.125 12.7599 3.125 13.0399 3.125 13.6V19.4C3.125 19.9601 3.125 20.2401 3.23399 20.454C3.32987 20.6422 3.48285 20.7951 3.67101 20.891C3.88492 21 4.16495 21 4.725 21H9.125M9.125 21H15.125M9.125 21L9.125 8.6C9.125 8.03995 9.125 7.75992 9.23399 7.54601C9.32987 7.35785 9.48285 7.20487 9.67101 7.10899C9.88492 7 10.1649 7 10.725 7H13.525C14.0851 7 14.3651 7 14.579 7.10899C14.7672 7.20487 14.9201 7.35785 15.016 7.54601C15.125 7.75992 15.125 8.03995 15.125 8.6V21M15.125 21H19.525C20.0851 21 20.3651 21 20.579 20.891C20.7672 20.7951 20.9201 20.6422 21.016 20.454C21.125 20.2401 21.125 19.9601 21.125 19.4V4.6C21.125 4.03995 21.125 3.75992 21.016 3.54601C20.9201 3.35785 20.7672 3.20487 20.579 3.10899C20.3651 3 20.0851 3 19.525 3H16.725C16.1649 3 15.8849 3 15.671 3.10899C15.4828 3.20487 15.3299 3.35785 15.234 3.54601C15.125 3.75992 15.125 4.03995 15.125 4.6V8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Collection = ({
  size = defaultIconSize,
  color = defaultIconColor,
  viewBoxWidth = defaultViewBoxWidth,
  viewBoxHeight = defaultViewBoxHeight,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.875 5C21.875 6.65685 17.8456 8 12.875 8C7.90444 8 3.875 6.65685 3.875 5M21.875 5C21.875 3.34315 17.8456 2 12.875 2C7.90444 2 3.875 3.34315 3.875 5M21.875 5V19C21.875 20.66 17.875 22 12.875 22C7.875 22 3.875 20.66 3.875 19V5M21.875 9.72021C21.875 11.3802 17.875 12.7202 12.875 12.7202C7.875 12.7202 3.875 11.3802 3.875 9.72021M21.875 14.44C21.875 16.1 17.875 17.44 12.875 17.44C7.875 17.44 3.875 16.1 3.875 14.44"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Facebook = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill={hexToRgba(color)} />
      <g clip-path="url(#clip0_1572_3752)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 20.067C8 26.0335 12.3333 30.9944 18 32V23.3333H15V20H18V17.3333C18 14.3333 19.9333 12.6667 22.6667 12.6667C23.5333 12.6667 24.4667 12.8 25.3333 12.9333V16H23.8C22.3333 16 22 16.7333 22 17.6667V20H25.2L24.6667 23.3333H22V32C27.6667 30.9944 32 26.0335 32 20.067C32 13.4302 26.6 8 20 8C13.4 8 8 13.4302 8 20.067Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1572_3752">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(8 8)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export const Instagram = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill={hexToRgba(color)} />
      <path
        d="M23.5 20C23.5 20.6922 23.2947 21.3689 22.9101 21.9445C22.5256 22.5201 21.9789 22.9687 21.3394 23.2336C20.6999 23.4985 19.9961 23.5678 19.3172 23.4327C18.6383 23.2977 18.0146 22.9644 17.5251 22.4749C17.0356 21.9854 16.7023 21.3617 16.5673 20.6828C16.4322 20.0039 16.5015 19.3001 16.7664 18.6606C17.0313 18.0211 17.4799 17.4744 18.0555 17.0899C18.6311 16.7053 19.3078 16.5 20 16.5C20.9279 16.5011 21.8176 16.8702 22.4737 17.5263C23.1298 18.1824 23.4989 19.0721 23.5 20ZM30.9375 15.1875V24.8125C30.9357 26.4364 30.2898 27.9932 29.1415 29.1415C27.9932 30.2898 26.4364 30.9357 24.8125 30.9375H15.1875C13.5636 30.9357 12.0068 30.2898 10.8585 29.1415C9.71024 27.9932 9.06434 26.4364 9.0625 24.8125V15.1875C9.06434 13.5636 9.71024 12.0068 10.8585 10.8585C12.0068 9.71024 13.5636 9.06434 15.1875 9.0625H24.8125C26.4364 9.06434 27.9932 9.71024 29.1415 10.8585C30.2898 12.0068 30.9357 13.5636 30.9375 15.1875ZM25.25 20C25.25 18.9616 24.9421 17.9466 24.3652 17.0833C23.7883 16.2199 22.9684 15.547 22.0091 15.1496C21.0498 14.7523 19.9942 14.6483 18.9758 14.8509C17.9574 15.0535 17.0219 15.5535 16.2877 16.2877C15.5535 17.0219 15.0535 17.9574 14.8509 18.9758C14.6483 19.9942 14.7523 21.0498 15.1496 22.0091C15.547 22.9684 16.2199 23.7883 17.0833 24.3652C17.9466 24.9421 18.9616 25.25 20 25.25C21.3919 25.2484 22.7263 24.6948 23.7106 23.7106C24.6948 22.7263 25.2484 21.3919 25.25 20ZM27 14.3125C27 14.0529 26.923 13.7992 26.7788 13.5833C26.6346 13.3675 26.4296 13.1992 26.1898 13.0999C25.9499 13.0006 25.686 12.9746 25.4314 13.0252C25.1768 13.0759 24.943 13.2009 24.7594 13.3844C24.5759 13.568 24.4509 13.8018 24.4002 14.0564C24.3496 14.311 24.3756 14.5749 24.4749 14.8148C24.5742 15.0546 24.7425 15.2596 24.9583 15.4038C25.1742 15.548 25.4279 15.625 25.6875 15.625C26.0356 15.625 26.3694 15.4867 26.6156 15.2406C26.8617 14.9944 27 14.6606 27 14.3125Z"
        fill={color}
      />
    </svg>
  );
};
export const Youtube = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill={hexToRgba(color)} />
      <path
        d="M27.5886 10.25H12.4114C9.15235 10.25 6.5 12.9024 6.5 16.1614V23.7151C6.5 26.9741 9.15235 29.6265 12.4114 29.6265H27.5886C30.8476 29.6265 33.5 26.9741 33.5 23.7151V16.1614C33.5 12.9024 30.8476 10.25 27.5886 10.25ZM23.9452 20.4814L18.1322 23.5022C17.5128 23.8231 16.7727 23.3752 16.7727 22.6763V16.6347C16.7727 15.9359 17.5128 15.488 18.1322 15.8088L23.9452 18.8296C24.6122 19.1791 24.6122 20.1352 23.9452 20.4814Z"
        fill={color}
      />
    </svg>
  );
};
export const Twitter = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill={hexToRgba(color)} />
      <circle cx="20.4193" cy="20.4193" r="13.4193" fill={color} />
      <g clip-path="url(#clip0_1574_3678)">
        <path
          d="M12.2366 13.0605L18.8757 21.8141L12.1946 28.928H13.6982L19.5478 22.6986L24.2754 28.9283H29.3911L22.378 19.684L28.5969 13.0605H27.0933L21.7063 18.7968L17.3533 13.0605H12.2366ZM14.448 14.1527H16.7987L27.1787 27.8358H24.8286L14.448 14.1527Z"
          fill={hexToRgba(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_1574_3678">
          <rect
            width="17.3153"
            height="15.5838"
            fill={hexToRgba(color)}
            transform="translate(12.1946 13.0605)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export const Linkedln = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill={hexToRgba(color)} />
      <path
        d="M13.6667 11.3345C13.6664 11.9533 13.4202 12.5467 12.9824 12.9841C12.5446 13.4214 11.951 13.667 11.3322 13.6667C10.7133 13.6664 10.12 13.4202 9.68259 12.9824C9.24523 12.5446 8.99969 11.951 9 11.3322C9.00031 10.7133 9.24644 10.12 9.68424 9.68259C10.122 9.24523 10.7157 8.99969 11.3345 9C11.9533 9.00031 12.5467 9.24644 12.9841 9.68424C13.4214 10.122 13.667 10.7157 13.6667 11.3345ZM13.7367 15.3945H9.07V30.0012H13.7367V15.3945ZM21.11 15.3945H16.4667V30.0012H21.0633V22.3362C21.0633 18.0662 26.6283 17.6695 26.6283 22.3362V30.0012H31.2367V20.7495C31.2367 13.5512 23 13.8195 21.0633 17.3545L21.11 15.3945Z"
        fill={color}
      />
    </svg>
  );
};

export const Snapchat = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill={hexToRgba(color)} />
      <path
        d="M8.84989 26.6585C9.56431 27.3395 10.5874 27.4089 11.49 27.4701C12.0655 27.5092 12.6607 27.5495 13.0085 27.744C13.3442 27.9317 13.6903 28.4136 14.025 28.8795C14.5635 29.6292 15.1738 30.479 16.1403 30.7301C17.0721 30.9726 17.9912 30.5373 18.8022 30.1534C19.3343 29.9015 19.8845 29.6411 20.2992 29.6411C20.7139 29.6411 21.2641 29.9015 21.7962 30.1534C22.4446 30.4602 23.1624 30.8 23.9003 30.8C24.0884 30.8006 24.2758 30.7771 24.4581 30.7301C25.4245 30.479 26.0349 29.6292 26.5734 28.8794C26.9081 28.4136 27.2542 27.9317 27.5898 27.744C27.9377 27.5495 28.5329 27.5092 29.1084 27.4701C30.011 27.4089 31.0341 27.3395 31.7485 26.6585C31.8434 26.568 31.915 26.4554 31.9571 26.3303C31.9992 26.2052 32.0106 26.0716 31.9901 25.941C31.9696 25.8105 31.9179 25.6871 31.8396 25.5815C31.7613 25.4759 31.6587 25.3914 31.5408 25.3354C31.5138 25.3222 30.2996 24.7199 29.106 23.1784C28.3448 22.1853 27.76 21.065 27.3777 19.8679L29.3599 19.0627C29.556 18.9829 29.7129 18.8273 29.7961 18.6301C29.8793 18.4329 29.8819 18.2102 29.8035 18.011C29.725 17.8117 29.5719 17.6523 29.3778 17.5677C29.1836 17.4832 28.9643 17.4804 28.7681 17.5599L26.9701 18.2904C26.768 17.2308 26.6687 16.1536 26.6736 15.0743C26.6736 13.3572 26.002 11.7105 24.8066 10.4963C23.6112 9.28219 21.9898 8.6001 20.2992 8.6001C18.6086 8.6001 16.9872 9.28219 15.7918 10.4963C14.5964 11.7105 13.9248 13.3572 13.9248 15.0743C13.9297 16.1536 13.8304 17.2308 13.6283 18.2904L11.8303 17.56C11.6343 17.4811 11.4155 17.4844 11.2218 17.5691C11.0282 17.6538 10.8755 17.813 10.7972 18.0118C10.7189 18.2106 10.7213 18.4329 10.804 18.6299C10.8868 18.8268 11.043 18.9825 11.2385 19.0627L13.2206 19.868C12.8384 21.0651 12.2535 22.1854 11.4924 23.1784C10.2913 24.7296 9.06937 25.3297 9.05717 25.3356C8.93973 25.3921 8.83762 25.4768 8.75969 25.5823C8.68175 25.6879 8.63035 25.8112 8.60993 25.9415C8.58951 26.0718 8.60069 26.2053 8.64251 26.3302C8.68432 26.4551 8.7555 26.5678 8.84989 26.6585Z"
        fill={color}
      />
    </svg>
  );
};

export const TikTok = ({
  size = defaultIconSize,
  color = defaultIconColor,
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill={hexToRgba(color)} />
      <path
        d="M31.375 15.1875V19.5625C31.375 19.6774 31.3524 19.7912 31.3084 19.8974C31.2644 20.0035 31.2 20.1 31.1187 20.1812C31.0375 20.2625 30.941 20.3269 30.8349 20.3709C30.7287 20.4149 30.6149 20.4375 30.5 20.4375C28.6722 20.4415 26.8707 20.0021 25.2499 19.157L25.25 23.0625C25.2498 24.6438 24.7985 26.1922 23.9491 27.5261C23.0998 28.8599 21.8876 29.9238 20.4548 30.5929C19.0221 31.262 17.4282 31.5086 15.8602 31.3037C14.2922 31.0987 12.8152 30.4508 11.6026 29.4359C10.3899 28.421 9.49189 27.0813 9.01388 25.574C8.53587 24.0667 8.49773 22.4543 8.90392 20.926C9.3101 19.3978 10.1438 18.0171 11.3071 16.946C12.4704 15.8749 13.9151 15.1579 15.4716 14.879C15.5975 14.8566 15.7268 14.8621 15.8504 14.895C15.974 14.9279 16.0888 14.9876 16.1869 15.0697C16.2849 15.1518 16.3638 15.2544 16.4179 15.3703C16.472 15.4862 16.5 15.6126 16.5 15.7405L16.4999 20.2948C16.5 20.4602 16.453 20.6223 16.3646 20.7622C16.2762 20.9021 16.1499 21.0141 16.0004 21.0851C15.6466 21.2528 15.3442 21.5123 15.1249 21.8366C14.9056 22.161 14.7773 22.5383 14.7535 22.9291C14.7296 23.3199 14.8111 23.71 14.9895 24.0586C15.1678 24.4072 15.4364 24.7015 15.7672 24.9109C16.0981 25.1203 16.4791 25.237 16.8705 25.249C17.2618 25.2609 17.6492 25.1676 17.9923 24.9788C18.3353 24.79 18.6213 24.5126 18.8206 24.1755C19.0198 23.8384 19.1249 23.4541 19.125 23.0625V9.0625C19.125 8.94759 19.1476 8.83381 19.1916 8.72765C19.2356 8.62149 19.3 8.52503 19.3813 8.44377C19.4625 8.36252 19.559 8.29807 19.6651 8.2541C19.7713 8.21013 19.8851 8.1875 20 8.1875H24.375C24.4899 8.1875 24.6037 8.21013 24.7099 8.2541C24.816 8.29807 24.9125 8.36252 24.9937 8.44377C25.075 8.52503 25.1394 8.62149 25.1834 8.72765C25.2274 8.83381 25.25 8.94759 25.25 9.0625C25.2516 10.4544 25.8052 11.7888 26.7894 12.7731C27.7737 13.7573 29.1081 14.3109 30.5 14.3125C30.6149 14.3125 30.7287 14.3351 30.8349 14.3791C30.941 14.4231 31.0375 14.4875 31.1187 14.5688C31.2 14.65 31.2644 14.7465 31.3084 14.8526C31.3524 14.9588 31.375 15.0726 31.375 15.1875Z"
        fill={color}
      />
    </svg>
  );
};

export const Other = ({ size = defaultIconSize, color = defaultIconColor }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill={hexToRgba(color)} />
      <path
        d="M22.9208 7.8315C25.2325 8.43263 27.2974 9.64242 28.9214 11.2946C27.8982 11.9745 26.7775 12.4882 25.5843 12.7645C25.3591 12.8163 25.1307 12.8563 24.9033 12.9016C24.4377 10.8899 23.7729 9.11906 22.9218 7.83133L22.9208 7.8315ZM16.1047 27.5077C16.9504 31.0507 18.3471 33.2999 19.6486 33.2999C20.9501 33.2999 22.3469 31.0498 23.1925 27.5066C20.8429 27.1894 18.4542 27.1894 16.1047 27.5066V27.5077ZM23.9636 21.2127H15.3339C15.3739 22.865 15.5255 24.4115 15.7627 25.8122C18.3375 25.4528 20.96 25.4539 23.5348 25.8122C23.7719 24.4114 23.9225 22.866 23.9636 21.2127ZM23.5348 14.8865C22.2463 15.0668 20.947 15.1693 19.6486 15.1693C18.3503 15.1693 17.0511 15.0689 15.7624 14.8876C15.5253 16.2873 15.3748 17.8338 15.3347 19.4863H23.9645C23.9244 17.834 23.7728 16.2864 23.5357 14.8868L23.5348 14.8865ZM25.9765 14.4451C25.7318 14.5023 25.4849 14.5433 25.2391 14.5941C25.5033 16.1665 25.6571 17.8262 25.696 19.4861H32.5975C32.4264 16.9262 31.5104 14.5736 30.0573 12.633C28.8186 13.4867 27.4392 14.1072 25.9751 14.4461L25.9765 14.4451ZM25.6971 21.2117C25.6571 22.8715 25.5044 24.5315 25.2402 26.1038C25.486 26.1534 25.7329 26.1966 25.9776 26.2527C27.4415 26.5916 28.821 27.2121 30.0598 28.0658C31.5118 26.1254 32.4289 23.7716 32.6 21.2116L25.6971 21.2117ZM13.6025 19.485C13.6426 17.8273 13.7953 16.1674 14.0594 14.5962C13.9371 14.5714 13.8147 14.5531 13.6935 14.5272C12.1061 14.1818 10.6075 13.5246 9.25844 12.6073C7.79671 14.552 6.872 16.9144 6.70092 19.4852L13.6025 19.485ZM14.3951 27.7938C14.2847 27.8164 14.1721 27.8326 14.0616 27.8564C12.7525 28.1413 11.5095 28.6701 10.3825 29.4104C12.0056 31.0584 14.0683 32.266 16.3767 32.8661C15.5246 31.5775 14.8597 29.8066 14.3942 27.7928L14.3951 27.7938ZM25.5844 27.9341C25.3592 27.8823 25.1308 27.8423 24.9034 27.797C24.4378 29.8086 23.773 31.5806 22.9208 32.8673C25.2325 32.2661 27.2974 31.0563 28.9214 29.4041C27.8982 28.7242 26.7787 28.2103 25.5844 27.9341ZM14.0594 26.1016C13.7952 24.5302 13.6415 22.8705 13.6025 21.2128L6.69995 21.2139C6.87103 23.7846 7.79463 26.146 9.25747 28.0918C10.6066 27.1745 12.105 26.5184 13.6925 26.173C13.8138 26.146 13.9372 26.1288 14.0585 26.1039L14.0594 26.1016ZM14.0616 12.8413C14.1721 12.8651 14.2847 12.8823 14.3951 12.9039C14.8607 10.8901 15.5255 9.1192 16.3776 7.83064C14.0692 8.43068 12.0064 9.63832 10.3834 11.2863C11.5095 12.0267 12.7525 12.5555 14.0617 12.8404L14.0616 12.8413ZM23.1936 13.1921C22.348 9.64908 20.9512 7.3999 19.6497 7.3999C18.3483 7.3999 16.9515 9.65005 16.1059 13.1921C18.4555 13.5093 20.8453 13.5104 23.1936 13.1921Z"
        fill={color}
      />
    </svg>
  );
};