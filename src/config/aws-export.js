const awsmobile = {
  aws_project_region: "ap-south-1",
  aws_appsync_graphqlEndpoint:
    "https://bio6vj5levgrldj2vuojvwvv7a.appsync-api.ap-south-1.amazonaws.com/graphql",
  aws_appsync_region: "ap-south-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: "da2-jb52xpos5jgzrmujyhnuoud5eu",
  aws_cognito_identity_pool_id:
    "ap-south-1:21db041b-70dc-4ff7-b7d4-87e87a9f01b6",
  aws_cognito_region: "ap-south-1",
  aws_user_pools_id: "ap-south-1_KCDGYo5F2",
  aws_user_pools_web_client_id: "2c0srn5iq6jtl1p1pm7lvjju0f",
  oauth: {
    domain: "mywauth-prod.auth.ap-south-1.amazoncognito.com",
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: "https://mywall.me/",
    redirectSignOut: "https://mywall.me/",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_AND_IDENTITY_POOLS",
  aws_cognito_username_attributes: ["EMAIL", "PHONE_NUMBER"],
  aws_cognito_social_providers: ["FACEBOOK", "GOOGLE"],
  aws_cognito_signup_attributes: ["EMAIL", "NAME"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
  aws_user_files_s3_bucket: "mywall160042-prod",
  aws_user_files_s3_bucket_region: "ap-south-1",
};

export default awsmobile;
