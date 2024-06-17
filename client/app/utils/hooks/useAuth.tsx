import { useEffect } from "react";
import { authUserQuery } from "@/services/queries";
import { AppDispatch } from "@/store";
import { setAuthUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isSuccess, data: user } = authUserQuery();
  const controller = new AbortController();

  useEffect(() => {
    if (isSuccess && user) dispatch(setAuthUser(user.data));

    return () => {
      controller.abort();
    };
  }, [user]);

  return { user, isLoading };
}
