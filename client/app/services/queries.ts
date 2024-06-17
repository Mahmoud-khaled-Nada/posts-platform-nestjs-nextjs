/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authUserAPI,
  getFriendRequestAPI,
  getFriendsAPI,
  getPostsAPI,
  getNotificationAPI,
} from "@/utils/apis";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setNotifications } from "@/store/notifications";

export function getFriendRequestsQuery() {
  return useQuery({
    queryKey: ["friendRequests"],
    queryFn: () => getFriendRequestAPI(),
    refetchOnMount: false,
  });
}

export function getPostsQuery() {
  return useQuery({
    queryKey: ["Posts"],
    queryFn: async () => await getPostsAPI(),
    refetchOnMount: false,
  });
}

export function authUserQuery() {
  return useQuery({
    queryKey: ["UserAuth"],
    queryFn: async () => await authUserAPI(),
    refetchOnMount: false,
  });
}

export function getFriendsQuery() {
  return useQuery({
    queryKey: ["Friends"],
    queryFn: async () => {
      const response = await getFriendsAPI();
      return response.data;
    },
    refetchOnMount: false,
  });
}

export function getNotificationQuery() {
  const dispatch = useDispatch<AppDispatch>();
  return useQuery({
    queryKey: ["Notification"],
    queryFn: async () => {
      try {
        const response = await getNotificationAPI();
        dispatch(setNotifications(response.data));
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    refetchOnMount: false,
  });
}
