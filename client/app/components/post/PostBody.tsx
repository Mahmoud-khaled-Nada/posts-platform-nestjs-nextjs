import { PostText, PostBody as Post } from "@/utils/styles";
import { FC } from "react";
// import Image from "next/image";
// import images from "@/__assets__/1.png";

type Props = {
  content: string;
};

export const PostBody: FC<Props> = ({ content }) => {
  return (
    <Post>
      <PostText>{content}</PostText>
      {/* <Image src={images} alt="avatar-user" className="w-[100%]" /> */}
    </Post>
  );
};
