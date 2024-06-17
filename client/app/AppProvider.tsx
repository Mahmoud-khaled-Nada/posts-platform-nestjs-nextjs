"use client";
import { FC } from "react";
import { ChildrenType } from "./utils/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocketProvider from "./utils/context/SocketContext";

const AppProvider: FC<ChildrenType> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <ToastContainer theme="dark" />
    </ReduxProvider>
  );
};

export default AppProvider;
