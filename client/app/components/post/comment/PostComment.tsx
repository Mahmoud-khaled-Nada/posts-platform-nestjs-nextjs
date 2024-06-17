import {
  CommentContainer,
  CommentAvatar,
  CommentContent,
  CommentNameAndTimeWrapper,
  CommentInfo,
  CommentName,
  CommentText,
  CommentTime,
} from "@/utils/styles";
import { PostTextarea } from "../PostTextarea";
import { CommentDetails } from "@/utils/types";
import { FC } from "react";
type Props = {
  comments: CommentDetails[];
  postId: number;
};
export const PostComment: FC<Props> = ({ comments, postId }) => {
  return (
    <>
      <CommentContainer>
        {comments.length > 0 &&
          comments?.map((comment, index) => (
            <CommentContent key={index}>
              <CommentAvatar />
              <CommentInfo>
                <CommentNameAndTimeWrapper>
                  <CommentName>{`${comment.user.firstName} ${comment.user.lastName}`}</CommentName>
                  <CommentTime>30 s</CommentTime>
                </CommentNameAndTimeWrapper>
                <CommentText>{comment.content}</CommentText>
              </CommentInfo>
            </CommentContent>
          ))}
        <PostTextarea postId={postId}/>
      </CommentContainer>
    </>
  );
};
