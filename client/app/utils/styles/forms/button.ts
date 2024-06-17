"use client";
import styled, { css } from "styled-components";

type Size = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  size?: Size;
  variant?: ButtonVariant;
  flex?: string;
  width?: string;
}

const sizeStyles = {
  sm: css`
    padding: 10px 20px;
    font-size: 14px;
  `,
  md: css`
    padding: 10px 20px;
    font-size: 15px;
  `,
  lg: css`
    padding: 14px 26px;
    font-size: 18px;
  `,
  default: css`
    padding: 12px 24px;
    font-size: 16px;
  `
};

const variantStyles = {
  primary: css`
    background-color: #2b09ff;
    color: #fff;
    &:hover {
      cursor: pointer;
      background-color: #3415ff;
    }
    &:active {
      background-color: #3a1cff;
    }
    &:disabled {
      background-color: #4937bc7c;
      color: #878787a2;
      cursor: not-allowed;
    }
  `,
  secondary: css`
    background-color: #212121;
    color: #fff;
    &:hover {
      cursor: pointer;
      background-color: #282828;
    }
  `
};

export const Button = styled.button<ButtonProps>`
  outline: none;
  border: none;
  font-family: "Inter", sans-serif;
  border-radius: 10px;
  font-weight: 500;
  transition: 250ms background-color ease;
  ${({ size }) => sizeStyles[size || "default"]}
  ${({ variant }) => variantStyles[variant || "primary"]}
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      align-items: center;
      gap: 10px;
    `}
  ${({ width }) =>
    width &&
    css`
      width: 100%;
    `}
`;

