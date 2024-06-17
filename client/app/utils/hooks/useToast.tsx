import { toast, ToastOptions } from "react-toastify";

export function useToast(defaultOptions: ToastOptions<{}> = { theme: "dark" }) {
  const success = (data: string) => toast(data, { ...defaultOptions, type: "success" });

  const error = (data: string, options?: ToastOptions<{}>) =>
    toast(data, { ...defaultOptions, ...options, type: "error" });

  const info = (data: string, options?: ToastOptions<{}>) =>
    toast(data, { ...defaultOptions, ...options, type: "info" });
  return { success, error, info };
}

export const success = (data: string) => toast(data, { type: "success" });

export const error = (data: string, options?: ToastOptions<{}>) => toast(data, { type: "error" });

export const info = (data: string, options?: ToastOptions<{}>) => toast(data, { type: "info" });
