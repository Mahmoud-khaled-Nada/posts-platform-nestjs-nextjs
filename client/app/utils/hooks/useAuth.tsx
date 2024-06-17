import { useEffect } from "react";
import { authUserQuery } from "@/services/queries";
import { useAuthContext } from "../context/AuthContext";

export function useAuth() {
  const controller = new AbortController();
  const { updateAuthUser } = useAuthContext();
  const { isLoading, isSuccess, data: authUser } = authUserQuery();

  useEffect(() => {
    if (isSuccess && authUser) updateAuthUser(authUser?.data)

    return () => {
      controller.abort();
    };
  }, [authUser]);

  return { authUser, isLoading };
}
