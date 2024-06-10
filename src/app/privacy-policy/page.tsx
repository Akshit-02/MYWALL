import React from "react";
import Footer from "@/components/Footer/Footer";
import { PrivacyPolicy } from "@/container/PrivacyPolicy/PrivacyPolicy";

const PrivacyPolicyPage = (): React.ReactElement => {
  return (
    <div className="screenWidth" style={{ padding: 20 }}>
      <PrivacyPolicy />
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
