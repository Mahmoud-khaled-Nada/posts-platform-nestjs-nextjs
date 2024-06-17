import { PostContainer } from "@/utils/styles";
import { PostFooter } from "./PostFooter";
import { PostBody } from "./PostBody";
import { PostHeader } from "./PostHeader";
import { addLike, addNewPost } from "@/store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { FC, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { SocketContext } from "@/utils/context/SocketContext";

type Props = {
  isLoading: boolean;
};

const MainPost: FC<Props> = ({ isLoading }) => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { user } = useSelector((state:RootState) => state.user)
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    if (!socket) return;

    socket.on("connected", () => console.log("connected"));

    socket.on("onPostCreate", (data: any) => {
      dispatch(addNewPost(data));
      if (user?.id !== data.user.id) toast.info(`${data.user.firstName} ${data.user.lastName} add new post`);
    });

    socket.on("onLikeAdd", (data: any) => {
      if (user?.id !== data.user.id) {
        toast.info(`${data.user.firstName} ${data.user.lastName} liked`);
        dispatch(addLike(data));
      }
    });

    socket.on("onCommentAdd", (data: any) => {
      if (user?.id !== data.id) toast.info(`${data.firstName} ${data.lastName} add new comment`);
    });

    return () => {
      socket.off("onPostCreate");
      socket.off("onLikeAdd");
      socket.off("onCommentAdd");
    };
  }, [user?.id]);

  if (isLoading) return "Loading...";

  return (
    <>
      {posts &&
        posts?.length > 0 &&
        posts?.map((post, index) => (
          <PostContainer key={index}>
            <PostHeader user={post?.user} createdAt={post.createdAt} />
            <PostBody content={post?.content} />

            <PostFooter
              postId={post?.id}
              likes={post.likes || 0}
              comments={post.comments || 0}
              counters={post._count || 0}
            />
          </PostContainer>
        ))}
    </>
  );
};

export default MainPost;
