"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginParams } from "@/utils/types";
import { Button } from "@/utils/styles/forms/button";
import { loginMutation } from "@/services/mutation";
import InputField from "../common/InputField";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginParams>();
  const login = loginMutation();
  const onSubmit: SubmitHandler<LoginParams> = async (data: LoginParams) => {
    await login.mutateAsync(data);

  };
  

  return (
    <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <InputField title="username" register={register} name="username" />
      </div>
      <div className="relative">
        <InputField title="password" register={register} name="password" />
      </div>

      <Button type="submit" width="100" size="sm">
        send
      </Button>
    </form>
  );
}
