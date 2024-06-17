"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setPosts } from "@/store/postSlice";
import { getPostsQuery } from "@/services/queries";
import MainPost from "@/components/post/MainPost";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isSuccess, data: posts } = getPostsQuery();

  useEffect(() => {
    if (isSuccess && posts) dispatch(setPosts(posts?.data));
  }, [posts]);

  return (
    <>
    {isSuccess &&<MainPost isLoading={isLoading} />}
    </>
  );
};

export default HomePage;
