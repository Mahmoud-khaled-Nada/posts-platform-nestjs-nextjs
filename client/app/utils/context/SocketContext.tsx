"use client";
import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
// Create context with undefined initial value
export const SocketContext = createContext<Socket | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

// SocketProvider component
const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = Cookies.get("access_token");
      const newSocket = io("http://localhost:7000", {
        auth: {
          access_token: accessToken,
        },
      });

      setSocket(newSocket);

      // Handle token changes and reconnect if necessary
      const handleStorageChange = () => {
        const newToken = Cookies.get("access_token");
        if (newSocket && newToken) {
          newSocket.auth = { access_token: newToken };
          newSocket.connect();
        }
      };

      window.addEventListener("storage", handleStorageChange);

      // Clean up event listeners and socket connection on unmount
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        newSocket.close();
      };
    }
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;

// Hook to use the socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
