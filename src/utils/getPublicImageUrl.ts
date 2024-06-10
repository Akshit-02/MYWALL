export const getPublicURL = (key: string, resize?: string): string => {
  if (resize)
    return `https://${process.env.NEXT_PUBLIC_MEDIA_PROD_URL}/${key}?resize=${resize}`;
  return `https://${process.env.NEXT_PUBLIC_MEDIA_PROD_URL}/${key}`;
};
