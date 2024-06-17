import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsSatetType, PostsDetails } from "@/utils/types";

const initialState: PostsSatetType = {
  posts: [],
};

// Slice
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostsDetails[]>) => {
      state.posts = action.payload;
    },
    addNewPost: (state, action: PayloadAction<PostsDetails>) => {
      console.log("addNewPost");
      state.posts.unshift(action.payload);
    },
    addComment: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          post.comments.push(action.payload);
          post._count.comments++;
        }
        return post;
      });
    },
    addLike: (state, action) => {
      const { postId } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === postId) console.log(post._count.likes++);
        return post;
      });
    },
  },
});

export const { setPosts, addComment, addLike, addNewPost } = postSlice.actions;
export default postSlice.reducer;
