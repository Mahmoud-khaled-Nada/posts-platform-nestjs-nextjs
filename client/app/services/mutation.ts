/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { AppDispatch } from "@/store";
import { addComment, addLike } from "@/store/postSlice";
import { CommentParams, FriendRequestParams, LoginParams, PostParams } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AxiosError, AxiosResponse } from "axios";
import { addFriend } from "@/store/friends/friendSlice";
import Cookies from "js-cookie";
import { success, error } from "@/utils/hooks/useToast";

import {
  acceptFriendRequestAPI,
  addCommentToPostAPI,
  addFriendRequestAPI,
  addLikeToPostAPI,
  createPostAPI,
  postLoginUserAPI,
  rejectFriendRequestAPI,
} from "@/utils/apis";
import {
  acceptFriendRequest,
  addFriendRequest,
  rejectFriendRequest,
} from "@/store/friends/friendRequestSlice";
import { setAuthUser } from "@/store/userSlice";

//TODO: start functionality...

export function loginMutation() {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: (data: LoginParams) => {
      return postLoginUserAPI(data);
    },
    onSuccess({data}) {
      dispatch(setAuthUser(data.user))
      Cookies.set("access_token", data.access_token, { expires: 1 });
      location.replace('/')
    },
    onError: (err: AxiosError) => error("username or password is incorrect"),
  });
}

export function createNewPostMutation() {
  return useMutation({
    mutationFn: (data: PostParams) => {
      return createPostAPI(data);
    },
  });
}

export function addFriendRequestMutation() {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: (data: FriendRequestParams) => {
      return addFriendRequestAPI(data);
    },
    onSuccess: (response: AxiosResponse) => {
      dispatch(addFriendRequest(response.data));
      success("Friend request added successfully");
    },
    onError: (error: AxiosError | any) => {
      const err = error.response?.data;
      error(err.message || "You already requested");
    },
  });
}

export function addLikeMutation() {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation({
    mutationFn: (postId: number) => addLikeToPostAPI(postId),
    onSuccess: (data) => {
      dispatch(addLike(data?.data));
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function addCommentMutation(postId: number) {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation({
    mutationFn: (data: CommentParams) => addCommentToPostAPI(postId, data),
    onSuccess: (data) => {
      dispatch(addComment(data?.data));
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function acceptFriendRequestMutation() {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (senderId: number) => {
      return await acceptFriendRequestAPI(senderId);
    },
    onSuccess: ({ data }) => {
      dispatch(addFriend(data.friendRequest));
      dispatch(acceptFriendRequest(data.friendRequest));
      success("Friend request accepted successfully");
    },
    onError: (err) => {
      console.error(err);
      error("Failed to accept friend request");
    },
  });
}

export function rejectFriendRequestMutation() {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation({
    mutationFn: async (senderId: number) => {
      return await rejectFriendRequestAPI(senderId);
    },
    onSuccess(res) {
      dispatch(rejectFriendRequest(res.data));
      success("Friend request rejected successfully");
    },
    onError: (err) => {
      console.log(err);
    },
  });
}
