import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/src/types/Auth";

export const signupWithAws = async (
  provider: CognitoHostedUIIdentityProvider
) => {
  try {
    await Auth.federatedSignIn({ provider });
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
