import { Amplify } from "aws-amplify";
import { REDIRECT_SIGN_IN_URI, REDIRECT_SIGN_OUT_URI } from "@/config";
import awsExport from "@/config/aws-export";

export const amplifyConfigure = (ssr = false) => {
  Amplify.configure({
    ...awsExport,
    oauth: {
      ...awsExport.oauth,
      redirectSignIn: REDIRECT_SIGN_IN_URI,
      redirectSignOut: REDIRECT_SIGN_OUT_URI,
    },
    ssr,
  });
};

module.exports = {
  amplifyConfigure,
};
