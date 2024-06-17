import { IoClose, IoEllipsisHorizontal } from "react-icons/io5";
import {
  PostHeader as Post,
  PostAvatar,
  PostButtons,
  PostContent,
  PostInfo,
  PostName,
  PostTime,
} from "@/utils/styles";
import { User } from "@/utils/types";
import { FC } from "react";
import { formatFullName } from "@/utils/helper";

type Props = {
  user: User;
  createdAt: string;
};

export const PostHeader: FC<Props> = ({ user, createdAt }) => {
  return (
    <Post>
      <PostContent>
        <PostAvatar />
        <PostInfo>
          <PostName> {formatFullName(user)}</PostName>
          <PostTime>{createdAt}</PostTime>
        </PostInfo>
      </PostContent>
      <PostButtons>
        <IoEllipsisHorizontal />
        <IoClose />
      </PostButtons>
    </Post>
  );
};
