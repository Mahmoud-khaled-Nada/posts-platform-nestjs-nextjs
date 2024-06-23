import axios from "axios";
import Cookies from "js-cookie";
import {
  CommentParams,
  FriendRequestDetails,
  FriendRequestParams,
  FriendsDetails,
  LoginParams,
  NotificationDetails,
  PostParams,
  PostsDetails,
  User,
} from "./types";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("access_token");
    token ? (config.headers["Authorization"] = `Bearer ${token}`) : (location.href = "/login");
    return config;
  },
  (error) => {
    console.log(error);
    location.href = "/login";
    return Promise.reject(error);
  }
);

// !TODO Start API

export const postLoginUserAPI = (data: LoginParams) => client.post("/auth/login", data);

export const authUserAPI = () => client.get<User>("/users/me");
export const UserProfileAPI = (data: FormData) =>
  client.patch<User>("/users/profiles", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const createPostAPI = (data: PostParams) => client.post("/posts/create", data);
export const getPostsAPI = () => client.get<PostsDetails[]>("/posts");

export const addLikeToPostAPI = (postId: number) => client.post(`/posts/add-like/${postId}`);

export const addCommentToPostAPI = (postId: number, data: CommentParams) =>
  client.post(`/posts/add-comment/${postId}`, data);

// Request

export const addFriendRequestAPI = (data: FriendRequestParams) =>
  client.post("/friends-request/create", data);
export const getFriendRequestAPI = () => client.get<FriendRequestDetails[]>("/friends-request/requests");

export const acceptFriendRequestAPI = (senderId: number) =>
  client.post(`/friends-request/${senderId}/accept`);
export const rejectFriendRequestAPI = (id: number) => client.delete(`/friends-request/${id}/reject`);

export const getFriendsAPI = () => client.get<FriendsDetails[]>("friends");

export const getNotificationAPI = () => client.get<NotificationDetails[]>(`/notification`);
