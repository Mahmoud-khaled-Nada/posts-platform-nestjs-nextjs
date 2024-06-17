import { PostFooter as Post, FooterItemContainer } from "@/utils/styles";
import { PostComment } from "./comment/PostComment";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PostFooterDetails } from "@/utils/types";
import { FaHeart, FaComment } from "react-icons/fa";
import { addLikeMutation } from "@/services/mutation";

export const PostFooter: FC<PostFooterDetails> = ({ postId, likes, comments, counters }) => {
  const mutation = addLikeMutation();

  const [addComment, setAddComment] = useState(false);
  const { user } = useSelector((state:RootState) => state.user)
  const userLiked = () => {
    if (likes) return likes.some((like) => like.user?.id === user?.id);
  };

  const [likeColor, setLikeColor] = useState<string>(userLiked() ? "red" : "");

  const handleAddLike = async () => {
    await mutation.mutateAsync(postId);
    setLikeColor("red");
  };

  return (
    <>
      <Post>
        <FooterItemContainer onClick={handleAddLike}>
          <FaHeart color={likeColor} />
          <span>{counters.likes} likes</span>
        </FooterItemContainer>
        <FooterItemContainer onClick={() => setAddComment(!addComment)}>
          <FaComment />
          <span>{counters.comments} comments</span>
        </FooterItemContainer>
      </Post>
      {addComment && <PostComment comments={comments} postId={postId} />}
    </>
  );
};
