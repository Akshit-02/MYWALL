import { ResolvingMetadata } from "next";
import Profile from "@/container/PreviewPage/ProfilePreview/Profile";
import {
  fetchUserBySlug,
  getUserDetail,
  listUsers,
} from "@/store/sagas/requests/auth.request";
import { Influencer } from "@/models";
import { notFound } from "next/navigation";
export const revalidate = 3;

type Props = {
  params: { username: string };
};

export async function generateStaticParams() {
  const data = await listUsers();
  return (
    data?.map((influencer: Influencer) => ({
      username: influencer.slug,
    })) ?? []
  );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const slug = params.username;
  const data = await fetchUserBySlug(slug?.toLowerCase());
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: "MyWall - " + data?.name,
    description: data?.bio,
    keywords: data?.tags,
    openGraph: {
      images: data?.profilePictureWithBg
        ? [data?.profilePictureWithBg, ...previousImages]
        : [...previousImages],
      title: ("MyWall - " + data?.name) as string,
      description: data?.bio as string,
    },
  };
}

export default async function ProfilePage(props: Props) {
  const { username } = props.params;

  const data = await getUserDetail(username?.toLowerCase());

  if (!data) {
    notFound();
  }
  return (
    <div className="screenWidth">
      <Profile data={data} />
    </div>
  );
}
