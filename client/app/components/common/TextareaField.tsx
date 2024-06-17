"use client";
import { Textarea } from "@/utils/styles";
import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  cols?: number;
  rows?: number;
  register: UseFormRegister<T>;
  name: string;
  placeholder?: string;
};
const TextareaField: FC<Props<any>> = ({ register, name }) => {
  return <Textarea {...register(name.toString())} placeholder="creat new post..." />;
};

export default TextareaField;
