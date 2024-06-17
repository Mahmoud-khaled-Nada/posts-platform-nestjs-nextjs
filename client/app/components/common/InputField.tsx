"use client";
import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Container, Label, InputWrapper, Input, IconWrapper } from "@/utils/styles/forms/input";

export type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: string;
  title: string;
  typeInput?: string;
  icon?: React.JSXElementConstructor<any>;
};

const formatterPlaceholder = (title: string) => `Enter ${title.toLowerCase()}....`;

const InputField: FC<Props<any>> = ({ title, name, register, typeInput = "text", icon: Icon }) => {
  return (
    <Container>
      <Label htmlFor={name}>{title}</Label>
      <InputWrapper>
        <Input
          type={typeInput}
          {...register(name)}
          placeholder={formatterPlaceholder(title)}
          autoComplete="off"
        />
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
      </InputWrapper>
    </Container>
  );
};

export default InputField;
